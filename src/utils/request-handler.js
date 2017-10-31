const fs = require('fs');

import responses from '../responses';

export default function handleRequest(originalIncomingObjectFromDialogflow) {

    const action = originalIncomingObjectFromDialogflow.result.action;
    let parameters = originalIncomingObjectFromDialogflow.result.parameters;
    const originalRequest = originalIncomingObjectFromDialogflow.originalRequest;

    if (originalRequest && originalRequest.source === 'google'
        && originalRequest.data.inputs && originalRequest.data.inputs[0]
        && originalRequest.data.inputs[0].intent === 'actions.intent.OPTION') {
        parameters.selectedOption = originalRequest.data.inputs[0].arguments[0].textValue
    }

    let config = {
        parameters: parameters
    };

    if (originalRequest.source === 'facebook') {
        config.facebook = {
            pageId: JSON.parse(fs.readFileSync(`${__dirname.split('dist')[0]}package.json`)).appSettings.facebook.pageId,
            userId: originalRequest.data.sender.id,
            appId: originalRequest.data.recipient.id
        };
    } else if (originalRequest.source === 'google') {
        config.google = {}
    }

    if (responses[action]) {
        return responses[action](config);
    }
    // actions.intent.PERMISSION is what Google uses to get the user access token
    // which is subsequently used in the profile JS to get the user profile data
    else if (action === 'actions.intent.PERMISSION') {
        return responses.welcome(config);
    }
    else if (action === 'input.unknown') {
        return responses.welcome(config);
    }
    // very last fallback
    else {
        return responses.welcome(config);
    }
}