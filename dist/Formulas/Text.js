"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
var Filter_1 = require("../Utilities/Filter");
var MoreUtils_1 = require("../Utilities/MoreUtils");
/**
 * Computes the value of a Roman numeral.
 * @param text - The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
var ARABIC = function (text) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ARABIC");
    if (typeof text !== "string") {
        throw new Errors_1.ValueError('Invalid roman numeral in ARABIC evaluation.');
    }
    var negative = false;
    if (text[0] === "-") {
        negative = true;
        text = text.substr(1);
    }
    // Credits: Rafa? Kukawski
    if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
        throw new Errors_1.ValueError('Invalid roman numeral in ARABIC evaluation.');
    }
    var r = 0;
    text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
        r += { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }[i];
    });
    if (negative) {
        return r * -1;
    }
    return r;
};
exports.ARABIC = ARABIC;
/**
 * Convert a number into a character according to the current Unicode table.
 * @param value - The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
var CHAR = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "CHAR");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (n < 1 || n > 1114112) { //limit
        throw new Errors_1.NumError("Function CHAR parameter 1 value " + n + " is out of range.");
    }
    return String.fromCharCode(n);
};
exports.CHAR = CHAR;
/**
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param value - The string whose first character's Unicode map value will be returned.
 * @returns {number} number of the first character's Unicode value
 * @constructor
 */
var CODE = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "CODE");
    var text = TypeConverter_1.TypeConverter.firstValueAsString(value);
    if (text === "") {
        throw new Errors_1.ValueError("Function CODE parameter 1 value should be non-empty.");
    }
    return text.charCodeAt(0);
};
exports.CODE = CODE;
/**
 * Divides text around a specified character or string, and puts each fragment into a separate cell in the row.
 * @param text - The text to divide.
 * @param delimiter - The character or characters to use to split text.
 * @param splitByEach - [optional] Whether or not to divide text around each character contained in
 * delimiter.
 * @returns {Array<string>} containing the split
 * @constructor
 * TODO: At some point this needs to return a more complex type than Array. Needs to return a type that has a dimension.
 */
var SPLIT = function (text, delimiter, splitByEach) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "SPLIT");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    delimiter = TypeConverter_1.TypeConverter.firstValueAsString(delimiter);
    splitByEach = splitByEach === undefined ? false : TypeConverter_1.TypeConverter.firstValueAsBoolean(splitByEach);
    if (splitByEach) {
        var result = [text];
        for (var i = 0; i < delimiter.length; i++) {
            var char = delimiter[i];
            var subResult = [];
            for (var x = 0; x < result.length; x++) {
                subResult = subResult.concat(result[x].split(char));
            }
            result = subResult;
        }
        return result.filter(function (val) {
            return val.trim() !== "";
        });
    }
    else {
        return text.split(delimiter);
    }
};
exports.SPLIT = SPLIT;
/**
 * Appends strings to one another.
 * @param values - to append to one another. Must contain at least one value
 * @returns {string} concatenated string
 * @constructor
 */
var CONCATENATE = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "CONCATENATE");
    var string = '';
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            string += CONCATENATE.apply(this, arguments[i]);
        }
        else {
            string += TypeConverter_1.TypeConverter.valueToString(values[i]);
        }
    }
    return string;
};
exports.CONCATENATE = CONCATENATE;
/**
 * Converts a numeric value to a different unit of measure.
 * @param value - the numeric value in start_unit to convert to end_unit.
 * @param startUnit - The starting unit, the unit currently assigned to value.
 * @param endUnit - The unit of measure into which to convert value.
 * @returns {number}
 * @constructor
 * TODO: Looking up units is not efficient at all. We should use an object instead of iterating through an array.
 */
