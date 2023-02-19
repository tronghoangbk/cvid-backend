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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
(0, app_1.runningApp)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            let random = "0x" + Math.random().toString(16).substr(2, 22);
            random = random + Math.random().toString(16).substr(2, 22);
            random = random + Math.random().toString(16).substr(2, 22);
            random = random + Math.random().toString(16).substr(2, 22);
            // random = random + Math.random().toString(16).substr(2, 22);
            let collectionName = (0, uuid_1.v4)();
            let userAddress1 = `${random.slice(0, 42)}`;
            let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduYXR1cmUiOiIweDhiOGIxNzE0Yjc1ZmNmYTEyZjc1ZjcxMGJiNTZjOGY0YjUzMjVjMWU1NTQ5ZDZlNzJkYWNmMjAzMTRlZGNhZjEzZjA5ZjI2OTQ2YWMwNTkyYTI4NzZhYWVjMmI4M2JjZmUzODIzNDRjZjc2NWExNDE5ODU5ODY4ODJjOTU2ZTE2MWMiLCJzZWNyZXQiOiJXZWxjb21lIHRvIE1ldGFzcGFjZWN5IGxvb2tzIGZvcndhcmQgdG8gcHJvdmlkaW5nIGFuIGlubm92YXRpdmUgTkZUIHNvbHV0aW9uIGZvciBhbGwgb2Ygc2F2dnkgaG9kbGVycyB0byBjcmVhdGUgYSBtdXR1YWwgY29tbXVuaXR5IGFuZCBiZWNvbWUgYSBmdXR1cmUgZGVzdGluYXRpb24gaW4gdGhlIE5GVCBkZWNlbnRyYWxpc2VkIHdvcmxkLlxuTm9uY2U6IDc2NzcwOTYyNDQyIiwidXNlckFkZHJlc3MiOiIweGJmNjk0YmU3M2Q5ZDBmZTdkNDcwNzJiMzU3ZWRjZjNlNDFmN2VkOWYiLCJpYXQiOjE2NzY3NzA5NjUsImV4cCI6MTY3Njc3NDU2NX0.QlvkeVcg-2bNQAjPYpFuSKXMEIcpg0-IA18T8-rMqns";
            yield axios_1.default
                .post("https://api.metaspacecy.com/metaspacecy/users/login", { userAddress: userAddress1 }, {
                headers: {
                    authorization: `Bearer ${token1}`,
                },
            })
                .then(res => {
                let userAddress = res.data.data._doc.userAddress;
                console.log("user1", userAddress);
                axios_1.default
                    .post("https://api.metaspacecy.com/metaspacecy/collections/create", {
                    category: 0,
                    chainId: 56,
                    collectionName,
                    logo: 'https://metaspacecy.com/static/media/Asset3.08f01d8b.webp',
                    userAddress,
                    background: 'https://metaspacecy.com/static/media/Asset3.08f01d8b.webp',
                    royalties: 10,
                    description: new Array(2).join(collectionName),
                    collectionStandard: "ERC721",
                }, {
                    headers: {
                        authorization: `Bearer ${token1}`,
                    },
                })
                    .then(res => {
                    console.log("collection1", res.data.data.collectionAddress);
                })
                    .catch(err => {
                    console.log("err", err.message);
                });
                token1 = res.data.token;
            })
                .catch(err => {
                console.log("err", err.message);
            });
            // axios
            // 	.post("https://api.nftspacex.io/aptos/users/login", { userAddress: `${random.slice(0, 66)}` })
            // 	.then(res => {
            // 		let userAddress = res.data.data._doc.userAddress;
            // 		console.log("user2", res.data.data._doc.userAddress);
            // 		// axios
            // 		// 	.post(`https://api.nftspacex.io/aptos/collection/create/userAddress/${userAddress}/chainId/2`, {
            // 		// 		collectionName,
            // 		// 		logo: new Array(10000).join(collectionName),
            // 		// 		description: new Array(10000).join(collectionName),
            // 		// 	})
            // 		// 	.then(res => {
            // 		// 		console.log("collection2", res.data.data.collectionAddress);
            // 		// 	})
            // 		// 	.catch(err => {
            // 		// 		console.log("err", err.message);
            // 		// 	});
            // 	})
            // 	.catch(err => {
            // 		console.log("err", err.message);
            // 	});
            // break;
        }
    });
}
// main();
