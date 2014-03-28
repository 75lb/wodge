"use strict";
/** @module wodge */
var util = require("util"),
    path = require("path");

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
exports.first = first;
exports.fileDepth = fileDepth;
exports.commonDir = commonDir;

function extend(){
    var args = arrayify(arguments);
    return args.reduce(function(prev, curr){
        if (typeof curr !== "object") return prev;
        for (var prop in curr){
            prev[prop] = curr[prop];
        }
        return prev;
    }, {});
}

function clone(obj){
    var output = {};
    for (var prop in obj){
        output[prop] = obj[prop];
    }
    return output;
}

function omit(obj, toOmit){
    toOmit = arrayify(toOmit);
    var output = clone(obj);
    for (var prop in toOmit){
        delete output[prop];
    }
    return output;
}

/**
escape special regular expression characters
@method
@example
    w.escapeRegExp("(.*)"); // => '\\(\\.\\*\\)'
*/
function escapeRegExp(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
}

/**
return an array containing the property names of `object` which pass the test function
@method
@example
var obj = {
    clive: 1,
    hater: 3
};
var list = w.pluck(obj, function(val){ return val === 1});
// list is [ "clive" ]
*/
function pluck(object, fn){
    var output = [];
    for (var prop in object){
        if (fn(object[prop])) output.push(prop);
    }
    return output;
}

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isPlainObject(o){
    return typeof o === "object" && !Array.isArray(o);
}

/**
Either:
    * puts a single scalar in an array
    * converts array-like object to a real array
    * converts null or undefined to an empty array
*/
function arrayify(arr){
    if (arr === null || arr === undefined){
        return [];
    } else if (!Array.isArray(arr) && typeof arr === "object" && arr.length >= 0 && arr.length === Math.floor(arr.length)){
        return Array.prototype.slice.call(arr);
    } else {
        return Array.isArray(arr) ? arr : [ arr ];
    }
}

function every(obj, callback){
    var ev = true;
    for (var prop in obj){
        ev = ev && callback(obj[prop], prop);
    }
    return ev;
}

function each(obj, callback){
    for (var prop in obj){
        callback(obj[prop], prop);
    }
}

function bytesToSize(bytes, precision){
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + " B";

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + " KB";

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + " MB";

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + " GB";

    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + " TB";

    } else {
        return bytes + " B";
    }
}
function getHomeDir() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}
function fill(fillWith, len){
    var buffer = new Buffer(len);
    buffer.fill(fillWith);
    return buffer.toString();
}
function padRight(input, width, padWith){
    padWith = padWith || " ";
    if (input.length < width){
        return input + fill(padWith, width - input.length);
    } else {
        return input;
    }
}

/**
@example
    exists([ 1, 2, 3 ], 2)             // true
    exists([
        { result: false, number: 1 },
        { result: false, number: 2 }
    ], { result: true })               // false

*/
function exists(arr, value){
    if (isPlainObject(value)){
        var query = value,
            found = false,
            index = 0,
            item;

        while(!found && (item = arr[index++])){
            for (var prop in query){
                found = query[prop] === item[prop];
                if (!found) break;
            }
        }
        return found;
    } else {
        return arr.indexOf(value) > -1;
    }
}

function without(arr, toRemove){
    toRemove = arrayify(toRemove);
    return arr.filter(function(item){
        return !exists(toRemove, item);
    });
}

/**
Works on an array of objects. Returns the first object with `property` set to `value`.
@alias module:wodge.first
*/
function first(arr, prop, val){
    var result = arr.filter(function(item){
        return item[prop] ? item[prop] === val : false;
    });
    return result ? result[0] : null;
}

function fileDepth(file){
    return file.split(path.sep).length;
}

function commonDir(files){
    return path.dirname(files.reduce(function(prev, curr){
        if (prev){
            return (fileDepth(curr) < fileDepth(prev)) ? curr : prev;
        } else {
            return curr;
        }
    }));
}
