var test = require("tape"),
    w = require("../");

test("commonDir: simple", function(t){
    var input = [
        "/Users/Lloyd/Documents/Kunai/renamer/one",
        "/Users/Lloyd/Documents/Kunai/renamer/folder/folder/five",
        "/Users/Lloyd/Documents/Kunai/renamer/folder/four",
        "/Users/Lloyd/Documents/Kunai/another",
        "/Users/Lloyd/Documents/Kunai/renamer/two",
        "/Users/Lloyd/Documents/Kunai/renamer/folder/three",
        "/Users/Lloyd/Documents/Kunai/renamer"
    ];
    t.equal(w.commonDir(input), "/Users/Lloyd/Documents/Kunai");
    t.end();
});

test("commonDir: another", function(t){
    var input = [
        "/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects/Randomness.ev3", 
        "/Users/Lloyd/Desktop/Screen Shot 2014-03-27 at 10.00.12.png"
    ];
    t.equal(w.commonDir(input), "/Users/Lloyd");
    t.end();
});

test("commonDir: just one", function(t){
    var input = [
        "/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects/Randomness.ev3"
    ];
    t.equal(w.commonDir(input), "/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects");
    t.end();
});

test("commonDir: all same folder", function(t){
    var input = [
        "/Users/Lloyd/Documents/Kunai/renamer/one",
        "/Users/Lloyd/Documents/Kunai/renamer/two",
        "/Users/Lloyd/Documents/Kunai/renamer/three"
    ];
    t.equal(w.commonDir(input), "/Users/Lloyd/Documents/Kunai/renamer");
    t.end();
});
