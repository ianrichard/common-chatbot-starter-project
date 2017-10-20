const express = require('express');
const app = express();

const fs = require('fs');

import {getResponseObjectForDialogflow, setUserProfile} from 'common-chatbot-ui';
import handleRequest from './utils/request-handler';
import logJsonToFile from './utils/log-json-to-file';

app.get('/', function (req, res) {
    res.end(JSON.stringify({
        message: 'It works!  But this service is meant for posts bro.'
    }));
});

app.post('/', function (req, res) {
    let responseBody = '';

    req.on('data', function (data) {
        responseBody += data;
    });

    req.on('end', function () {

        const originalIncomingObjectFromDialogflow = JSON.parse(responseBody);

        // useful for seeing what comes back from Dialogflow
        logJsonToFile('original-incoming-dialogflow-data', originalIncomingObjectFromDialogflow);

        const config = {
            facebookAccessToken: fs.readFileSync(`${__dirname.split('dist')[0]}facebook-access-token.txt`, 'utf8')
        };

        // setUserProfile(originalIncomingObjectFromDialogflow, config).then(() => {
            const customResponseObject = handleRequest(originalIncomingObjectFromDialogflow);
            res.end(JSON.stringify(getResponseObjectForDialogflow(customResponseObject, originalIncomingObjectFromDialogflow)));
        // });
    });
});

app.use('/static', express.static(`${__dirname}/webview`));

const PORT = process.env.PORT || '8080';

app.listen(PORT, function () {
    console.log(`Load http://localhost:${PORT}/ in your web browser for local development.`);
})