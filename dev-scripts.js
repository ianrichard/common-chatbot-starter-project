const { spawn } = require('child_process');

function runShellCommand(shellCommandName, shellCommandArgs, logLabel) {
    const shellCommand = spawn(shellCommandName, shellCommandArgs);
    shellCommand.stdout.on('data', function(data) {
        console.log(`Begin ${logLabel} Log --------------------`);
        console.log(data.toString().trim());
        console.log(`End ${logLabel} Log --------------------\n`);
    });
    return shellCommand;
}

// assigning to variables in case you want to do something with the processes
const projectBabelProcess = runShellCommand('babel', ['src', '-d', 'dist', '--copy-files', '-w', '-s'], 'Project Babel');
const commonChatbotBabelProcess = runShellCommand('babel', ['../common-chatbot/src', '-d', 'node_modules/common-chatbot/lib', '--copy-files', '-w', '-s'], 'Common Chatbot Module Babel');
const serverWithNodemonProcess = runShellCommand('nodemon', ['dist/server.js'], 'Server');
const localtunnelProcess = runShellCommand('lt', ['--subdomain', 'yoursubdomain', '--port', '8080'], 'Localtunnel');

// catches ctrl+c event
process.on('SIGINT', function(options, error) {
    process.exit();
    process.kill();
    if (error) console.log(error.stack);
});