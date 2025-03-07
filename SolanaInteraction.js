"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var fs = require("fs");
var path = require("path");
// Function to create a new Solana account
function createSolanaAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, keypair, retryAirdrop, keypairPath, balance;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
                    keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("solana-keypair.json", "utf-8"))));
                    console.log("New Solana Account Public Key:", keypair.publicKey.toString());
                    // Step 3: Request an airdrop of SOL to fund the account
                    console.log("Requesting airdrop...");
                    retryAirdrop = function () {
                        var args_1 = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args_1[_i] = arguments[_i];
                        }
                        return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (retries, delay) {
                            var i, airdropSignature, error_1;
                            if (retries === void 0) { retries = 5; }
                            if (delay === void 0) { delay = 1000; }
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < retries)) return [3 /*break*/, 10];
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 5, , 9]);
                                        return [4 /*yield*/, connection.requestAirdrop(keypair.publicKey, 1 * web3_js_1.LAMPORTS_PER_SOL // 1 SOL
                                            )];
                                    case 3:
                                        airdropSignature = _a.sent();
                                        // Step 4: Confirm the airdrop transaction
                                        return [4 /*yield*/, connection.confirmTransaction(airdropSignature)];
                                    case 4:
                                        // Step 4: Confirm the airdrop transaction
                                        _a.sent();
                                        console.log("Airdrop confirmed. Account funded with 1 SOL.");
                                        return [2 /*return*/];
                                    case 5:
                                        error_1 = _a.sent();
                                        console.error("Airdrop attempt ".concat(i + 1, " failed:"), error_1.message);
                                        if (!(i < retries - 1)) return [3 /*break*/, 7];
                                        console.log("Retrying in ".concat(delay, "ms..."));
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay); })];
                                    case 6:
                                        _a.sent();
                                        delay *= 2; // Exponential backoff
                                        return [3 /*break*/, 8];
                                    case 7: throw new Error("Airdrop failed after multiple attempts.");
                                    case 8: return [3 /*break*/, 9];
                                    case 9:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 10: return [2 /*return*/];
                                }
                            });
                        });
                    };
                    return [4 /*yield*/, retryAirdrop()];
                case 1:
                    _a.sent();
                    keypairPath = path.join(__dirname, "solana-keypair.json");
                    fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
                    console.log("Keypair saved to:", keypairPath);
                    return [4 /*yield*/, connection.getBalance(keypair.publicKey)];
                case 2:
                    balance = _a.sent();
                    console.log("Account Balance:", balance / web3_js_1.LAMPORTS_PER_SOL, "SOL");
                    return [2 /*return*/, keypair];
            }
        });
    });
}
// Run the function
createSolanaAccount().catch(function (err) {
    console.error("Error creating Solana account:", err);
});
