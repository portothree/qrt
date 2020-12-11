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

#### args

Type: `Array<number>`, `Array<number>, Array<number>` or `<Array<Array<number>>>`

In other words, you can pass wind directions only, wind directions and speed, and both in a '2d' array

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

#### PM10

Type: `Number`
Average hourly

#### PM25

Type: `Number`
Average hourly

#### NO2

Type: `Number`
Average hourly

#### O3

Type: `Number`
Average hourly

#### SO2

Type: `Number`
Average hourly

```js
airQualityIndex(5, 0, 0, 0, 0); // => { AQI_POL: 'PM10', AQI_GLOBAL: 5 }
```
