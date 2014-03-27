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
