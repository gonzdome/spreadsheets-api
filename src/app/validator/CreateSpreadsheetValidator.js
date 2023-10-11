const HandleErrorHelper = require('../helpers/HandleErrorHelper');

module.exports = async (params) => {
  const { types, data } = params;

  if (!types.includes('xlsx') && !types.includes('csv')) throw HandleErrorHelper('Invalid Param', 'Choose the right types ex: "xlsx" and/or "csv"!');
  if (!data || data?.length === 0) throw HandleErrorHelper('Missing Param', 'Add the desired fields using this format, ex: data: [{ document: "...", name: "..." }, ...]');
};
