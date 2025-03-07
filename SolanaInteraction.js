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
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
var fs = require("fs");
var path = require("path");
// Function to create a new Solana account
function createSolanaAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, keypair, airdropSignature, keypairPath, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("testnet"), "confirmed");
                    keypair = web3_js_1.Keypair.generate();
                    console.log("New Solana Account Public Key:", keypair.publicKey.toString());
                    // Step 3: Request an airdrop of SOL to fund the account (only works on devnet/testnet)
                    console.log("Requesting airdrop...");
                    return [4 /*yield*/, connection.requestAirdrop(keypair.publicKey, 1 * web3_js_1.LAMPORTS_PER_SOL // 1 SOL
                        )];
                case 1:
                    airdropSignature = _a.sent();
                    // Step 4: Confirm the airdrop transaction
                    return [4 /*yield*/, connection.confirmTransaction(airdropSignature)];
                case 2:
                    // Step 4: Confirm the airdrop transaction
                    _a.sent();
                    console.log("Airdrop confirmed. Account funded with 1 SOL.");
                    keypairPath = path.join(__dirname, "solana-keypair.json");
                    fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
                    console.log("Keypair saved to:", keypairPath);
                    return [4 /*yield*/, connection.getBalance(keypair.publicKey)];
                case 3:
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
