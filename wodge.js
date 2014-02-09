"use strict";
var util = require("util"),
    l = console.log;

exports.extend = function(obj, srcObj){
    for (var prop in srcObj){
        obj[prop] = srcObj[prop];
    }
    return obj;
};

exports.escapeRegExp = function(string){
    return string
        ? string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        : "";
};

var ansi = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    bold: 1,
    underline: 4
};

var ansiFormat = "\x1b[%sm%s\x1b[0m";

exports.black = function(txt){
    return util.format(ansiFormat, ansi.black, txt);
};
exports.red = function(txt){
    return util.format(ansiFormat, ansi.red, txt);
};
exports.green = function(txt){
    return util.format(ansiFormat, ansi.green, txt);
};
exports.yellow = function(txt){
    return util.format(ansiFormat, ansi.yellow, txt);
};
exports.blue = function(txt){
    return util.format(ansiFormat, ansi.blue, txt);
};
exports.magenta = function(txt){
    return util.format(ansiFormat, ansi.magenta, txt);
};
exports.cyan = function(txt){
    return util.format(ansiFormat, ansi.cyan, txt);
};
exports.white = function(txt){
    return util.format(ansiFormat, ansi.white, txt);
};
exports.bold = function(txt){
    return util.format(ansiFormat, ansi.bold, txt);
};
exports.underline = function(txt){
    return util.format(ansiFormat, ansi.underline, txt);
};

/**
Add multiple ansi formats
@method ansi
@example
    ansi("hello", "bold", "underline");
    ansi("success", "green", "bold");
*/
exports.ansi = function(){
    var args = exports.array(arguments),
        txt = args.shift(),
        codes = args.map(function(arg){ return ansi[arg]; });
    return util.format(ansiFormat, codes.join(";"), txt);
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
