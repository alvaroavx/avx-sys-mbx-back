const ical = require('node-ical');
const fetch = require('node-fetch');
/* eslint-disable no-unused-vars */



exports.GetCalendar = class GetCalendar {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const txt = await fetch('https://calendar.google.com/calendar/ical/k0sev8sd4ibc5lnthk9pveili0%40group.calendar.google.com/private-c15863bd744dea3aba5e74f141eda98d/basic.ics').then(a=>a.text());

    const cal = Object.values( await ical.async.parseICS(txt)).filter(a=>{
      return new Date(a.end) > new Date();
    }).sort((a,b)=>{
      return new Date(a.start) - new Date(b.start);
    });
    if(cal[0]){
      // https://calendar.google.com/calendar/u/3/r
      // type: 'VEVENT',
      // params: [],
      // start: 2021-07-08T08:45:00.000Z { tz: 'Etc/UTC' },
      // datetype: 'date-time',
      // end: 2021-07-08T09:45:00.000Z { tz: 'Etc/UTC' },
      // dtstamp: 2021-07-08T05:47:09.000Z { tz: 'Etc/UTC' },
      // uid: '38u5h9dt8crncj1unalch3jk6c@google.com',
      // created: 2021-07-08T05:42:18.000Z { tz: 'Etc/UTC' },
      // description: '',
      // lastmodified: 2021-07-08T05:45:50.000Z { tz: 'Etc/UTC' },
      // location: '',
      // sequence: '4',
      // status: 'CONFIRMED',
      // summary: 'E1',
      // transparency: 'OPAQUE'
      return cal[0];
    }
    return {};
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
