const Version = require("./Version");

function compare(a,b){
  var va= new Version(a), vb = new Version(b);
  return va.compare(vb);
}

module.exports = compare;
