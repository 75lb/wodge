var test = require("tape"),
    w = require("../");

test("exists: search for object value", function(t){
    var arr = [
        { result: false, number: 1 },
        { result: false, number: 2 }    
    ];
    t.equal(w.exists(arr, { result: true }), false);
    t.equal(w.exists(arr, { result: false }), true);
    t.equal(w.exists(arr, { result: false, number: 3 }), false);
    t.equal(w.exists(arr, { result: false, number: 2 }), true);
    t.end();
});

test("exists: search for scalar", function(t){
    var arr = [ 1, 2, "three" ];
    t.equal(w.exists(arr, 0), false);
    t.equal(w.exists(arr, 1), true);
    t.equal(w.exists(arr, "1"), false);
    t.equal(w.exists(arr, "three"), true);
    t.end();
});
