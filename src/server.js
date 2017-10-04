const http = require('http');
const fs = require('fs');

import {getResponseObjectForApiAi, setUserProfile} from 'api-ai-webhook-utils';
import handleRequest from './utils/request-handler';
import logJsonToFile from './utils/log-json-to-file';

function requestHandler(req, res) {

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        res.end(JSON.stringify({
            message: 'It works!  But this service is meant for posts bro.'
        }));
    }

    else if (req.method === 'POST') {
        let responseBody = '';

        req.on('data', function (data) {
            responseBody += data;
        });

        req.on('end', function () {

            const originalIncomingObjectFromApiAi = JSON.parse(responseBody);

            // useful for seeing what comes back from api.ai
            logJsonToFile('original-incoming-api-ai-data', originalIncomingObjectFromApiAi);

            const config = {
                facebookAccessToken: fs.readFileSync(`${__dirname.split('dist')[0]}facebook-access-token.txt`, 'utf8')
            };

            setUserProfile(originalIncomingObjectFromApiAi, config).then(() => {
                const customResponseObject = handleRequest(originalIncomingObjectFromApiAi);
                res.end(JSON.stringify(getResponseObjectForApiAi(customResponseObject, originalIncomingObjectFromApiAi)));
            })
        });
    }

}

const PORT = process.env.PORT || '8080';

http.createServer(requestHandler).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(`Load http://localhost:8080/ in your web browser for local development.`)
});