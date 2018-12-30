# Import Polar Flow activity data to SATS exercise diary

## Wat?
Takes a collection of activities exported from Polar Flow and imports it to your SATS exercise diary.

## Why?
I switched training center to SATS, who has their own exercise planning & scheduling tool, but wanted to keep all my cycling record tracked in Polar Flow.

1. Extract Polar Flow activity data by logging in to polar flow, go to https://flow.polar.com/diary/training-list and via Chrome's devtools - copy the json response from the /history API request. Save the array to ```./polardata.json```.
2. Add environment variables to the an [.env](https://github.com/motdotla/dotenv) file or set them manually
```SATS_USERNAME=myusername```
```SATS_PASSWORD=mypassword```
3. Run ```node index.js```. Each activity will be posted to the SATS account provided. Failed request will be printed to the console.

### Notes
Currently, all activities are imported as "Cykling", since it's the only activity i recorded with Polar :-)

A ```polardata.json``` file with a sample activity is provided.

Run at your own risk!