var CONVERT = function (value, startUnit, endUnit) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "CONVERT");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var fromUnit = TypeConverter_1.TypeConverter.firstValueAsString(startUnit);
    var toUnit = TypeConverter_1.TypeConverter.firstValueAsString(endUnit);
    // NOTE: A lot of the code for this method is from https://github.com/sutoiku/formula.js. I'm relying on them to have
    // gotten it right, but I'm spot checking some of their work against GS, MSE, LibreOffice, OpenOffice.
    // List of units supported by CONVERT and units defined by the International System of Units
    // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
    var units = [
        ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
        ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
        ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
        ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
        ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
        ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
        ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
        ["ampere", "A", null, "electric_current", true, false, 1],
        ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
        ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
        ["are", "ar", null, "area", false, true, 100],
        ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
        ["bar", "bar", null, "pressure", false, false, 100000],
        ["barn", "b", null, "area", false, false, 1e-28],
        ["becquerel", "Bq", null, "radioactivity", true, false, 1],
        ["bit", "bit", ["b"], "information", false, true, 1],
        ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
        ["byte", "byte", null, "information", false, true, 8],
        ["candela", "cd", null, "luminous_intensity", true, false, 1],
        ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
        ["coulomb", "C", null, "electric_charge", true, false, 1],
        ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
        ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
        ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
        ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
        ["cubic metre", "m?", null, "volume", true, true, 1],
        ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
        ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
        ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
        ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
        ["cup", "cup", null, "volume", false, true, 0.0002365882365],
        ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
        ["day", "d", ["day"], "time", false, true, 86400],
        ["degree", "°", null, "angle", false, false, 0.0174532925199433],
        ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
        ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
        ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
        ["ell", "ell", null, "length", false, true, 1.143],
        ["erg", "erg", ["e"], "energy", false, true, 1e-7],
        ["farad", "F", null, "electric_capacitance", true, false, 1],
        ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
        ["foot", "ft", null, "length", false, true, 0.3048],
        ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
        ["gal", "Gal", null, "acceleration", false, false, 0.01],
        ["gallon", "gal", null, "volume", false, true, 0.003785411784],
        ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
        ["grain", "grain", null, "mass", false, true, 0.0000647989],
        ["gram", "g", null, "mass", false, true, 0.001],
        ["gray", "Gy", null, "absorbed_dose", true, false, 1],
        ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
        ["hectare", "ha", null, "area", false, true, 10000],
        ["henry", "H", null, "inductance", true, false, 1],
        ["hertz", "Hz", null, "frequency", true, false, 1],
        ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
        ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
        ["hour", "h", ["hr"], "time", false, true, 3600],
        ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
        ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
        ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
        ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
        ["inch", "in", null, "length", false, true, 0.0254],
        ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
        ["IT calorie", "cal", null, "energy", false, true, 4.1868],
        ["joule", "J", null, "energy", true, true, 1],
        ["katal", "kat", null, "catalytic_activity", true, false, 1],
        ["kelvin", "K", ["kel"], "temperature", true, true, 1],
        ["kilogram", "kg", null, "mass", true, true, 1],
        ["knot", "kn", null, "speed", false, true, 0.514444444444444],
        ["light-year", "ly", null, "length", false, true, 9460730472580800],
        ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
        ["lumen", "lm", null, "luminous_flux", true, false, 1],
        ["lux", "lx", null, "illuminance", true, false, 1],
        ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
        ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
        ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
        ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
        ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
        ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
        ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
        ["metre", "m", null, "length", true, true, 1],
        ["miles per hour", "mph", null, "speed", false, true, 0.44704],
        ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
        ["minute", "?", null, "angle", false, false, 0.000290888208665722],
        ["minute", "min", ["mn"], "time", false, true, 60],
        ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
        ["mole", "mol", null, "amount_of_substance", true, false, 1],
        ["morgen", "Morgen", null, "area", false, true, 2500],
        ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
        ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
        ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
        ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
        ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
        ["newton", "N", null, "force", true, true, 1],
        ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
        ["ohm", "Ω", null, "electric_resistance", true, false, 1],
        ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
        ["pascal", "Pa", null, "pressure", true, false, 1],
        ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
        ["pferdestärke", "PS", null, "power", false, true, 735.49875],
        ["phot", "ph", null, "illuminance", false, false, 0.0001],
        ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
        ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
        ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
        ["pond", "pond", null, "force", false, true, 0.00980665],
        ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
        ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
        ["quart", "qt", null, "volume", false, true, 0.000946352946],
        ["radian", "rad", null, "angle", true, false, 1],
        ["second", "?", null, "angle", false, false, 0.00000484813681109536],
        ["second", "s", ["sec"], "time", true, true, 1],
        ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
        ["siemens", "S", null, "electrical_conductance", true, false, 1],
        ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
        ["slug", "sg", null, "mass", false, true, 14.59390294],
        ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
        ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
        ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
        ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
        ["square meter", "m?", null, "area", true, true, 1],
        ["square meter", "m^2", null, "area", true, true, 1],
        ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
        ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
        ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
        ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
        ["statute mile", "mi", null, "length", false, true, 1609.344],
        ["steradian", "sr", null, "solid_angle", true, false, 1],
        ["stilb", "sb", null, "luminance", false, false, 0.0001],
        ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
        ["stone", "stone", null, "mass", false, true, 6.35029318],
        ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
        ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
        ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
        ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
        ["ton", "ton", null, "mass", false, true, 907.18474],
        ["tonne", "t", null, "mass", false, false, 1000],
        ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
        ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
        ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
        ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
        ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
        ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
        ["volt", "V", null, "voltage", true, false, 1],
        ["watt", "W", null, "power", true, true, 1],
        ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
        ["weber", "Wb", null, "magnetic_flux", true, false, 1],
        ["yard", "yd", null, "length", false, true, 0.9144],
        ["year", "yr", null, "time", false, true, 31557600]
    ];
    // Binary prefixes
    // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
    var binary_prefixes = {
        Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
        Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
        Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
        Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
        Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
        Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
        Mi: ["mebi", 20, 1048576, "Mi", "mega"],
        ki: ["kibi", 10, 1024, "ki", "kilo"]
    };
    // Unit prefixes
    // [Name, Multiplier, Abbreviation]
    var unit_prefixes = {
        Y: ["yotta", 1e+24, "Y"],
        Z: ["zetta", 1e+21, "Z"],
        E: ["exa", 1e+18, "E"],
        P: ["peta", 1e+15, "P"],
        T: ["tera", 1e+12, "T"],
        G: ["giga", 1e+09, "G"],
        M: ["mega", 1e+06, "M"],
        k: ["kilo", 1e+03, "k"],
        h: ["hecto", 1e+02, "h"],
        e: ["dekao", 1e+01, "e"],
        d: ["deci", 1e-01, "d"],
        c: ["centi", 1e-02, "c"],
        m: ["milli", 1e-03, "m"],
        u: ["micro", 1e-06, "u"],
        n: ["nano", 1e-09, "n"],
        p: ["pico", 1e-12, "p"],
        f: ["femto", 1e-15, "f"],
        a: ["atto", 1e-18, "a"],
        z: ["zepto", 1e-21, "z"],
        y: ["yocto", 1e-24, "y"]
    };
    // Initialize units and multipliers
    var from = null;
    var to = null;
    var base_from_unit = fromUnit;
    var base_to_unit = toUnit;
    var from_multiplier = 1;
    var to_multiplier = 1;
    var alt;
    // Lookup from and to units
    for (var i = 0; i < units.length; i++) {
        alt = (units[i][2] === null) ? [] : units[i][2];
        if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
            from = units[i];
        }
        if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
            to = units[i];
        }
    }
    // Lookup from prefix
    if (from === null) {
        var from_binary_prefix = binary_prefixes[fromUnit.substring(0, 2)];
        var from_unit_prefix = unit_prefixes[fromUnit.substring(0, 1)];
        // Handle dekao unit prefix (only unit prefix with two characters)
        if (fromUnit.substring(0, 2) === 'da') {
            from_unit_prefix = ["dekao", 1e+01, "da"];
        }
        // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
        if (from_binary_prefix) {
            from_multiplier = from_binary_prefix[2];
            base_from_unit = fromUnit.substring(2);
        }
        else if (from_unit_prefix) {
            from_multiplier = from_unit_prefix[1];
            base_from_unit = fromUnit.substring(from_unit_prefix[2].length);
        }
        // Lookup from unit
        for (var j = 0; j < units.length; j++) {
            alt = (units[j][2] === null) ? [] : units[j][2];
            if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
                from = units[j];
            }
        }
    }
    // Lookup to prefix
    if (to === null) {
        var to_binary_prefix = binary_prefixes[toUnit.substring(0, 2)];
        var to_unit_prefix = unit_prefixes[toUnit.substring(0, 1)];
        // Handle dekao unit prefix (only unit prefix with two characters)
        if (toUnit.substring(0, 2) === 'da') {
            to_unit_prefix = ["dekao", 1e+01, "da"];
        }
        // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
        if (to_binary_prefix) {
            to_multiplier = to_binary_prefix[2];
            base_to_unit = toUnit.substring(2);
        }
        else if (to_unit_prefix) {
            to_multiplier = to_unit_prefix[1];
            base_to_unit = toUnit.substring(to_unit_prefix[2].length);
        }
        // Lookup to unit
        for (var k = 0; k < units.length; k++) {
            alt = (units[k][2] === null) ? [] : units[k][2];
            if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
                to = units[k];
            }
        }
    }
    // Return error if a unit does not exist
    if (from === null || to === null) {
        throw new Errors_1.NAError("Invalid units for conversion.");
    }
    // Return error if units represent different quantities
    if (from[3] !== to[3]) {
        throw new Errors_1.NAError("Invalid units for conversion.");
    }
    // Return converted number
    return n * from[6] * from_multiplier / (to[6] * to_multiplier);
};
exports.CONVERT = CONVERT;
/**
 * Removes leading and trailing spaces in a specified string.
 * @param value - The string or reference to a cell containing a string to be trimmed.
 * @returns {string}
 * @constructor
 */
