import responses from '../responses';

export default function handleRequest(originalIncomingObjectFromDialogflow) {

    const action = originalIncomingObjectFromDialogflow.result.action;

    if (responses[action]) {

        let parameters = originalIncomingObjectFromDialogflow.result.parameters;

        const originalRequest = originalIncomingObjectFromDialogflow.originalRequest;

        if (originalRequest && originalRequest.source === 'google'
            && originalRequest.data.inputs && originalRequest.data.inputs[0]
            && originalRequest.data.inputs[0].intent === 'actions.intent.OPTION') {
            parameters.selectedOption = originalRequest.data.inputs[0].arguments[0].textValue
        }

        return responses[action]({
            parameters: parameters
        });
    }
    // actions.intent.PERMISSION is what Google uses to get the user access token
    // which is subsequently used in the profile JS to get the user profile data
    else if (action === 'actions.intent.PERMISSION') {
        return responses.welcome();
    }
    else if (action === 'input.unknown') {
        return responses.welcome();
    }
    // very last fallback
    else {
        return responses.welcome();
    }
}