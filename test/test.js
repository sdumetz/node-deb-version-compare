const assert = require("assert");
const compare = require("../lib/index.js");
const test_version = require("./test_version.js");

test_version();

const list = [ //item 1 is greater than item 2
  ["1.0.1","1.0.0"]
, ["2.0.1","1.0.1"]
, ["2.0.0","2.0.0~rc1"]
, ["2.0.0~rc2","2.0.0~rc1"]
, ["2.0.0~rc2+u1","2.0.0~rc2"]
, ["1.0.3~rc2+b2","1.0.3~rc2+b1"]
, ["2.0.0","2.0.0~b1"]
, ["2.21-9","2.19-18+deb8u3"]
, ["2.21-9","2.19-18+deb8u3"]
, ["2:1.2498-1","2:1.2492-4"]
]
console.log("Compare real world version numbers")
list.forEach(function(el){
  assert(compare(el[0],el[1]) == 1,`Expected ${el[0]} to be greater than ${el[1]}. Got ${compare(el[0],el[1])}`);
  assert(compare(el[1],el[0]) == -1,`Expected ${el[0]} to be smaller than ${el[1]}. Got ${compare(el[1],el[0])}`);
  console.log("\t%s > %s",el[0],el[1]);
});
