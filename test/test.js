const assert = require("assert");
const compare = require("../lib/index.js");
const test_version = require("./test_version.js");

test_version();

const list = [ //item 1 is greater than item 2
  ["1.0.1","1.0.0"]
, ["2.0.1","1.0.1"]
, ["2.0.0","2.0.0~rc1"]
, ["2.0.0","2.0.0~b1"]
, ["2.21-9","2.19-18+deb8u3"]
, ["2.21-9","2.19-18+deb8u3"]
, ["2:1.2498-1","2:1.2492-4"]
]
list.forEach(function(el){
  assert(compare(el[0],el[1]) == 1,`Expected ${el[0]} to be greater than ${el[1]}. Got ${compare(el[0],el[1])}`)
});
