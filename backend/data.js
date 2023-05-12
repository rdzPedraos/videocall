const fs = require('fs');
const url = './history.json';

function writeData(data) {
	fs.writeFile(url, JSON.stringify(data), 'utf-8', error => {
		console.log(error);
	});
}

function readData() {
	return JSON.parse(fs.readFile('archivo.json', 'utf8'));
}

export { writeData, readData };
