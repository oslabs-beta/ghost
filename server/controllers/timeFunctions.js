function convertTime(timestamp) {
  const dateObject = new Date(timestamp); //declare new data object
  const humanDataFormat = dateObject.toLocaleString('en-US', { timeZone: 'UTC' }); //convert to human-readable string
  return humanDataFormat
}

function convertToUnix(date) {
  const dateObject = new Date(date); //declare new date
  const unix = dateObject.getTime(); //convert to unix
  return unix
}

module.exports = {
  convertTime,
  convertToUnix
}
