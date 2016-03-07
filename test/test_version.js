const assert = require("assert");
const Version = require("../lib/Version");

function parse(){
  const list = {
    "1.0.0":{epoch:0,upstream:"1.0.0",debian:""}
   ,"1234:1.0.0":{epoch:1234,upstream:"1.0.0",debian:""}
   ,"1234:1.0.0-nmu1":{epoch:1234,upstream:"1.0.0",debian:"nmu1"}
   ,"1:1-2+3.4:5-nmu1":{epoch:1,upstream:"1-2+3.4:5",debian:"nmu1"}
   ,"2:1.2498-1":{epoch:2,upstream:"1.2498",debian:"1"}
  }
  console.log("Parse versions")
  Object.keys(list).forEach(function(v){
    var version = new Version(v);
    assert(version.epoch == list[v].epoch,`version.epoch should be ${list[v].epoch}. ${version.epoch} found instead`);
    assert(version.upstream == list[v].upstream,`version.upstream should be ${list[v].upstream}. ${version.upstream} found instead`);
    assert(version.debian == list[v].debian,`version.debian should be ${list[v].debian}. ${version.debian} found instead`);
    console.log("\t%s",v);
  });
}



function compareStrings(){
  const list = [ // first > second
    ["ad.1-0","ac.1"]
  , ["1.0.0","0.1.1"]
  , ["1.11.0","0.1."]
  , ["b","a"]
  , ["a","a~b"]
  , ["a","a~nmu1"]
  , ["1.0.0","1.0.0~rc1"]
  , ["1.2498","1.2492"]
  ]
  console.log("compare version strings")
  list.forEach(function(e){
    assert(Version.prototype.compareStrings(e[0],e[1]) == 1,`Expect ${e[0]} to be greater than ${e[1]}`);
    console.log("\t%s > %s",e[0],e[1])
  })

}
function test(){
  parse();
  compareStrings();
}

module.exports = test;
