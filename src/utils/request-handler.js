const fs = require('fs');

import responses from '../responses';
import { request } from 'http';

export default function getCommonChatbotResponseObject(platform) {

    let determinedIntent, originalRequestObject;
    let responseConfigObject = {};

    if (platform.source === 'dialogflow') {

        const parameters = platform.data.result.parameters;

        determinedIntent = platform.data.result.action;

        // non-Dialogflow platform
        if (platform.data.originalRequest) {
            originalRequestObject = platform.data.originalRequest;
        }
        // Dialogflow web testing platform
        else {
            originalRequestObject = platform.data;
        }

        if (originalRequestObject && originalRequestObject.source === 'google'
            && originalRequestObject.data.inputs && originalRequestObject.data.inputs[0]
            && originalRequestObject.data.inputs[0].intent === 'actions.intent.OPTION') {
            parameters.selectedOption = originalRequestObject.data.inputs[0].arguments[0].textValue
        }

        responseConfigObject = {
            parameters: parameters
        };
    
        if (originalRequestObject.source === 'facebook') {
            responseConfigObject.facebook = {
                pageId: JSON.parse(fs.readFileSync(`${__dirname.split('dist')[0]}package.json`)).appSettings.facebook.pageId,
                userId: originalRequestObject.data.sender.id,
                appId: originalRequestObject.data.recipient.id
            };
        } else if (originalRequestObject.source === 'google') {
            responseConfigObject.google = {}
        }
    } else if (platform.source === 'facebook') {
        // TODO - handle facebook intent determination
        determinedIntent = 'welcome';
        console.log('--- platform.facebook ---');
        console.log(platform.data);
    }

    if (responses[determinedIntent]) {
        return responses[determinedIntent](responseConfigObject);
    }
    // actions.intent.PERMISSION is what Google uses to get the user access token
    // which is subsequently used in the profile JS to get the user profile data
    else if (determinedIntent === 'actions.intent.PERMISSION') {
        return responses.welcome(responseConfigObject);
    }
    else if (determinedIntent === 'input.unknown') {
        return responses.welcome(responseConfigObject);
    }
    // very last fallback
    else {
        return responses.welcome(responseConfigObject);
    }
}