var TRIM = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TRIM");
    var text = TypeConverter_1.TypeConverter.firstValueAsString(value);
    return text.trim();
};
exports.TRIM = TRIM;
/**
 * Converts text to lowercase.
 * @param value - Text to convert.
 * @constructor
 */
var LOWER = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "LOWER");
    var text = TypeConverter_1.TypeConverter.firstValueAsString(value);
    return text.toLowerCase();
};
exports.LOWER = LOWER;
/**
 * Converts text to uppercase.
 * @param value - Text to convert.
 * @constructor
 */
var UPPER = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "UPPER");
    var text = TypeConverter_1.TypeConverter.firstValueAsString(value);
    return text.toUpperCase();
};
exports.UPPER = UPPER;
/**
 * Returns string arguments as text, or the empty string if the value is not text.
 * @param value - Value to return.
 * @constructor
 */
var T = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "T");
    var v = TypeConverter_1.TypeConverter.firstValue(value);
    if (typeof v === "string") {
        return v;
    }
    return "";
};
exports.T = T;
/**
 * Converts a number into a Roman numeral.
 * @param value - The value to convert. Must be between 0 and 3999.
 * @constructor
 * TODO: Second parameter should be 'rule_relaxation'.
 */
var ROMAN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ROMAN");
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (value < 1 || value > 3999) {
        throw new Errors_1.ValueError("Function ROMAN parameter 1 value is " + value
            + ", while valid values are between 1 and 3999 inclusive.");
    }
    // The MIT License
    // Copyright (c) 2008 Steven Levithan
    // https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
    var digits = String(value).split('');
    var key = ['',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX'
    ];
    var roman = '';
    var i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return new Array(+digits.join('') + 1).join('M') + roman;
};
exports.ROMAN = ROMAN;
/**
 * Converts a number into text according to a given format.
 * @param value - The value to be converted.
 * @param format - Text which defines the format. "0" forces the display of zeros, while "#" suppresses the display of
 * zeros. For example TEXT(22.1,"000.00") produces 022.10, while TEXT(22.1,"###.##") produces 22.1, and
 * TEXT(22.405,"00.00") results in 22.41. To format days: "dddd" indicates full name of the day of the week, "ddd"
 * short name of the day of the week, "dd" indicates the day of the month as two digits, "d" indicates day of the month
 * as one or two digits, "mmmmm" indicates the first letter in the month of the year, "mmmm" indicates the full name of
 * the month of the year, "mmm" indicates short name of the month of the year, "mm" indicates month of the year as two
 * digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "m" month
 * of the year as one or two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if
 * it follows hh, "yyyy" indicates year as four digits, "yy" and "y" indicate year as two digits, "hh" indicates hour
 * on a 24-hour clock, "h" indicates hour on a 12-hour clock, "ss.000" indicates milliseconds in a time, "ss" indicates
 * seconds in a time, "AM/PM" or "A/P" indicate displaying hours based on a 12-hour clock and showing AM or PM
 * depending on the time of day. Eg: `TEXT("01/09/2012 10:04:33AM", "mmmm-dd-yyyy, hh:mm AM/PM")` would result in
 * "January-09-2012, 10:04 AM".
 * @constructor
 */
