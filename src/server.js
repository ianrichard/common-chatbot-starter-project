const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const outboundRequest = require('request');

const expressServer = express();
expressServer.use(bodyParser.json());

import {getDialogflowResponseObject, getGoogleResponseObject, getFacebookResponseArray, setUserProfileObject} from 'common-chatbot';
import getCommonChatbotResponseObject from './utils/request-handler';
import logJsonToFile from './utils/log-json-to-file';

const facebookAccessToken = JSON.parse(fs.readFileSync(`${__dirname.split('dist')[0]}package.json`)).appSettings.facebook.accessToken;

expressServer.get('/', function (request, response) {
    response.end(JSON.stringify({
        message: 'It works! But you should send posts to /dialogflow or /facebook.'
    }));
});

expressServer.get('/dialogflow', function (request, response) {
    response.end(JSON.stringify({
        message: 'It works!  But this service is meant for HTTP posts for Dialogflow.'
    }));
});

expressServer.post('/dialogflow', function (request, response) {

    const dialogflowIncomingObject = request.body;

    // useful for seeing what comes back from Dialogflow
    logJsonToFile('dialogflow-incoming-object-log', dialogflowIncomingObject);

    const profileConfigObject = {
        facebookAccessToken: facebookAccessToken
    };

    // setUserProfileObject(dialogflowIncomingObject, profileConfigObject).then(() => {
        const commonChatbotResponseObject = getCommonChatbotResponseObject({
            source: 'dialogflow',
            data: dialogflowIncomingObject
        });
        response.end(JSON.stringify(getDialogflowResponseObject(commonChatbotResponseObject, dialogflowIncomingObject)));
    // });
});

expressServer.post('/facebook', function (request, response) {

    // even if you respond below in the outbound request
    // Facebook needs to know you got the original post
    response.status(200).send('EVENT_RECEIVED');

    let webhookEventObject = request.body.entry[0].messaging[0];

    console.log('Facebook POST');

    if (webhookEventObject.message) {

        const facebookIncomingObject = request.body;
        logJsonToFile('facebook-incoming-object-log', facebookIncomingObject);

        const commonChatbotResponseObject = getCommonChatbotResponseObject({
            source: 'facebook',
            data: facebookIncomingObject
        });
        logJsonToFile('common-chatbot-abstracted-response-object-log', commonChatbotResponseObject);
        const facebookResponseArray = getFacebookResponseArray(commonChatbotResponseObject);
        console.log(facebookResponseArray);
        logJsonToFile('facebook-response-array-log', facebookResponseArray);

        facebookResponseArray.forEach((message, index) => {

            let responseBodyObject = {
                recipient: { id: webhookEventObject.sender.id },
                message: message
            };

            outboundRequest({
                url: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {
                    access_token: facebookAccessToken
                },
                method: 'POST',
                headers: [{ name: 'content-type', value: 'application/json' }],
                json: responseBodyObject
            }, function (error, outboundResponseObject, outboundBodyObject) {
                // console.log(outboundBodyObject);
                if (outboundBodyObject && outboundBodyObject.message_id) {
                    console.log('success');
                } else {
                    console.log('fail');
                }
            });

        });
    } else if (webhookEventObject.postback) {
        console.log('postback');
    }
});

expressServer.get('/facebook', function (request, response) {
    console.log('get');
    let mode = request.query['hub.mode'];
    let token = request.query['hub.verify_token'];

    // console.log(request);

    if (true !== true) {
    // if (token !== facebookAccessToken) {
        response.sendStatus(403);
    } else {
        // Facebook uses this to verify that your webhook exists
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
});