"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var getEnv_1 = require("../utils/getEnv");
var appConfig = function () { return ({
    NODE_ENV: (0, getEnv_1.getEnv)("NODE_ENV", "development"),
    PORT: (0, getEnv_1.getEnv)("PORT", "8000"), // getting first parameter value from .env file otherwise right side default value
    BASE_PATH: (0, getEnv_1.getEnv)("BASE_PATH", "/api"),
    MONGO_URI: (0, getEnv_1.getEnv)("MONGO_URI", ""),
    SESSION_SECRET: (0, getEnv_1.getEnv)("SESSION_SECRET"),
    SESSION_EXPIRES_IN: (0, getEnv_1.getEnv)("SESSION_EXPIRES_IN"),
    GOOGLE_CLIENT_ID: (0, getEnv_1.getEnv)("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: (0, getEnv_1.getEnv)("GOOGLE_CLIENT_SECRET"),
    GOOGLE_CALLBACK_URL: (0, getEnv_1.getEnv)("GOOGLE_CALLBACK_URL"),
    FRONTEND_ORIGIN: (0, getEnv_1.getEnv)("FRONTEND_ORIGIN", "localhost"),
    FRONTEND_GOOGLE_CALLBACK_URL: (0, getEnv_1.getEnv)("FRONTEND_GOOGLE_CALLBACK_URL")
}); };
exports.config = appConfig();
