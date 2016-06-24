console.log('This would be the main JS file.');
var url = "http://139.162.49.112:2048/";

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sendRequest() {
    var e = document.getElementById("LANG");
    var lang = e.options[e.selectedIndex].value;
    var date = document.getElementById("datepicker").value;

    httpGetAsync(url + lang + '/' + date, function (data) {
        console.log(lang);
        data = JSON.parse(data);
        document.querySelector('#result').innerHTML = JSON.stringify(data, null, 4);
    })
}