import { runningApp } from "./app";
import axios from "axios";
import { v4 as uuid } from "uuid";

runningApp();
async function main() {
	while (true) {
		let random = "0x" + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		// random = random + Math.random().toString(16).substr(2, 22);
		let collectionName = uuid();
		let userAddress1 = `${random.slice(0, 42)}`;
		let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduYXR1cmUiOiIweDhiOGIxNzE0Yjc1ZmNmYTEyZjc1ZjcxMGJiNTZjOGY0YjUzMjVjMWU1NTQ5ZDZlNzJkYWNmMjAzMTRlZGNhZjEzZjA5ZjI2OTQ2YWMwNTkyYTI4NzZhYWVjMmI4M2JjZmUzODIzNDRjZjc2NWExNDE5ODU5ODY4ODJjOTU2ZTE2MWMiLCJzZWNyZXQiOiJXZWxjb21lIHRvIE1ldGFzcGFjZWN5IGxvb2tzIGZvcndhcmQgdG8gcHJvdmlkaW5nIGFuIGlubm92YXRpdmUgTkZUIHNvbHV0aW9uIGZvciBhbGwgb2Ygc2F2dnkgaG9kbGVycyB0byBjcmVhdGUgYSBtdXR1YWwgY29tbXVuaXR5IGFuZCBiZWNvbWUgYSBmdXR1cmUgZGVzdGluYXRpb24gaW4gdGhlIE5GVCBkZWNlbnRyYWxpc2VkIHdvcmxkLlxuTm9uY2U6IDc2NzcwOTYyNDQyIiwidXNlckFkZHJlc3MiOiIweGJmNjk0YmU3M2Q5ZDBmZTdkNDcwNzJiMzU3ZWRjZjNlNDFmN2VkOWYiLCJpYXQiOjE2NzY3NzA5NjUsImV4cCI6MTY3Njc3NDU2NX0.QlvkeVcg-2bNQAjPYpFuSKXMEIcpg0-IA18T8-rMqns"
		await axios
			.post(
				"https://api.metaspacecy.com/metaspacecy/users/login",
				{ userAddress: userAddress1 },
				{
					headers: {
						authorization: `Bearer ${token1}`,
					},
				},
			)
			.then(res => {
				let userAddress = res.data.data._doc.userAddress;
				console.log("user1", userAddress);
				axios
					.post(
						"https://api.metaspacecy.com/metaspacecy/collections/create",
						{
							category: 0,
							chainId: 56,
							collectionName,
							logo: 'https://metaspacecy.com/static/media/Asset3.08f01d8b.webp',
							userAddress,
							background: 'https://metaspacecy.com/static/media/Asset3.08f01d8b.webp',
							royalties: 10,
							description: new Array(2).join(collectionName),
							collectionStandard: "ERC721",
						},
						{
							headers: {
								authorization: `Bearer ${token1}`,
							},
						},
					)
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
}
main();
