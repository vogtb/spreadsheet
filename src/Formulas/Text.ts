import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  ValueError,
  NumError,
  RefError,
  NAError
} from "../Errors";

/**
 * Computes the value of a Roman numeral.
 * @param text - The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
var ARABIC = function (text?) {
  ArgsChecker.checkLength(arguments, 1, "ARABIC");
  if (typeof text !== "string") {
    throw new ValueError('Invalid roman numeral in ARABIC evaluation.');
  }
  var negative = false;
  if (text[0] === "-") {
    negative = true;
    text = text.substr(1);
  }
  // Credits: Rafa? Kukawski
  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    throw new ValueError('Invalid roman numeral in ARABIC evaluation.');
  }
  var r = 0;
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
    r += {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}[i];
  });
  if (negative) {
    return r * -1;
  }
  return r;
};

/**
 * Convert a number into a character according to the current Unicode table.
 * @param value - The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
var CHAR = function (value) : string {
  ArgsChecker.checkLength(arguments, 1, "CHAR");
  var n = TypeConverter.firstValueAsNumber(value);
  if (n < 1 || n > 1114112) { //limit
    throw new NumError("Function CHAR parameter 1 value " + n + " is out of range.");
  }
  return String.fromCharCode(n);
};

/**
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param value - The string whose first character's Unicode map value will be returned.
 * @returns {number} number of the first character's Unicode value
 * @constructor
 */
var CODE = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "CODE");
  var text = TypeConverter.firstValueAsString(value);
  if (text === "") {
    throw new ValueError("Function CODE parameter 1 value should be non-empty.");
  }
  return text.charCodeAt(0);
};

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
var SPLIT = function (text, delimiter, splitByEach?) : Array<string> {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "SPLIT");
  text = TypeConverter.firstValueAsString(text);
  delimiter = TypeConverter.firstValueAsString(delimiter);
  splitByEach = splitByEach === undefined ? false : TypeConverter.firstValueAsBoolean(splitByEach);
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
  } else {
    return text.split(delimiter);
  }
};

/**
 * Appends strings to one another.
 * @param values - to append to one another. Must contain at least one value
 * @returns {string} concatenated string
 * @constructor
 */
var CONCATENATE = function (...values) : string {
  ArgsChecker.checkAtLeastLength(values, 1, "CONCATENATE");
  var string = '';
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      string += CONCATENATE.apply(this, arguments[i]);
    } else {
      string += TypeConverter.valueToString(values[i]);
    }
  }
  return string;
};

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
  ArgsChecker.checkLength(arguments, 3, "CONVERT");
  var n = TypeConverter.firstValueAsNumber(value);
  var fromUnit = TypeConverter.firstValueAsString(startUnit);
  var toUnit = TypeConverter.firstValueAsString(endUnit);

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
    ["square meter", "m^2", null, "area", true, true, 1], // Added by @vogtb.
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
    } else if (from_unit_prefix) {
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
    } else if (to_unit_prefix) {
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
    console.log(from, to);
    throw new NAError("Invalid units for conversion.");
  }

  // Return error if units represent different quantities
  if (from[3] !== to[3]) {
    throw new NAError("Invalid units for conversion.");
  }

  // Return converted number
  return n * from[6] * from_multiplier / (to[6] * to_multiplier);
};


/**
 * Removes leading and trailing spaces in a specified string.
 * @param value - The string or reference to a cell containing a string to be trimmed.
 * @returns {string}
 * @constructor
 */
var TRIM = function (value) {
  ArgsChecker.checkLength(arguments, 1, "TRIM");
  var text = TypeConverter.valueToString(value);
  return text.trim();
};


export {
  ARABIC,
  CHAR,
  CODE,
  SPLIT,
  CONCATENATE,
  CONVERT,
  TRIM
}