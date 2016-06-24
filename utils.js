function leftpad(str) {
    return ("0" + str).slice(-2);
}

var formatDate = function (str) {
    var date = new Date(str);
    if (!str) return '';
    if (!~str.indexOf('-')) return '';
    if (date.getFullYear() < 1996) return '';

    return `${date.getUTCFullYear()}-${leftpad(date.getUTCMonth() + 1)}-${leftpad(date.getUTCDate())}`;
}

module.exports = {
    formatDate: formatDate
};