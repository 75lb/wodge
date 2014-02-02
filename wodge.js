"use strict";
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

exports.black = function(txt){
    return "\x1b[30m" + txt + "\x1b[0m";
};
exports.red = function(txt){
    return "\x1b[31m" + txt + "\x1b[0m";
};
exports.green = function(txt){
    return "\x1b[32m" + txt + "\x1b[0m";
};
exports.yellow = function(txt){
    return "\x1b[33m" + txt + "\x1b[0m";
};
exports.blue = function(txt){
    return "\x1b[34m" + txt + "\x1b[0m";
};
exports.magenta = function(txt){
    return "\x1b[35m" + txt + "\x1b[0m";
};
exports.cyan = function(txt){
    return "\x1b[36m" + txt + "\x1b[0m";
};
exports.white = function(txt){
    return "\x1b[37m" + txt + "\x1b[0m";
};
exports.bold = function(txt){
    return "\x1b[1m" + txt + "\x1b[0m";
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
