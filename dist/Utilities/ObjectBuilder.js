"use strict";
exports.__esModule = true;
/**
 * Utility class to help build objects programmatically. Basically this allows me to have source code where constants
 * are keys in objects.
 */
var ObjectBuilder = /** @class */ (function () {
    function ObjectBuilder() {
        this.o = {};
    }
    ObjectBuilder.add = function (k, v) {
        var m = new ObjectBuilder();
        m.o[k.toString()] = v;
        return m;
    };
    ObjectBuilder.prototype.add = function (k, v) {
        this.o[k.toString()] = v;
        return this;
    };
    ObjectBuilder.prototype.build = function () {
        return this.o;
    };
    return ObjectBuilder;
}());
exports.ObjectBuilder = ObjectBuilder;
