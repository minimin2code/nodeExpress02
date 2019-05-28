const express = require('express')

const f = express.static(__dirname + '/public');

console.log(f.toString())

