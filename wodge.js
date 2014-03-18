"use strict";
var util = require("util");

exports.extend = extend;
exports.clone = clone;
exports.omit = omit;
exports.escapeRegExp = escapeRegExp;
exports.pluck = pluck;
exports.isNumber = isNumber;
exports.isPlainObject = isPlainObject;
exports.arrayify = arrayify;
exports.every = every;
exports.each = each;
exports.symbol = {
    tick: process.platform === "win32" ? "\u221A" : "✔︎",
    cross: process.platform === "win32" ? "\u00D7": "✖"
};
exports.bytesToSize = bytesToSize;
exports.getHomeDir = getHomeDir;
exports.fill = fill;
exports.padRight = padRight;
exports.exists = exists;
exports.without = without;

function extend(){
    var args = arrayify(arguments);
    return args.reduce(function(prev, curr){
        if (typeof curr !== "object") return prev;
        for (var prop in curr){
            prev[prop] = curr[prop];
        }
        return prev;
    }, {});
};

function clone(obj){
    var output = {};
    for (var prop in obj){
        output[prop] = obj[prop];
    }
    return output;
};

function omit(obj, toOmit){
    toOmit = exports.arrayify(toOmit);
    var output = exports.clone(obj);
    for (var prop in toOmit){
        delete output[prop];
    }
    return output;
};

function escapeRegExp(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
};

function pluck(object, fn){
    var output = [];
    for (var prop in object){
        if (fn(object[prop])) output.push(prop);
    }
    return output;
};

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
function isPlainObject(o){
    return typeof o === "object" && !Array.isArray(o);
};

function arrayify(arr){
    if (arr === null || arr === undefined){
        return [];
    } else if (!Array.isArray(arr) && typeof arr === "object" && arr.length >= 0 && arr.length === Math.floor(arr.length)){
        return Array.prototype.slice.call(arr);
    } else {
        return Array.isArray(arr) ? arr : [ arr ];
    }
};

function every(obj, callback){
    var every = true;
    for (var prop in obj){
        every = every && callback(obj[prop], prop);
    }
    return every;
};

function each(obj, callback){
    for (var prop in obj){
        callback(obj[prop], prop);
    }
};

function bytesToSize(bytes, precision){
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';

    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';

    } else {
        return bytes + ' B';
    }
};

function getHomeDir() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

function fill(fillWith, len){
    var buffer = new Buffer(len);
    buffer.fill(fillWith);
    return buffer.toString();
};

function padRight(input, width, padWith){
    padWith = padWith || " ";
    if (input.length < width){
        return input + exports.fill(padWith, width - input.length);
    } else {
        return input;
    }
};

function exists(arr, value){
    return arr.indexOf(value) > -1;
}

function without(arr, toRemove){
    toRemove = exports.arrayify(toRemove);
    return arr.filter(function(item){
        return !exports.exists(toRemove, item);
    });
};
