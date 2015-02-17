import cli from 'cli';
import mysql from 'mysql';

export default function MySQLTableParser(env) {
	var connection = mysql.createConnection({
		host: env.databaseHost,
		user: env.databaseUsername,
		password: env.databasePassword,
		port: env.databasePort,
		database: "INFORMATION_SCHEMA"
	});

	connection.connect(function(err) {
		if (err) {
			cli.fatal("Cannot connect to database: " + err.stack);
			return;
		}

		prompt("Enter table name", function(tableName) {
			if (!tableName) {
				cli.fatal("You must enter a table name for publishing.");
				return;
			}

			connection.query("SELECT 1 as table_exists FROM tables WHERE table_schema = ? AND table_name = ?", [env.schemaName, tableName], function(err, rows) {
				if (rows[0].table_exists !== 1) {
					cli.fatal("Cannot find table '" + tableName + "' in schema '" + env.schemaName + "'");
					return;
				} else {
					cli.ok("Found table '" + tableName + "' in schema '" + env.schemaName + "'");
				}
			});
		});
	});
}