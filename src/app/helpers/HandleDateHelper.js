const removeHours = (date, hours) => (date.setHours(date.getHours() - hours));

module.exports = { removeHours };
