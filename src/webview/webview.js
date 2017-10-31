var queryStringParamsObject = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

if (queryStringParamsObject.platform === 'facebook') {

    document.querySelector('#facebookContent').classList.add('contentSection--loaded');

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.com/en_US/messenger.Extensions.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'Messenger');

    window.extAsyncInit = function() {

        document.querySelector('#facebookCloseWebviewButton').addEventListener('click', function(elem) {
            MessengerExtensions.requestCloseBrowser(function success() {}, function error(err) {});
        });

        document.querySelector('#facebookSendMessageButton').addEventListener('click', function(elem) {
            var facebookSendMessageButton = document.querySelector('#facebookSendMessageButton');
            facebookSendMessageButton.innerText = 'Sending...';
            var request = new XMLHttpRequest();
            request.open('POST', '/facebook_send', true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.send(JSON.stringify({
                userId: queryStringParamsObject.userId,
                message: document.querySelector('#facebookMessageInput').value || 'Message sent from webview.'
            }));
            request.onreadystatechange = function () {
                var DONE = 4;
                var OK = 200;
                if (request.readyState === DONE) {
                    if (request.status === OK) {
                        facebookSendMessageButton.innerText = 'Sent!';
                    } else {
                        facebookSendMessageButton.innerText = 'Error sending message :(';
                    }
                    setTimeout(function() {
                        facebookSendMessageButton.innerText = 'Send Message';
                        document.querySelector('#facebookMessageInput').value = '';
                    }, 2000);
                }
            };
        });

    };
} else if (queryStringParamsObject.platform === 'google') {
    document.querySelector('#googleContent').classList.add('contentSection--loaded');
}