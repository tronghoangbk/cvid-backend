import { runningApp } from "./app";
import axios from "axios";
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
				console.log("data1", res.data.data._doc.userAddress);
			})
			.catch(err => {
				console.log("err", err.message);
			});
		await axios
		.post("https://api.nftspacex.io/aptos/users/login", { userAddress: `${random.slice(0, 66)}` })
		.then(res => {
			console.log("data2", res.data.data._doc.userAddress);
		})
		.catch(err => {
			console.log("err", err.message);
		});
	}
}
main();
