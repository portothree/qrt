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

### windDirectionMean(input, options?)

#### input

Type: `array`

Array of directions to be used in the calc.

