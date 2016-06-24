function leftpad(str) {
    return ("0" + str).slice(-2);
}

var formatDate = function (str) {
    var date = new Date(str);
    if (!str) return '';
    if (!~str.indexOf('-')) return '';
    if (date.getFullYear() < 1996) return '';

    return `${date.getFullYear()}-${leftpad(date.getMonth() + 1)}-${leftpad(date.getDate())}`;
}

module.exports = {
    formatDate: formatDate
};