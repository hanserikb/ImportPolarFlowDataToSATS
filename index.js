require('dotenv').config()
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cookie = require('cookie');
const Activity = require('./Activity');
const ProgressBar = require('progress');
const { SATS_USERNAME, SATS_PASSWORD } = process.env;
const SATS_LOGIN_URL = 'https://www.sats.se/webapi/sats/auth/login';
const SATS_POST_ACTIVITY_URL = 'https://www.sats.se/mypages/webapi/activity/post';

/**
 * Grab the data and parse it
 */
const rawData = fs.readFileSync(path.resolve(__dirname, './polardata.json'), 'utf-8');
const parsedData = JSON.parse(rawData);
const activities = parsedData.map(({id, startDate, duration, sportName, hrAvg}) => new Activity({
  id: id,
  date: startDate,
  duration: duration,
  type: sportName,
  description: `Average heartrate: ${hrAvg}`
}));

/**
 * Login to SATS to get a auth token
 */
const bar = new ProgressBar(':bar', { total: activities.length });
axios.post(SATS_LOGIN_URL, {
    userName: SATS_USERNAME,
    Password: SATS_PASSWORD
  }).then(({data: {token, userId}}) => {

    /**
     * Post each activity to SATS
     */
    activities.forEach(activity => {
      axios.post(SATS_POST_ACTIVITY_URL, {
      date: new Date(activity.date).toISOString(),
      activityname: 'Cykling',
      comment: activity.description,
      duration: Math.floor(activity.duration / 1000 / 60),
      distance: 0,
      personId: userId
    }, {
      headers: {
        Cookie: cookie.serialize('Auth-SatsElixia', token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          domain: '.www.sats.se'
        })
      }
      }).then(bar.tick)
      .catch(() => {
        bar.tick();
        console.error(`FAIL: Activity ${activity.id} \n`);
      })
    });
  });