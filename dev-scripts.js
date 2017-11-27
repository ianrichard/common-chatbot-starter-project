const {spawn} = require('child_process');
const fs = require('fs');

function runShellCommand(shellCommandName, shellCommandArgs, logLabel) {
    spawn(shellCommandName, shellCommandArgs, {stdio: 'inherit', shell: true});
}

// if you want to work on the underlying common-chatbot module, clone it as a sibling to this project
// this script will automatically build on updates and put in your node_modules
if (fs.existsSync('../common-chatbot')) {
    runShellCommand('babel', ['../common-chatbot/src', '-d', 'node_modules/common-chatbot/lib', '--copy-files', '-w', '-s']);
};

runShellCommand('babel', ['src', '-d', 'dist', '--copy-files', '-w', '-s']);
runShellCommand('nodemon', ['dist/server.js']);
runShellCommand('lt', ['--subdomain', 'yoursubdomain', '--port', '8080']);

// catches ctrl+c event
process.on('SIGINT', function(options, error) {
    process.exit();
    process.kill();
    if (error) console.log(error.stack);
});