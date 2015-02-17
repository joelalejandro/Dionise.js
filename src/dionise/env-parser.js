import * as fs from 'fs';
import Promise from 'promise';

export default function parseEnvironment(envStorage) {
	return new Promise(function(resolve, reject) {
		fs.exists("dionise.json", function(exists) {
			if (!exists) {
				reject("Missing 'dionise.json' environment configuration file. Run 'dionise init' to build it.")
			} else {
				fs.readFile("dionise.json", resolve);
			}
		});
	});
}