console.log('This would be the main JS file.');
var url = "https://exwd.csie.org/apod/";
var loading = false;


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
    var sp = document.getElementById('spinner').style.display='';
    var e = document.getElementById("LANG");
    var lang = e.options[e.selectedIndex].value;
    var date = document.getElementById("datepicker").value;

    httpGetAsync(url + lang + '/' + date, function (data) {
        console.log(lang);
        try {
            var data2 = JSON.parse(data);
            document.querySelector('#result').innerHTML = JSON.stringify(data2, null, 4);
        } catch (e) {
            document.querySelector('#result').innerHTML = data;
        }
        document.getElementById('spinner').style.display='none';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    flatpickr('#datepicker');    
})
