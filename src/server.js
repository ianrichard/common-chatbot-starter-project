const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const outboundRequest = require('request');

const expressServer = express();
expressServer.use(bodyParser.json());

import {getResponseObjectForDialogflow, setUserProfile} from 'common-chatbot';
import handleRequest from './utils/request-handler';
import logJsonToFile from './utils/log-json-to-file';

const facebookAccessToken = JSON.parse(fs.readFileSync(`${__dirname.split('dist')[0]}package.json`)).appSettings.facebook.accessToken;

expressServer.get('/', function (request, response) {
    response.end(JSON.stringify({
        message: 'It works!  But this service is meant for posts bro.'
    }));
});

expressServer.post('/', function (request, response) {

    const originalIncomingObjectFromDialogflow = request.body;

    // useful for seeing what comes back from Dialogflow
    logJsonToFile('original-incoming-dialogflow-data', originalIncomingObjectFromDialogflow);

    const config = {
        facebookAccessToken: facebookAccessToken
    };

    // setUserProfile(originalIncomingObjectFromDialogflow, config).then(() => {
        const customResponseObject = handleRequest(originalIncomingObjectFromDialogflow);
        response.end(JSON.stringify(getResponseObjectForDialogflow(customResponseObject, originalIncomingObjectFromDialogflow)));
    // });
});

expressServer.post('/facebook_send', function (request, response) {

    outboundRequest({
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${facebookAccessToken}`,
        method: 'POST',
        headers: [{ name: 'content-type', value: 'application/json' }],
        json: true,
        body: {
            recipient: { id: request.body.userId },
            message: { text: request.body.message }
        }
    }, function (error, outboundResponse, outboundBody) {
        if (outboundBody && outboundBody.message_id) {
            response.end(JSON.stringify({message: 'Successfully sent Facebook message'}));
        } else {
            response.end(JSON.stringify({message: 'Error sending Facebook message'}));
        }
    });

});

expressServer.use('/static', express.static(`${__dirname}/webview`));

const PORT = process.env.PORT || '8080';

expressServer.listen(PORT, function () {
    console.log(`Load http://localhost:${PORT}/ in your web browser for local development.`);
})