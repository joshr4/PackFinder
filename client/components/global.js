export let timeDisplay = function(dateObj, military = false) {
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

export let dateDisplay = function(dateObj) {
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

