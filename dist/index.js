"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('es6-promise').polyfill();
require('isomorphic-fetch');
const urijs_1 = __importDefault(require("urijs"));
const url = new urijs_1.default("https://api.fast.co");
const APP_SECRET = process.env.APP_SECRET;
async function authorize({ key, identifier, challengeId, secret, oth }) {
    secret = typeof secret === 'undefined' ? APP_SECRET : secret;
    const verify = url.directory("api/verify").query({ challengeId: challengeId, oth: oth, identifier: identifier, key: key, secret: secret });
    console.log(verify.valueOf());
    const response = await fetch(verify.valueOf());
    const data = await response.json(); // parses JSON response into native JavaScript objects
    console.log(data);
}
exports.authorize = authorize;
async function login({ identifier, key }) {
    // Endpoint: https://api.fast.co/api/invite
    const invite = url.directory("api/invite").query({ identifier: identifier, key: key });
    console.log(invite.query());
    console.log(invite.valueOf());
    const response = await fetch(invite.valueOf());
    const data = await response.json(); // parses JSON response into native JavaScript objects
    console.log(data);
}
exports.login = login;
function getParams(url_string) {
    var url = new URL(url_string);
    var identifier = url.searchParams.get("identifier");
    var oth = url.searchParams.get("oth");
    var challengeId = url.searchParams.get("challengeId");
    if (identifier && oth && challengeId) {
        return {
            identifier,
            oth,
            challengeId
        };
    }
    return null;
}
exports.getParams = getParams;
