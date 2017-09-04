"use strict";
exports.__esModule = true;
/**
 * Class to hold static methods for serialization.
 */
var Serializer = (function () {
    function Serializer() {
    }
    Serializer.serialize = function (value) {
        return "<" + (typeof value) + ": " + value + ">";
    };
    return Serializer;
}());
exports.Serializer = Serializer;
