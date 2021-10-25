# Smartsheets Automation Demo
Check out the walkthrough here: *link TBA*

# Get Started
 - `npm install`
 - `npm run start`
 - `localhost:3000`

# How it's made

 - `npm install smartsheet --save`
 - `npm install @google-cloud/logging --save`
 - `npm install body-parser --save`
 - if using GCP, add app.yaml for app engine
 - add smartsheet token from your smartsheet account API access tab (constants.js)
 - create a module file for interfacing with the smartsheet SDK
 - create CRUD routes for sheets & webhooks
 - create webhook handler routes for confirmation request (columns.js)
 - set up logging with gcp or your hosting env
 - for GCP get gcloud cli, create app.yaml, download service-account.json, run `gcloud app deploy`
 - if you havent already, set up the smartsheets you want to update
 - create a webhook trigered on updates to a sheet id of your choice
 - update the webhook to be enabled (requires an accessible https endpoint for verification)
 - write your automation logic and deploy it