var TEXT = function (value, format) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "TEXT");
    value = TypeConverter_1.TypeConverter.firstValue(value);
    function splitReplace(values, regex, index) {
        return values.map(function (value) {
            if (typeof value === "number") {
                return [value];
            }
            else if (value instanceof Array) {
                return splitReplace(value, regex, index);
            }
            else {
                var splits_1 = value.split(regex);
                var building_1 = [];
                if (splits_1.length === 1) {
                    return [splits_1];
                }
                splits_1.map(function (splitValue, splitIndex) {
                    building_1.push(splitValue);
                    if (splitIndex !== splits_1.length - 1) {
                        building_1.push(index);
                    }
                });
                return building_1;
            }
        });
    }
    // Short cut for booleans
    if (typeof value === "boolean") {
        return TypeConverter_1.TypeConverter.valueToString(value);
    }
    // If the format matches the date format
    if (format.match(/^.*(d|D|M|m|yy|Y|HH|hh|h|s|S|AM|PM|am|pm|A\/P|\*).*$/g)) {
        // If the format contains both, throw error
        if (format.indexOf("#") > -1 || format.indexOf("0") > -1) {
            throw new Errors_1.ValueError("Invalid format pattern '" + format + "' for TEXT formula.");
        }
        var valueAsMoment_1;
        if (typeof value === "string") {
            valueAsMoment_1 = TypeConverter_1.TypeConverter.stringToMoment(value);
            if (valueAsMoment_1 === undefined) {
                valueAsMoment_1 = TypeConverter_1.TypeConverter.decimalNumberToMoment(TypeConverter_1.TypeConverter.valueToNumber(value));
            }
        }
        else {
            valueAsMoment_1 = TypeConverter_1.TypeConverter.decimalNumberToMoment(TypeConverter_1.TypeConverter.valueToNumber(value));
        }
        var replacementPairs_1 = [
            // full name of the day of the week
            [/dddd/gi, valueAsMoment_1.format("dddd")],
            // short name of the day of the week
            [/ddd/gi, valueAsMoment_1.format("ddd")],
            // day of the month as two digits
            [/dd/gi, valueAsMoment_1.format("DD")],
            // day of the month as one or two digits
            [/d/gi, valueAsMoment_1.format("d")],
            // first letter in the month of the year
            [/mmmmm/gi, valueAsMoment_1.format("MMMM").charAt(0)],
            // full name of the month of the year
            [/mmmm/gi, valueAsMoment_1.format("MMMM")],
            // short name of the month of the year
            [/mmm/gi, valueAsMoment_1.format("MMM")],
            // month of the year as two digits or the number of minutes in a time
            [/mm/gi, function (monthOrMinute) {
                    return monthOrMinute === "month" ? valueAsMoment_1.format("MM") : valueAsMoment_1.format("mm");
                }],
            // month of the year as one or two digits or the number of minutes in a time
            [/m/g, function (monthOrMinute) {
                    return monthOrMinute === "month" ? valueAsMoment_1.format("M") : valueAsMoment_1.format("m");
                }],
            // year as four digits
            [/yyyy/gi, valueAsMoment_1.format("YYYY")],
            // year as two digits
            [/yy/gi, valueAsMoment_1.format("YY")],
            // year as two digits
            [/y/gi, valueAsMoment_1.format("YY")],
            // hour on a 24-hour clock
            [/HH/g, valueAsMoment_1.format("HH")],
            // hour on a 12-hour clock
            [/hh/g, valueAsMoment_1.format("hh")],
            // hour on a 12-hour clock
            [/h/gi, valueAsMoment_1.format("hh")],
            // milliseconds in a time
            [/ss\.000/gi, valueAsMoment_1.format("ss.SSS")],
            // seconds in a time
            [/ss/gi, valueAsMoment_1.format("ss")],
            // seconds in a time
            [/s/gi, valueAsMoment_1.format("ss")],
            [/AM\/PM/gi, valueAsMoment_1.format("A")],
            // displaying hours based on a 12-hour clock and showing AM or PM depending on the time of day
            [/A\/P/gi, valueAsMoment_1.format("A").charAt(0)]
        ];
        var builtList_1 = [format];
        replacementPairs_1.map(function (pair, pairIndex) {
            var regex = pair[0];
            builtList_1 = splitReplace(builtList_1, regex, pairIndex);
        });
        var lastRegEx_1 = "";
        return Filter_1.Filter.flatten(builtList_1).map(function (val) {
            if (typeof val === "number") {
                if (typeof replacementPairs_1[val][1] === "function") {
                    var monthOrMinute = "month";
                    // Hack-ish way of determining if MM, mm, M, or m should be evaluated as minute or month.
                    var lastRegExWasHour = lastRegEx_1.toString() === new RegExp("hh", "g").toString()
                        || lastRegEx_1.toString() === new RegExp("HH", "g").toString()
                        || lastRegEx_1.toString() === new RegExp("h", "g").toString();
                    if (lastRegExWasHour) {
                        monthOrMinute = "minute";
                    }
                    lastRegEx_1 = replacementPairs_1[val][0];
                    return replacementPairs_1[val][1](monthOrMinute);
                }
                lastRegEx_1 = replacementPairs_1[val][0];
                return replacementPairs_1[val][1];
            }
            return val;
        }).join("");
    }
    else {
        var numberValue = TypeConverter_1.TypeConverter.valueToNumber(value);
        // Format string can't contain both 0 and #.
        if (format.indexOf("#") > -1 && format.indexOf("0") > -1) {
            throw new Errors_1.ValueError("Invalid format pattern '" + format + "' for TEXT formula.");
        }
        // See https://regex101.com/r/Jji2Ng/8 for more information.
        var POUND_SIGN_FORMAT_CAPTURE = /^([$%+-]*)([#,]+)?(\.?)([# ]*)([$%+ -]*)$/gi;
        var matches = POUND_SIGN_FORMAT_CAPTURE.exec(format);
        if (matches !== null) {
            var headSignsFormat = matches[1] || "";
            var wholeNumberFormat = matches[2] || "";
            var decimalNumberFormat = matches[4] || "";
            var tailingSignsFormat = matches[5] || "";
            var commafyNumber = wholeNumberFormat.indexOf(",") > -1;
            var builder = MoreUtils_1.NumberStringBuilder.start()
                .number(numberValue)
                .commafy(commafyNumber)
                .integerZeros(1)
                .maximumDecimalPlaces(decimalNumberFormat.replace(/ /g, "").length)
                .head(headSignsFormat)
                .tail(tailingSignsFormat);
            return builder.build();
        }
        /*
        * See https://regex101.com/r/Pbx7js/6 for more information.
        * 1 = signs, currency, etc.
        * 2 = whole number including commas
        * 3 = decimal
        * 4 = decimal place including spaces
        * 5 = signs, currency, etc.
        * */
        var ZERO_FORMAT_CAPTURE = /^([$%+-]*)([0,]+)?(\.?)([0 ]*)([$%+ -]*)$/gi;
        matches = ZERO_FORMAT_CAPTURE.exec(format);
        if (matches !== null) {
            var headSignsFormat = matches[1] || "";
            var wholeNumberFormat = matches[2] || "";
            var decimalNumberFormat = matches[4] || "";
            var tailingSignsFormat = matches[5] || "";
            var commafyNumber = wholeNumberFormat.indexOf(",") > -1;
            var builder = MoreUtils_1.NumberStringBuilder.start()
                .number(numberValue)
                .commafy(commafyNumber)
                .integerZeros(wholeNumberFormat.replace(/,/g, "").length)
                .decimalZeros(decimalNumberFormat.replace(/ /g, "").length)
                .head(headSignsFormat)
                .tail(tailingSignsFormat);
            return builder.build();
        }
        // If the format didn't match the patterns above, it is invalid.
        throw new Errors_1.ValueError("Invalid format pattern '" + format + "' for TEXT formula.");
    }
};
exports.TEXT = TEXT;
/**
 * Looks for a string of text within another string. Where to begin the search can also be defined. The search term can
 * be a number or any string of characters. The search is case-sensitive.
 * @param searchFor - The text to be found.
 * @param searchIn - The text where the search takes place.
 * @param startAt - [OPTIONAL defaults to 1] - The position in the text from which the search starts.
 * @returns {number}
 * @constructor
 */
var FIND = function (searchFor, searchIn, startAt) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "FIND");
    searchFor = TypeConverter_1.TypeConverter.firstValueAsString(searchFor);
    searchIn = TypeConverter_1.TypeConverter.firstValueAsString(searchIn);
    startAt = MoreUtils_1.isUndefined(startAt) ? 1 : TypeConverter_1.TypeConverter.firstValueAsNumber(startAt);
    if (startAt < 1) {
        throw new Errors_1.ValueError("FIND parameter 3 value is " + startAt + ", but should be greater than or equal to 1.");
    }
    var index = searchIn.indexOf(searchFor, startAt - 1);
    if (index > -1) {
        return index + 1;
    }
    throw new Errors_1.ValueError("For FIND cannot find '" + searchFor + "' within '" + searchIn + "'.");
};
exports.FIND = FIND;
/**
 * Concatenates the values of one or more arrays using a specified delimiter.
 * @param delimiter - The string to place between the values.
 * @param values - The values to be appended using the delimiter.
 * @returns {string}
 * @constructor
 */
