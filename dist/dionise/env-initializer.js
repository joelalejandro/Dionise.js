"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = EnvInitializer;
var cli = _interopRequire(require("cli"));

var prompt = _interopRequire(require("cli-prompt"));

function EnvInitializer() {
	var env = {};
	var sendToEnv = function (data) {
		for (var d in data) env[d] = data[d];

		cli.native.fs.writeFile("dionise.json", JSON.stringify(env), function (err) {
			if (err) cli.fatal(err);
			cli.ok("Dionise environment configured");
		});
	};
	var configure = function () {
		prompt.multi([{
			key: "databaseModel",
			"default": "mysql",
			label: "Database model (mysql, oracle)"
		}, {
			key: "databaseHost",
			label: "Database host (name or IP)"
		}, {
			key: "databasePort",
			type: "number",
			label: "Database listener port"
		}, {
			key: "databaseUsername",
			label: "Database username with grant access to INFORMATION_SCHEMA (mysql) or USER_* engine views (oracle)"
		}, {
			key: "databasePassword",
			label: "Database password",
			type: "password"
		}, {
			key: "schemaName",
			label: "Schema name to analyze"
		}], sendToEnv);
	};

	cli.native.fs.exists("dionise.json", function (exists) {
		if (exists) {
			cli.error("Environment has been previously configured.");
			prompt("Do you wish to reconfigure (y/n)?", function (val) {
				if (val == "y") {
					configure();
				} else {
					cli.info("Environment remains unmodified.");
				}
			});
		} else {
			configure();
		}
	});
}