"use strict";
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
exports.symbol = symbol;
exports.bytesToSize = bytesToSize;
exports.getHomeDir = getHomeDir;
exports.fill = fill;
exports.padRight = padRight;
exports.exists = exists;
exports.without = without;
exports.first = first;
exports.commonDir = commonDir;
exports.union = union;
exports.commonSequence = commonSequence;
exports.escapeForJSON = escapeForJSON;

/**
Merge a list of objects, left to right, into one. 
@param {...Object} object - a sequence of Object instances to be extended
@example
    w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
    // { one: "one", two: 2, three: 3, four: 4 }
*/
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

/**
Returns a copy of the input object
@param {Object} input - the object to clone
@returns {Object}
*/
function clone(obj){
    var output = {};
    for (var prop in obj){
        output[prop] = obj[prop];
    }
    return output;
}

/**
Returns a clone of the input object, minus the specified properties
@param {Object} input - the object to clone
@param {string[]} toOmit - an array of property names to omit from the clone
@returns {Object}
@example
    w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
    // { one: 1, three: 3 }
*/
function omit(obj, toOmit){
    toOmit = arrayify(toOmit);
    var output = clone(obj);
    toOmit.forEach(function(omit){
        delete output[omit];
    });
    return output;
}

/**
escape special regular expression characters
@example
    w.escapeRegExp("(.*)"); 
    // '\\(\\.\\*\\)'
*/
function escapeRegExp(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
}

/** 
Plucks the value of the specified property from each object in the input array
@param {Object[]} arrayOfObjects - the input array of objects
@param {...string} the property to pluck
@returns {Array} 
@example
    var data = [
        {one: 1, two: 2},
        {two: "two"},
        {one: "one", two: "zwei"},
    ];
    
    w.pluck(data, "one");
    // [ 1, "one" ]

    w.pluck(data, "two");
    // [ 2, "two", "zwei" ]

    w.pluck(data, "one", "two");
    // [ 1, "two", "one" ]
*/
function pluck(arrayOfObjects, property, property2, property3){
    return arrayOfObjects
        .filter(function(obj){
            if (property in obj) {
                return true;
            } else if (property2 in obj) {
                return true;
            } else if (property3 in obj) {
                return true;
            }
        })
        .map(function(obj){
            if (property in obj) {
                return obj[property];
            } else if (property2 in obj) {
                return obj[property2];
            } else if (property3 in obj) {
                return obj[property3];
            }
        });
}

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isPlainObject(o){
    return typeof o === "object" && !Array.isArray(o);
}

/**
Either:

- puts a single scalar in an array
- converts array-like object to a real array
- converts null or undefined to an empty array

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

/**
Cross-platform home directory retriever
@method
*/
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
*/
function first(arr, prop, val){
    var result = arr.filter(function(item){
        return item[prop] ? item[prop] === val : false;
    });
    return result ? result[0] : null;
}

/** 
commonDir returns the directory common to each path in the list
@param {Array} files - An array of file paths to inspect
@returns {string} - A single path ending with the path separator, e.g. "/user/some/folder/"
*/
function commonDir(files){
    return files
        .map(path.dirname)
        .map(function(dir){
            return dir.split(path.sep);
        })
        .reduce(commonSequence)
        .concat([""])
        .join(path.sep);
}

function union(array1, array2, idKey){
    array2.forEach(function(item){
        if (idKey){
            if (!first(array1, idKey, item[idKey])){
                array1.push(item);
            }
        } else if (!exists(array1, item)){
            array1.push(item);
        };
    });
    return array1;
}

function commonSequence(a, b){
    var result = [];
    for (var i = 0; i < Math.min(a.length, b.length); i++){
        if (a[i] === b[i]){
            result.push(a[i]);
        }
    }
    return result;
}

function escapeForJSON (str) {
    return str
      .replace(/[\\]/g, '\\\\')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\"]/g, '\\"')
      .replace(/[\t]/g, '\\t'); 
}

var symbol = {
    tick: process.platform === "win32" ? "\u221A" : "✔︎",
    cross: process.platform === "win32" ? "\u00D7": "✖"
};