var JOIN = function (delimiter) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "JOIN");
    delimiter = TypeConverter_1.TypeConverter.firstValueAsString(delimiter);
    values = Filter_1.Filter.flattenAndThrow(values);
    return values.join(delimiter);
};
exports.JOIN = JOIN;
/**
 * Returns the length of a string including spaces.
 * @param value - The text whose length is to be determined.
 * @constructor
 */
var LEN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "LEN");
    value = TypeConverter_1.TypeConverter.firstValueAsString(value);
    return value.length;
};
exports.LEN = LEN;
/**
 * Returns the first character or characters in a text string.
 * @param text - The text where the initial partial words are to be determined.
 * @param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined,
 * one character is returned.
 * @returns {string}
 * @constructor
 */
var LEFT = function (text, numberOfCharacters) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "LEFT");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    numberOfCharacters = MoreUtils_1.isUndefined(numberOfCharacters) ? 1 : TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfCharacters);
    if (numberOfCharacters < 0) {
        throw new Errors_1.ValueError("Formula LEFT parameter 2 value is " + numberOfCharacters
            + ", but should be greater than or equal to 0.");
    }
    return text.substring(0, numberOfCharacters);
};
exports.LEFT = LEFT;
/**
 * Defines the last character or characters in a text string.
 * @param text - The text where the initial partial words are to be determined.
 * @param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined,
 * one character is returned.
 * @returns {string}
 * @constructor
 */
