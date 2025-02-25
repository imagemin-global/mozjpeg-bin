import fs from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
import BinWrapper from "bin-wrapper";

const pkg = JSON.parse(
	fs.readFileSync(new URL("../package.json", import.meta.url))
);
const mirror =
	process.env.MOZJPEG_BINARY_SITE ||
	process.env.npm_config_mozjpeg_binary_site ||
	"https://raw.githubusercontent.com/imagemin/mozjpeg-bin";
const url = `${mirror}/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/cjpeg`, "darwin")
	.src(`${url}linux/cjpeg`, "linux")
	.src(`${url}win/cjpeg.exe`, "win32")
	.dest(fileURLToPath(new URL("../vendor", import.meta.url)))
	.use(process.platform === "win32" ? "cjpeg.exe" : "cjpeg");

export default binWrapper;
