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
        message: 'It works!  But this service is meant for HTTP posts for Dialogflow.'
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

expressServer.post('/facebook', function (request, response) {

    response.status(200).send('EVENT_RECEIVED');

    let webhookEvent = request.body.entry[0].messaging[0];

    console.log('post');

    if (webhookEvent.message) {
        logJsonToFile('original-incoming-facebook-data', request.body);
        let responseBody = {
            recipient: { id: webhookEvent.sender.id },
            message: { text: `You said: ${webhookEvent.message.text}` }
        };
        outboundRequest({
            // url: `https://graph.facebook.com/v2.6/me/messages?access_token=${facebookAccessToken}`,
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: 'EAABtUCCdPnMBANOabFxzvEQXNjudwIu4UOK6UmveVESZBWymZAr0EfFH9JtVSunG0HeVFgsv5sTWZCYF3bZBnpIemuYVwq5R5OiNUgjp0BhUfdqcEqYEbJxaiJ7c3F3jsCe3hM2gEdmV2BYVwqwrZBtEln1PV8BVA9mn0G34ghQZDZD'
            },
            method: 'POST',
            headers: [{ name: 'content-type', value: 'application/json' }],
            json: responseBody
        }, function (error, outboundResponse, outboundBody) {
            if (outboundBody && outboundBody.message_id) {
                console.log('success');
            } else {
                console.log('fail');
            }
        });
    } else if (webhookEvent.postback) {
        console.log('postback');
    }
});

expressServer.get('/facebook', function (request, response) {
    console.log('get');
    let mode = request.query['hub.mode'];
    let token = request.query['hub.verify_token'];

    if (true !== true) {
    // if (token !== facebookAccessToken) {
        response.sendStatus(403);
    } else {
        // what Facebook uses to verify the webhook
        if (mode === 'subscribe') {
            let challenge = request.query['hub.challenge'];
            response.status(200).send(challenge);
        } else {
            response.end(JSON.stringify({
                message: 'It works!  But this service is meant for handling HTTP posts for Facebook.'
            }));
        }
    }

});

expressServer.use('/static', express.static(`${__dirname}/webview`));

const PORT = process.env.PORT || '8080';

expressServer.listen(PORT, function () {
    console.log(`Load http://localhost:${PORT}/ in your web browser for local development.`);
})