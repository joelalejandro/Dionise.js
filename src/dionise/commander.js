import cli from 'cli';
import MySQLTableParser from './mysql/table-parser';
import EnvInitializer from './env-initializer';
import parseEnvironment from './env-parser';
import EnvStorage from './env-storage';

export default function Commander() {
	var env = new EnvStorage();

	cli.setApp('../package.json');
	cli.parse(null, {
		'init': "creates a configuration file setting up the database connection",
		'version': "prints the software's version",
		'publish-table': "creates a Web API based on a single table or view"
	});

	switch (cli.command) {
		case "init":
			EnvInitializer();
			break;
		case "publish-table":
			parseEnvironment(env).then()
			cli.debug(JSON.stringify(env));
			if (env.databaseModel==="mysql") {
				MySQLTableParser(env);	
			}
			break;
		case "version":
			process.stdout.write("You're using " + cli.app + ", version " + cli.version + ".\n");
			break;
	}
};