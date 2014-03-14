"use strict";
var util = require("util"),
    l = console.log;

exports.extend = function(obj, srcObj){
    for (var prop in srcObj){
        obj[prop] = srcObj[prop];
    }
    return obj;
};

exports.clone = function(obj){
    var output = {};
    for (var prop in obj){
        output[prop] = obj[prop];
    }
    return output;
};

exports.escapeRegExp = function(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
};

exports.pluck = function(object, fn){
    var output = [];
    for (var prop in object){
        if (fn(object[prop])) output.push(prop);
    }
    return output;
};

exports.isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
exports.isPlainObject = function(o){
    return typeof o === "object" && !Array.isArray(o);
};

exports.arrayify = function(arr){
    if (arr === null || arr === undefined){
        return [];
    } else if (!Array.isArray(arr) && typeof arr === "object" && arr.length >= 0 && arr.length === Math.floor(arr.length)){
        return Array.prototype.slice.call(arr);
    } else {
        return Array.isArray(arr) ? arr : [ arr ];
    }
};

exports.array = function(a, n) {
    return Array.prototype.slice.call(a, n || 0);
};

exports.every = function(obj, callback){
    var every = true;
    for (var prop in obj){
        every = every && callback(obj[prop], prop);
    }
    return every;
};

exports.each = function(obj, callback){
    for (var prop in obj){
        callback(obj[prop], prop);
    }
};

if (process.platform === "win32") {
    exports.symbol = {
        tick: "\u221A",
        cross: "\u00D7"
    };
} else {
    exports.symbol = {
        tick: "✔︎",
        cross: "✖"
    };
}

exports.bytesToSize = function(bytes, precision){
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

exports.getHomeDir = function () {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
};

exports.fill = function(fillWith, len){
    var buffer = new Buffer(len);
    buffer.fill(fillWith);
    return buffer.toString();
};

exports.padRight = function(input, width, padWith){
    padWith = padWith || " ";
    if (input.length < width){
        return input + exports.fill(padWith, width - input.length);
    } else {
        return input;
    }
};

exports.exists = function(arr, value){
    return arr.indexOf(value) > -1;
}

exports.without = function(arr, toRemove){
    toRemove = exports.arrayify(toRemove);
    return arr.filter(function(item){
        return !exports.exists(toRemove, item);
    });
};
