"use strict";
var util = require("util"),
    path = require("path");

/* The module API */
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
    > w.extend({}, { one: 1, three: 3 }, { one: "one", two: 2 }, { four: 4 });
    { one: 'one',
      three: 3,
      two: 2,
      four: 4 }
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
Creates a new object, copying the properties from the input object
@param {Object} input - the object to clone
@returns {Object}
@example
    > date = new Date()
    Fri May 09 2014 13:54:34 GMT+0200 (CEST)
    > w.clone(date)
    {}  // a Date instance doensn't own any properties
    > date.clive = "hater"
    'hater'
    > w.clone(date)
    { clive: 'hater' }
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
@param {Object} - the object to clone
@param {string[]} - an array of property names to omit from the clone
@returns {Object}
@example
    > w.omit({ one: 1, two: 2, three: 3, four: 4 }, [ "two", "four" ]);
    { one: 1, three: 3 }
*/
function omit(object, toOmit){
    toOmit = arrayify(toOmit);
    var output = clone(object);
    toOmit.forEach(function(omit){
        delete output[omit];
    });
    return output;
}

/**
escape special regular expression characters
@example
    > w.escapeRegExp("(.*)");
    '\\(\\.\\*\\)'
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
    > var data = [
    ...     {one: 1, two: 2},
    ...     {two: "two"},
    ...     {one: "one", two: "zwei"},
    ... ];
    undefined
    > w.pluck(data, "one");
    [ 1, 'one' ]
    > w.pluck(data, "two");
    [ 2, 'two', 'zwei' ]
    > w.pluck(data, "one", "two");
    [ 1, 'two', 'one' ]
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

/**
Returns true if input is a number
@example
    > w.isNumber(0)
    true
    > w.isNumber(1)
    true
    > w.isNumber(1.1)
    true
    > w.isNumber(0xff)
    true
    > w.isNumber(0644)
    true
    > w.isNumber(6.2e5)
    true
    > w.isNumber(a)
    false
    > w.isNumber(NaN)
    false
    > w.isNumber(Infinity)
    false
*/
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
Returns true if input type is `object` and not an Array
@param {*} - the input to test
@returns {boolean}
@example
    > w.isPlainObject(new Date())
    true
    > w.isPlainObject({ clive: "hater" })
    true
    > w.isPlainObject([ 0, 1 ])
    false
*/
function isPlainObject(input){
    return typeof input === "object" && !Array.isArray(input);
}

/**
Takes input and guarantees an array back. Result can be one of three things:

- puts a single scalar in an array
- converts array-like object (e.g. `arguments`) to a real array
- converts null or undefined to an empty array

@param {*} - the input value to convert to an array
@returns {Array}
@example
    > w.arrayify(null)
    []
    > w.arrayify(0)
    [ 0 ]
    > w.arrayify([ 1, 2 ])
    [ 1, 2 ]
    > function f(){ return w.arrayify(arguments); }
    undefined
    > f(1,2,3)
    [ 1, 2, 3 ]
*/
function arrayify(input){
    if (input === null || input === undefined){
        return [];
    } else if (isPlainObject(input) && input.length >= 0 && input.length === Math.floor(input.length)){
        return Array.prototype.slice.call(input);
    } else {
        return Array.isArray(input) ? input : [ input ];
    }
}

/**
Returns true if the supplied iterator function returns true for every property in the object
@param {Object} - the object to inspect
@param {Function} - the iterator function to run against each key/value pair, the args are `(value, key)`.
@returns {Boolean}
@example
    > function aboveTen(input){ return input > 10; }
    undefined
    > w.every({ eggs: 12, carrots: 30, peas: 100 }, aboveTen)
    true
    > w.every({ eggs: 6, carrots: 30, peas: 100 }, aboveTen)
    false
*/
function every(object, iterator){
    var result = true;
    for (var prop in object){
        result = result && iterator(object[prop], prop);
    }
    return result;
}

/**
Runs the iterator function against every key/value pair in the input object
@param {Object} - the object to iterate
@param {Function} - the iterator function to run against each key/value pair, the args are `(value, key)`.
@example
    > var total = 0;
    undefined
    > function addToTotal(n){ total += n; }
    undefined
    > w.each({ eggs: 3, celery: 2, carrots: 1 }, addToTotal)
    undefined
    > total
    6
*/
function each(object, callback){
    for (var prop in object){
        callback(object[prop], prop);
    }
}

/**
Convert bytes to human-readable size
@param {number} - the bytes value to convert
@param {number} [precision] - number of decimal places
@returns {string}
@example
    > w.bytesToSize(10000)
    '10 KB'
    > w.bytesToSize(10000, 1)
    '9.8 KB'
    > w.bytesToSize(10000, 2)
    '9.77 KB'
    > w.bytesToSize(10000, 3)
    '9.766 KB'
*/
function bytesToSize(bytes, precision){
    var kilobyte = 1024,
        megabyte = kilobyte * 1024,
        gigabyte = megabyte * 1024,
        terabyte = gigabyte * 1024;

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
@example
    > w.getHomeDir()
    '/Users/Lloyd'
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
