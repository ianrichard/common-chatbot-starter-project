# What is this?

This will allow you to connect your own webhooks to Dialogflow (formerly API.AI) for dynamic chat applications.

This is currently a work in progress and potentially unstable.

# Setup

This will take a little while :)

## Run Your Local Service

- Open your terminal
- `git clone git@github.com:ianrichard/common-chatbot-ui-starter-project.git`
- `cd common-chatbot-ui-starter-project`
- If you're going to use Facebook Messenger, make a facebook-access-token.txt in the root of the project next to package.json.  Paste the page access token as a single line in that file.  This is not checked in for security purposes and so people don't accidentally copy your project.
- `npm install`
- `npm run build`
    - This runs Babel for transpiling (converts big boy ES6 JavaScript to more ubiquitous old-school JavaScript) so the dist folder gets built and has updates.
    - This is very important!  If you do not do this, then the initial folders won't get created and the run / deploy won't work.  
    - Do this everytime you work on the project.
    - It will continue to run for all file save updates until you kill the process with Ctrl + C.
- Open a new tab
- `npm run start`
- Load the URL listed in the terminal such as `http://localhost:8080/`.  

## Start a Local Tunnel

- The local service alone will typically be of limited value if you need to hit your service from a webhook.  So what we need to do is tunnel your local project files to another server to make them available on a URL outside of your local environment.
- We'll be using a service called "localtunnel".  It is available because it's in the package.json for this project.
- Type `lt --port 8080` where the port matches the one listed above.
- A URL will be listed once that runs that you can hit in the browser such as `https://abcde12345.localtunnel.me`

## Configuring Dialogflow

### Set up the Project
- Be sure to follow all of the setup instructions from the [Dialogflow console](http://console.Dialogflow) for getting the project started and the integrations hooked up.
- Note that setting up Facebook Messenger and Google Assistant involves some work on their end and can take a little while.  Dialogflow does a nice job of providing you all the links, instructions and screenshots.

### Plumb Up the Action
- On any intent, including the default welcome one, be sure an action name is assigned.
- Under "Fulfillment", check "Use webhook"
- Note, you need to repeat this same thing for every new intent you make.
- If you use webhooks, then do not try and enter inputs manually in Dialogflow
- The action names will correspond to the keys of the return object in responses/index.js.  The initial welcome and errors are a bit of an exception and you can see how that's being dealt with in utils/request-handler.js.
- Also look at logs/original-incoming-dialogflow-data.json to see what is being processed.

### Configure the Webhook
- Select "Fulfillment" tab on the left side of the screen
- On the URL, put the URL of your service (note that with local tunnelling, it will probably pretty temporary, so you'll have to update periodically)
- Domains > Enable webhook for all domains

# Alternative Hosting Solutions

## Cloud 9

This is best if you don't have a local workspace configured.  Maybe you're on a corporate machine that can't install all of the software, you're new to development and don't want to bother with workspace setup, like the cloud aspect of C9 that can easily be loaded on any machine, etc.  The main downside is you can't edit files on the local machine and have to use their browser-based IDE.

You don't need to do this if you have the local workspace running as listed above.

- Open your project in [Cloud 9](https://c9.io). Sign up for a free account if you haven't yet done so.
- Follow all of the instructions on the "Run a Local Service" section except `npm run start`
- Open `dist/server.js` and hit the Run button.  
- You'll be able to see the service URL in the console such as `https://yourproject-yourname.c9users.io`
- The reason we didn't do `npm run start` is C9 will list the URL when you start it that way.  `npm run start` still works, just doesn't list the URL in the console.

## Google Cloud Platform

Local tunnelling and Cloud 9 are meant to be development tools, not production.  At some point, you'll need to deploy your code to a production server such as Google Cloud, Amazon Web Service (AWS), Digital Ocean, etc.

For the sake of this project, we'll use the Google Cloud Platform, but the concept is more or less the same for deploying it anywhere.

- If you're just getting started, be sure to follow the docs listed on the [Google App Engine Node.js Flexible Environment Documentation](https://cloud.google.com/appengine/docs/flexible/nodejs/).
- Once you have that set up, in your project be sure to do the build step above.
- Type `gcloud app deploy`
- It can take 10 mins or so, but once you're done, go to the [App Engine Dashboard](https://console.cloud.google.com/appengine) and open the project.  In the upper right portion of the screen, the URL for your service should be listed.  You can click it to load it.

