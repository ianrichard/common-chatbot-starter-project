import getResponses from '../responses';

export default function handleRequest(originalIncomingObjectFromApiAi) {
    
    const responses = getResponses();
    const action = originalIncomingObjectFromApiAi.result.action;

    if (responses[action]) {
        return responses[action]();
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