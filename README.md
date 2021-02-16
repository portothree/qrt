# qrt [![Build Status](https://travis-ci.com/portothree/qrt.svg?branch=master)](https://travis-ci.com/github/portothree/qrt)

> Air Quality Toolkit

## Install

```
$ npm install qrt
```

## Usage

```js
const { windDirectionMean } = require('qrt');

windDirectionMean([360, 45, 90]);
//=> 45
```

## API

### windDirectionMean(...args)

-   args

    -   Wind direction only: `Array<number>`
    -   Wind direction and speed: `Array<number>, Array<number>`
    -   Wind direction and speed in a '2d' array: `<Array<Array<number>>>`

```js
// Wind directions only
windDirectionMean([360, 45, 90]); // => 45

// Wind directions and speeds
windDirectionMean([360, 45, 90], [1.48, 1.78, 3.44]); // => 59.76

// Wind directions and speeds in '2d' format
windDirectionMean([
	[360, 1.48],
	[45, 1.78],
	[90, 3.44],
]); // => 59.76
```

### airQualityIndex(PM10, PM25, NO2, O3, SO2)

-   PM10 - Average hourly as `Number`
-   PM25 - Average hourly as `Number`
-   NO2 - Average hourly as `Number`
-   O3 - Average hourly as `Number`
-   SO2 - Average hourly as `Number`

```js
airQualityIndex(5, 0, 0, 0, 0); // => { AQI_POL: 'PM10', AQI_GLOBAL: 5 }
```

### noiseMean(samples)

Calculates noise using logarithic average of the values

-   samples - Array of noise measurements, `Array<number>`

```js
noiseMean([70, 70, 70]); // => 161.1809565095832
```
