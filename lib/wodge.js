"use strict";
var util = require("util"),
    path = require("path");

/**
A collection of useful functions.
@module wodge
*/

/** some cross platform symbols (`tick` and `cross`) */
exports.symbol = symbol();
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
exports.queryFoundInObject = queryFoundInObject;
exports.where = where;
exports.findWhere = findWhere;

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
Clones an object or array
@param {Object|Array} input - the input to clone
@returns {Object|Array}
@example
    > date = new Date()
    Fri May 09 2014 13:54:34 GMT+0200 (CEST)
    > w.clone(date)
    {}  // a Date instance doensn't own any properties
    > date.clive = "hater"
    'hater'
    > w.clone(date)
    { clive: 'hater' }
    > array = [1,2,3]
    [ 1, 2, 3 ]
    > newArray = w.clone(array)
    [ 1, 2, 3 ]
    > array === newArray
    false
*/
function clone(input){
    if (isPlainObject(input)){
        var output = {};
        for (var prop in input){
            output[prop] = input[prop];
        }
        return output;
    } else if (Array.isArray(input)){
        var output = [];
        input.forEach(function(item){
            output.push(item);
        });
        return output;
    }
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
@param {number} [precision=0] - number of decimal places
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

/**
Create a new string filled with the supplied character
@param {string} - the fill character
@param {number} - the length of the output string
@returns {string}
@example
    > w.fill("a", 10)
    'aaaaaaaaaa'
    > w.fill("ab", 10)
    'aaaaaaaaaa'
*/
function fill(fillWith, len){
    var buffer = new Buffer(len);
    buffer.fill(fillWith);
    return buffer.toString();
}

/**
Add padding to the right of a string
@param {string} - the string to pad
@param {number} - the desired final width
@param {string} [padWith=" "] - the padding character
@returns {string}
@example
    > w.padRight("clive", 1)
    'clive'
    > w.padRight("clive", 1, "-")
    'clive'
    > w.padRight("clive", 10, "-")
    'clive-----'
*/
function padRight(input, width, padWith){
    padWith = padWith || " ";
    if (input.length < width){
        return input + fill(padWith, width - input.length);
    } else {
        return input;
    }
}

/**
returns true if a value, or nested object value exists in an array
@param {Array} - the array to search
@param {*} - the value to search for 
@returns {boolean}
@example
    > w.exists([ 1, 2, 3 ], 2)
    true
    > w.exists([ { result: false }, { result: false } ], { result: true })
    false
    > w.exists([ { result: true }, { result: false } ], { result: true })
    true
    > w.exists([ { result: true }, { result: true } ], { result: true })
    true
*/
function exists(array, value){
    if (isPlainObject(value)){
        var query = value,
            found = false,
            index = 0,
            item;

        while(!found && (item = array[index++])){
            found = queryFoundInObject(item, query);
        }
        return found;
    } else {
        return array.indexOf(value) > -1;
    }
}

/**
docs todo
*/
function queryFoundInObject(object, query){
    var found = true;
    for (var prop in query){
        found = query[prop] === object[prop];
        if (!found) break;
    }
    return found;
}

/**
docs todo
*/
function where(arrayOfObjects, query){
    return arrayOfObjects.filter(function(item){
        return queryFoundInObject(item, query);
    });
}

/**
docs todo
*/
function findWhere(arrayOfObjects, query){
    var result = where(arrayOfObjects, query);
    return result.length ? result[0] : null;
}

/**
Returns the input array, minus the specied values
@param {Array} - the input array
@param {*} - a single, or array of values to omit
@returns {Array}
@example
    > w.without([ 1, 2, 3 ], 2)
    [ 1, 3 ]
    > w.without([ 1, 2, 3 ], [ 2, 3 ])
    [ 1 ]
*/
function without(array, toRemove){
    toRemove = arrayify(toRemove);
    return array.filter(function(item){
        return !exists(toRemove, item);
    });
}

/**
Returns the first object in the input array with `property` set to `value`.
@param {Object[]} - input array of objects
@param {string} - property to inspect
@param {*} - desired value
@returns {Object|undefined}
@example
    > w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", true)
    { product: 'egg', stock: true }
    > w.first([{ product: "egg", stock: true }, { product: "chicken", stock: true }], "stock", false)
    undefined
*/
function first(objectArray, prop, val){
    var result = objectArray.filter(function(item){
        return item[prop] ? item[prop] === val : false;
    });
    return result ? result[0] : null;
}

/** 
commonDir returns the directory common to each path in the list
@param {Array} files - An array of file paths to inspect
@returns {string} - A single path ending with the path separator, e.g. "/user/some/folder/"
@example
    > files = fs.readdirSync(".").map(function(file){ return path.resolve(file); })
    [ '/Users/Lloyd/Documents/75lb/wodge/.DS_Store',
      '/Users/Lloyd/Documents/75lb/wodge/.git',
      '/Users/Lloyd/Documents/75lb/wodge/.gitignore',
      '/Users/Lloyd/Documents/75lb/wodge/.jshintrc',
      '/Users/Lloyd/Documents/75lb/wodge/README.md',
      '/Users/Lloyd/Documents/75lb/wodge/lib',
      '/Users/Lloyd/Documents/75lb/wodge/node_modules',
      '/Users/Lloyd/Documents/75lb/wodge/package.json',
      '/Users/Lloyd/Documents/75lb/wodge/test' ]
    > w.commonDir(files)
    '/Users/Lloyd/Documents/75lb/wodge/'
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

/**
merge two arrays into a single array of unique values
@example
    > var array1 = [ 1, 2 ], array2 = [ 2, 3 ];
    undefined
    > w.union(array1, array2)
    [ 1, 2, 3 ]
    > var array1 = [ { id: 1 }, { id: 2 } ], array2 = [ { id: 2 }, { id: 3 } ];
    undefined
    > w.union(array1, array2)
    [ { id: 1 }, { id: 2 }, { id: 3 } ]
    > var array2 = [ { id: 2, blah: true }, { id: 3 } ]
    undefined
    > w.union(array1, array2)
    [ { id: 1 },
      { id: 2 },
      { id: 2, blah: true },
      { id: 3 } ]
    > w.union(array1, array2, "id")
    [ { id: 1 }, { id: 2 }, { id: 3 } ]
*/
function union(array1, array2, idKey){
    var result = clone(array1);
    array2.forEach(function(item){
        if (idKey){
            if (!first(result, idKey, item[idKey])){
                result.push(item);
            }
        } else if (!exists(result, item)){
            result.push(item);
        };
    });
    return result;
}

/**
Returns the initial elements which both input arrays have in common
@param {Array} - first array to compare
@param {Array} - second array to compare
@returns {Array}
@example
    > w.commonSequence([1,2,3], [1,2,4])
    [ 1, 2 ]
*/
function commonSequence(a, b){
    var result = [];
    for (var i = 0; i < Math.min(a.length, b.length); i++){
        if (a[i] === b[i]){
            result.push(a[i]);
        }
    }
    return result;
}

/**
strips special characters, making suitable for storage in a JS/JSON string
@param {string} - the input
@returns {string}
@example
    > w.escapeForJSON("hello\nthere")
    'hello\\nthere'
*/
function escapeForJSON (input) {
    return input
      .replace(/[\\]/g, '\\\\')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\"]/g, '\\"')
      .replace(/[\t]/g, '\\t'); 
}

function symbol(){
    return {
        tick: process.platform === "win32" ? "\u221A" : "✔︎",
        cross: process.platform === "win32" ? "\u00D7": "✖"
    };
}
