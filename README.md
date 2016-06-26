# node-apod
![](https://david-dm.org/SSARCandy/node-apod.svg) [![Build Status](https://travis-ci.org/SSARCandy/node-apod.svg?branch=master)](https://travis-ci.org/SSARCandy/node-apod) ![node version](https://img.shields.io/badge/node-%3E%3D4.4.4-brightgreen.svg)  
[![NPM](https://nodei.co/npm/node-apod.png?downloads=true)](https://nodei.co/npm/node-apod/)  
"Astronomy Picture of the Day" scraper for node, support multi-language  
DEMO PAGE: [http://ssarcandy.tw/node-apod/demo.html](http://ssarcandy.tw/node-apod/demo.html) 

## Install

```
npm install --save node-apod
``` 

## Usage

```js
var APOD = require('node-apod');
var apod = new APOD(API_KEY); // You can get API_KEY at https://api.nasa.gov/index.html#apply-for-an-api-key

apod.send({
    LANG: "en_us", // default en_us
    DATE: '2016-06-24' // default today
}, function(err, data) {
    console.log(data);
});
```

The response data format as follow:
```json
{
    "lang": "en_us",
    "copyright": "Laurie Hatch",
    "date": "2016-06-23",
    "explanation": "A Full Moon sets as the Solstice Sun rises in this June 20 dawn skyscape. Captured from a nearby peak in central California, planet Earth, the scene looks across the summit of Mount Hamilton and Lick Observatory domes on a calendar date that marks an astronomical change of seasons and hemispherical extremes of daylight hours. Earth's shadow stretches toward the Santa Cruz Mountains on the western horizon. Just above the atmospheric grey shadowband is a more colorful anti-twilight arch, a band of reddened, backscattered sunlight also known as the Belt of Venus. The interplay of solstice dates and lunar months does make this solstice and Full Moon a rare match-up. The next June solstice and Full Moon will fall on the same calendar date on June 21, 2062.",
    "hdurl": "http://apod.nasa.gov/apod/image/1606/LH7407_LickObservatorySolsticeDawnMoonset_1440x960.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Solstice Dawn and Full Moonset",
    "url": "http://apod.nasa.gov/apod/image/1606/LH7407_LickObservatorySolsticeDawnMoonset_1024x683.jpg"
}
```

## Support language:
 - `en_us`: English(default)
 - `zh_tw`: Traditional Chinese
 - `cs_cz`: Czech
 - `fr_fr`: French

If `LANG` is specified(and is valid), response data will get specified LANG's `title` and `explanation`.  
For example, set `LANG` as `Traditional Chinese`:

```js
apod({
    LANG: "zh_tw",
    DATE: '2016-06-23'
}, function(err, data) {
    console.log(data);
});
```  

Will Get something like this: 

```json
{
    "lang": "zh_tw",
    "copyright": "Laurie Hatch",
    "date": "2016-06-23",
    "explanation": "說明: 在這幅6月20日的黎明天空影像裡，東升的夏至太陽有西沉的滿月為伴。在天文學上標誌南北半球季節更迭和最長和最短白畫的這個日子，攝於地球．加州中部一座山峰的這幅影像，眺望鄰近漢密爾頓山頂和里克天文台的圓頂。影像中，地球的影子綿延向位在西方地平線的聖克魯斯山脈伸展；在灰色的大氣暗影帶之上，可見到名為金星帶的彩反輝弧，一圈由反向散射的陽光所構成的泛紅光帶。交替出現的至日與農曆月份，恰好在這一天帶來了罕見的夏至與滿月的交會。下一次夏至與滿月重逢，則要等到2062年的6月21日。(Mount \r\nHamilton 漢密爾頓山、漢莫頓山)",
    "hdurl": "http://apod.nasa.gov/apod/image/1606/LH7407_LickObservatorySolsticeDawnMoonset_1440x960.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "夏至黎明與滿月西沉",
    "url": "http://apod.nasa.gov/apod/image/1606/LH7407_LickObservatorySolsticeDawnMoonset_1024x683.jpg"
}
```

## Error Handle

#### [LANG] version not found.

This main site([NASA](http://apod.nasa.gov/)) is the first to update and the most likely to be up-to-date.  
For those other languages mirror sites, maybe not alway up-to-date.

If happended, will get error as follow:
```js
apod({
    LANG: "fr_fr",
    DATE: '2016-06-24'
}, function(err, data) {
    if (err) {
        console.error(err);
        // 2016-06-24 don't have(or not yet) fr_fr version.
    }
});
```

#### Response code not 200

If you get this error, means that the APOD servers cannot be reached.
