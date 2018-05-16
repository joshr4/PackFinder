const router = require('express').Router()
const {User, Address, Park, Visit} = require('../db/models')
const geolib = require('geolib');
module.exports = router

router.get('/', (req, res, next) => {
  Park.findAll({
      include:[
          {model: Visit, required:false,
            include:[{model:User}]},
            // {model:User, required:false},
        //   {model: Visit, required:false},
          {model: Address, required:false},
      ]
  })
    .then(parks => res.json(parks))
    .catch(next)
})

router.get('/:latitude/:longitude/:distance', (req, res, next) => {
  Park.findAll({
      include: [
          {model: Visit, required:false,
            include:[{model: User}]},
            // {model:User, required:false},
        //   {model: Visit, required:false},
          {model: Address, required:false},
      ]
  })
    .then(parks => {

      const filteredParks = parks.filter(park =>
        geolib.isPointInCircle(
          {latitude: park.address.location.lat, longitude: park.address.location.lng},
          {latitude: req.params.latitude, longitude: req.params.longitude},
          req.params.distance)
      );

      filteredParks.forEach(park => {
        park.address.location.distance = geolib.convertUnit('mi', geolib.getDistanceSimple({
          latitude: park.address.location.lat,
          longitude: park.address.location.lng
        }, {
          latitude: req.params.latitude,
          longitude: req.params.longitude
        }), 2)
      })

      let sortedParks = filteredParks.sort((a, b) => {
        var a = (a.address.location.distance)
        var b = (b.address.location.distance)

        return a - b;
      })

      res.json(sortedParks.slice(0, 20))})
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Park.findOne({
        where: {
            id:req.params.id,
        },
        include:[
            {model: Visit, required:false},
            {model: Address, required:false},
        ]
    }).then((park) => {res.json(park)});
 })

router.get('/:id/visits', (req, res, next) => {
    Park.findOne({
        where: {
            id:req.params.id,
        },
        include:[
            {model: Visit, required:false,
                include:[{model:User}]
            },
        ]
    }).then((park) => {res.json(park.visits)});
 })

 let timeDisplay = function(dateObj, military = false) {
    if (dateObj == '') {
      return ''
    }
    let hour = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let outputString = '';
    let suffix = '';
    if (!military) {
      if (hour >= 12) {
        hour -= 12;
        suffix = ' PM';
      }
      else {
        suffix = ' AM';
      }
    }
    let hourString = (hour < 10) ? '0' + hour + ':' : hour + ':';
    let minuteString = (minutes < 10) ? '0' + minutes : minutes;
    outputString = hourString + minuteString + suffix;
    return outputString;
  }
  
  let dateDisplay = function(dateObj) {
    let month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = dateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return month + '/' + day;
  }
  
  let strfTime = function(dateObj) {
    if (dateObj == '') {
      return ''
    }
    let month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = dateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let DString = month + '/' + day;
  
    let hour = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let hourString = (hour < 10) ? '0' + hour + ':' : hour + ':';
    let minuteString = (minutes < 10) ? '0' + minutes : minutes;
    let TString = hourString + minuteString;
  
    return DString + ' ' + TString;
  }
  
  let stringFormat = function(dateObj) {
    if (dateObj == '') {
      return ''
    }
    let year = dateObj.getFullYear();
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let hour = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let outputString = '';
    outputString = year + '-' + (month + 1) + '-' + day + ' ' + hour + ':' + minutes;
    return outputString;
  }
  
  let YmDFormat = function(dateObj) {
    let year = dateObj.getFullYear();
    let day = dateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }
  

