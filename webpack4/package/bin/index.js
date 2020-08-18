#!/usr/bin/env node
console.log('检测webpack4开始执行了');
require('@babel/register')
const path = require('path');
const process = require('process');
const fs = require('fs');
const Compiler = require('../lib/Compiler');


const configPath = path.join(process.cwd(), 'webpack4.config.js');
new Compiler(require(configPath))