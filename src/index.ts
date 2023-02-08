import { runningApp } from "./app";
import axios from "axios";
runningApp();
async function main() {
	setInterval(() => {
		let random = "0x" + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random + Math.random().toString(16).substr(2, 22);
		random = random.slice(0, 44);
		axios
			.post("https://api.nftspacex.io/metaspacecy/users/login", { userAddress: `${random}` })
			.then(res => {
				console.log("data", res.data.data._doc.userAddress);
			})
			.catch(err => {
				console.log("err", err.message);
			});
	}, 100);
}
main();
