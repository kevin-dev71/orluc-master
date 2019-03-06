const helpers = {};

helpers.trimString  = (text , startstring, endstring) => {
    return text.substring(startstring , endstring);
};

module.exports = helpers;