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
}

exports.red = function(txt){ 
    return "\x1b[31m" + txt + "\x1b[0m"; 
};
exports.green = function(txt){ 
    return "\x1b[32m" + txt + "\x1b[0m"; 
};

exports.pluck = function(object, fn){
    var output = [];
    for (var prop in object){
        if (fn(object[prop])) output.push(prop);
    }
    return output;
}

exports.isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

exports.arrayify = function(arr){
    if (arr === null || arr === undefined){
        return [];
    } else {
        return Array.isArray(arr) ? arr : [ arr ];
    }
};

exports.every = function(obj, callback){
    var every = true;
    for (var prop in obj){
        every = every && callback(obj[prop], prop);
    }
    return every;
};