var RIGHT = function (text, numberOfCharacters) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "RIGHT");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    numberOfCharacters = MoreUtils_1.isUndefined(numberOfCharacters) ? 1 : TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfCharacters);
    if (numberOfCharacters < 0) {
        throw new Errors_1.ValueError("Formula RIGHT parameter 2 value is " + numberOfCharacters
            + ", but should be greater than or equal to 0.");
    }
    return text.substring(text.length - numberOfCharacters);
};
exports.RIGHT = RIGHT;
/**
 * Returns the position of a text segment within a character string. The start of the search can be set as an option.
 * The search text can be a number or any sequence of characters. The search is not case-sensitive.
 * @param findText - The text to be searched for.
 * @param withinText - The text where the search will take place
 * @param position - [OPTIONAL default 1] The position in the text where the search is to start.
 * @constructor
 */
var SEARCH = function (findText, withinText, position) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "SEARCH");
    findText = TypeConverter_1.TypeConverter.firstValueAsString(findText);
    withinText = TypeConverter_1.TypeConverter.firstValueAsString(withinText);
    position = MoreUtils_1.isUndefined(position) ? 0 : TypeConverter_1.TypeConverter.firstValueAsNumber(position);
    if (position < 0) {
        throw new Errors_1.ValueError("Formula SEARCH parameter 3 value is " + position
            + ", but should be greater than or equal to 1.");
    }
    var index = withinText.toLowerCase().indexOf(findText.toLowerCase(), position - 1);
    if (index > -1) {
        return index + 1;
    }
    throw new Errors_1.ValueError("For SEARCH evaluation, cannot find '" + findText + "' inside '" + withinText + "'");
};
exports.SEARCH = SEARCH;
/**
 * Repeats a character string by the given number of copies.
 * @param text - The text to be repeated.
 * @param numberOfReps - The number of repetitions
 * @constructor
 */