router.get('/:id/visits/D3-data/days', async (req, res, next) => {
    let thisPark = await Park.findOne({
        where: {id:req.params.id},
        include:[{
            model: Visit, required:false,
            include:[{model:User}]}]
    });
    let visits = thisPark.visits;
    let dateMin = '';
    let dateMax = '';
    let minT = '';
    let maxT = '';
    //HOURLY VIEW
    // if (this.state.dayView) { 
    //   minT = this.state.selectedDate;
    //   let plusOne = minT;
    //   plusOne = new Date(minT.getTime() + dayPartition);
    //   maxT = plusOne;
    // }
    visits.forEach(visit => {
    let startT = new Date(visit.start);
    let endT = new Date(visit.end);
      if (minT == '' || startT < minT) {
          minT = startT;
      }
      if (dateMin == '' || startT < dateMin) {
        dateMin = startT;
      }

      if (maxT == '' || endT > maxT) {
        maxT = endT;
      }
      if (dateMax == '' || endT > dateMax) {
        dateMax = endT;
      }
    })

    let d3Data = [];
    let width = maxT - minT;
    
    let halfHourpartition = 1000 * 60 * 30;
    let hourPartition = 1000 * 60 * 60;
    let dayPartition = 24 * hourPartition;
    let datewidth = dateMax - dateMin;
    let nDays = datewidth/dayPartition;
    let dayOptions = [];
    let dateOnlyMin = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate(), 0, 0);

    let nPartitions = width / dayPartition;

    let maxVisits = 0;
    for (let i = 0; i < nPartitions; i++) {
      let intervalStart = new Date(minT.getTime() + dayPartition * i);
        let dateOnly = new Date(minT.getFullYear(), minT.getMonth(), minT.getDate(), 0, 0);
        intervalStart = new Date(dateOnly.getTime() + dayPartition * i);
      let intervalEnd = new Date(intervalStart.getTime() + dayPartition);
      let d3Elem = {
        timeObj: intervalStart,
        time: stringFormat(intervalStart),
        date: dateDisplay(intervalStart),
        timeDisplay: timeDisplay(intervalStart),
        strfTime: strfTime(intervalStart),
        // time: timeDisplay(intervalStart, true),
        // time: intervalStart.getTime(),
        visits: 0,
      };
      visits.forEach(visit => {
        let startT = new Date(visit.start);
        let endT = new Date(visit.end);
        // Setting X-label
        d3Elem.time = dateDisplay(intervalStart);
        if ((startT < intervalEnd && endT > intervalStart)) {
          d3Elem.visits++;
        }
      })
      if (d3Elem.visits > maxVisits) {
        maxVisits = d3Elem.visits;
      }
      d3Data.push(d3Elem);
    }
    res.json(d3Data);
})

router.get('/:id/visits/D3-data/average', async (req, res, next) => {
    let thisPark = await Park.findOne({
        where: {id:req.params.id},
        include:[{
            model: Visit, required:false,
            include:[{model:User}]}]
    });
    let visits = thisPark.visits;
    let dateMin = '';
    let dateMax = '';
    let minT = '';
    let maxT = '';
    let hourlyDict = [];
    for (let i = 1; i < 25; i ++) {
        let timeString = i + " AM";
        if (i == 12) {
            timeString = i + " PM";
        }
        if (i > 12) {
            timeString = (i - 12) + " PM";
        }
        hourlyDict.push({
            hour:i,
            average:0,
            visits:0,
            count:0,
            timeString,
        })
    }
    visits.forEach(visit => {
        let startT = new Date(visit.start);
        let endT = new Date(visit.end);
          if (minT == '' || startT < minT) {
              minT = startT;
          }
          if (dateMin == '' || startT < dateMin) {
            dateMin = startT;
          }
    
          if (maxT == '' || endT > maxT) {
            maxT = endT;
          }
          if (dateMax == '' || endT > dateMax) {
            dateMax = endT;
          }
    })
    let width = maxT - minT;
    let hourPartition = 1000 * 60 * 60;
    let nHours = width/hourPartition;
    for (let i = 0; i < nHours; i++) {
        let intervalStart = new Date(minT.getTime() + hourPartition * i);
        let thisHour = intervalStart.getHours() + 1;
        hourlyDict[thisHour - 1].count ++;
        // let dateOnly = new Date(minT.getFullYear(), minT.getMonth(), minT.getDate(), 0, 0);
        // intervalStart = new Date(dateOnly.getTime() + dayPartition * i);
        let intervalEnd = new Date(intervalStart.getTime() + hourPartition);
        // let d3Elem = {
        //   timeObj: intervalStart,
        //   time: stringFormat(intervalStart),
        //   date: dateDisplay(intervalStart),
        //   timeDisplay: timeDisplay(intervalStart),
        //   strfTime: strfTime(intervalStart),
        //   // time: timeDisplay(intervalStart, true),
        //   // time: intervalStart.getTime(),
        //   visits: 0,
        // };
        visits.forEach(visit => {
          let startT = new Date(visit.start);
          let endT = new Date(visit.end);
          // Setting X-label
        //   d3Elem.time = dateDisplay(intervalStart);
          if ((startT < intervalEnd && endT > intervalStart)) {
            // d3Elem.visits++;
                hourlyDict[thisHour].visits ++;
                hourlyDict[thisHour].average = hourlyDict[thisHour].visits/hourlyDict[thisHour].count;
            }
        })
        // if (d3Elem.visits > maxVisits) {
        //   maxVisits = d3Elem.visits;
        // }
        // d3Data.push(d3Elem);
      }
    
    res.json(hourlyDict);
    return
    //HOURLY VIEW
    // if (this.state.dayView) { 
    //   minT = this.state.selectedDate;
    //   let plusOne = minT;
    //   plusOne = new Date(minT.getTime() + dayPartition);
    //   maxT = plusOne;
    // }

})
