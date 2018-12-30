# Import Polar Flow activity data to SATS exercise diary


1. Extract Polar Flow activity data by logging in to polar flow, go to https://flow.polar.com/diary/training-list and via Chrome's devtools - copy the json response from the /history API request. Save the array to ```./polardata.json```.
2. Add environment variables to the .env file or set them manually
```SATS_USERNAME=myusername```
```SATS_PASSWORD=mypassword```
3. Run ```node index.js```. Each activity will be posted to the SATS account provided. Failed request will be printed to the console.

### Notes
Currently, all activities are imported as "Cykling", since it's the only activity i recorded in with Polar :-)

A ```polardata.json``` file with a sample activity is provided.

Run at your own risk!