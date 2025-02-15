"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
var getEnv = function (key, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    var value = process.env[key];
    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error("Environment Variable Key = ".concat(key, ", is not set"));
    }
    return value;
};
exports.getEnv = getEnv;