var REPT = function (text, numberOfReps) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "REPT");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    numberOfReps = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfReps);
    if (numberOfReps < 0) {
        throw new Errors_1.ValueError("Formula REPT parameter 2 value is " + numberOfReps
            + ", but should be greater than or equal to 0.");
    }
    return new Array(numberOfReps + 1).join(text);
};
exports.REPT = REPT;
/**
 * Converts a value into a number if possible.
 * @param value - The value to convert to a number.
 * @returns {number}
 * @constructor
 */
var VALUE = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "VALUE");
    value = TypeConverter_1.TypeConverter.firstValue(value);
    if (typeof value === "boolean") {
        throw new Errors_1.ValueError("VALUE parameter '" + value + "' cannot be parsed to number.");
    }
    return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
};
exports.VALUE = VALUE;
/**
 * Removes all non-printing characters from the string.
 * @param text - The text from which to remove all non-printable characters.
 * @returns {string}
 * @constructor
 */
var CLEAN = function (text) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "CLEAN");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    return text.replace(/[\0-\x1F]/g, "");
};
exports.CLEAN = CLEAN;
/**
 * Returns a text segment of a character string. The parameters specify the starting position and the number of
 * characters.
 * @param text - The text containing the characters to extract.
 * @param start - The position of the first character in the text to extract.
 * @param number - The number of characters in the part of the text.
 * @returns {string}
 * @constructor
 */
