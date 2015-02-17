"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = Commander;
var cli = _interopRequire(require("cli"));

var MySQLTableParser = _interopRequire(require("./mysql/table-parser"));

var EnvInitializer = _interopRequire(require("./env-initializer"));

var EnvParser = _interopRequire(require("./env-parser"));

var EnvStorage = _interopRequire(require("./env-storage"));

function Commander() {
	var env = new EnvStorage();

	cli.setApp("../package.json");
	cli.parse(null, {
		init: "creates a configuration file setting up the database connection",
		version: "prints the software's version",
		"publish-table": "creates a Web API based on a single table or view"
	});

	switch (cli.command) {
		case "init":
			EnvInitializer();
			break;
		case "publish-table":
			EnvParser(env);
			cli.debug(JSON.stringify(env));
			if (env.databaseModel === "mysql") {
				MySQLTableParser(env);
			}
			break;
		case "version":
			process.stdout.write("You're using " + cli.app + ", version " + cli.version + ".\n");
			break;
	}
}