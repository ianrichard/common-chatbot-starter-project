const fs = require('fs');
const path = require('path');

export default function logJsonToFile(fileName, json) {

    const shouldWriteLogsToFiles = JSON.parse(fs.readFileSync(`${__dirname.split('dist')[0]}package.json`)).appSettings.writeLogsToFiles;

    if (shouldWriteLogsToFiles) {

        const targetDirectory = `${__dirname.split('dist')[0]}logs`;


        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory);
        }

        fs.writeFile(`${targetDirectory}/${fileName}.json`, JSON.stringify(json, null, 4), (err) => {
            if (err) throw err;
        });

        
    }

}