var MID = function (text, start, number) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "MID");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    start = TypeConverter_1.TypeConverter.firstValueAsNumber(start);
    number = TypeConverter_1.TypeConverter.firstValueAsNumber(number);
    if (number === 0) {
        return "";
    }
    if (number < 0) {
        throw new Errors_1.ValueError("MID parameter 3 value is " + number + ", but should be greater than or equal to 0.");
    }
    if (start < 1) {
        throw new Errors_1.NumError("Function MID parameter 2 value is " + start + ", but should be greater than or equal to 1.");
    }
    return text.substring(start - 1, start + number - 1);
};
exports.MID = MID;
var PROPER = function (text) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "PROPER");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    return text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
exports.PROPER = PROPER;
/**
 * Replaces part of a text string with a different text string. This function can be used to replace both characters and
 * numbers (which are automatically converted to text). The result of the function is always displayed as text.
 * @param text - The text of which a part will be replaced.
 * @param position - The position within the text where the replacement will begin.
 * @param length - The number of characters in text to be replaced.
 * @param newText - The text which replaces text.
 * @constructor
 */
var REPLACE = function (text, position, length, newText) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "REPLACE");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    position = TypeConverter_1.TypeConverter.firstValueAsNumber(position);
    if (position < 1) {
        throw new Errors_1.ValueError("Function REPLACE parameter 2 value is " + position
            + ", but should be greater than or equal to 1.");
    }
    length = TypeConverter_1.TypeConverter.firstValueAsNumber(length);
    if (length < 0) {
        throw new Errors_1.ValueError("Function REPLACE parameter 3 value is " + length
            + ", but should be greater than or equal to 1.");
    }
    newText = TypeConverter_1.TypeConverter.firstValueAsString(newText);
    return text.substr(0, position - 1) + newText + text.substr(position - 1 + length);
};
exports.REPLACE = REPLACE;
/**
 * Substitutes new text for old text in a string.
 * @param text - The text in which text segments are to be exchanged.
 * @param searchFor - The text segment that is to be replaced (a number of times)
 * @param replaceWith - The text that is to replace the text segment.
 * @param occurrence - [OPTIONAL] - Indicates how many occurrences of the search text are to be replaced. If this
 * parameter is missing, the search text is replaced throughout.
 * @returns {string}
 * @constructor
 */
var SUBSTITUTE = function (text, searchFor, replaceWith, occurrence) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 3, 4, "SUBSTITUTE");
    text = TypeConverter_1.TypeConverter.firstValueAsString(text);
    searchFor = TypeConverter_1.TypeConverter.firstValueAsString(searchFor);
    replaceWith = TypeConverter_1.TypeConverter.firstValueAsString(replaceWith);
    if (MoreUtils_1.isUndefined(occurrence)) {
        return text.replace(new RegExp(searchFor, 'g'), replaceWith);
    }
    occurrence = TypeConverter_1.TypeConverter.firstValueAsNumber(occurrence);
    if (occurrence < 0) {
        throw new Errors_1.ValueError("Function SUBSTITUTE parameter 4 value is " + occurrence
            + ", but should be greater than or equal to 0.");
    }
    var index = 0;
    var i = 0;
    while (text.indexOf(searchFor, index) > -1) {
        index = text.indexOf(searchFor, index);
        i++;
        if (i === occurrence) {
            return text.substring(0, index) + replaceWith + text.substring(index + searchFor.length);
        }
    }
    return text;
};
exports.SUBSTITUTE = SUBSTITUTE;
