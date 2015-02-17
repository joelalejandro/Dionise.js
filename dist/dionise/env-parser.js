"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = EnvParser;
var cli = _interopRequire(require("cli"));

function EnvParser(envStorage) {
	cli.native.fs.exists("dionise.json", function (exists) {
		if (!exists) {
			cli.fatal("Missing 'dionise.json' environment configuration file. Run 'dionise init' to build it.");
		} else {
			cli.native.fs.readFile("dionise.json", envStorage.setEnv);
		}
	});
}