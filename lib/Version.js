'use strict';
class Version{
  constructor(v){
    var version = /^([0-9]*(?=:))?:(.*)/.exec(v);
    this.epoch = (version)?version[1]:0;
    version = (version && version[2])?version[2]:v;
    version = version.split("-");
    this.debian = (version.length>1)?version.pop():"";
    this.upstream = version.join("-");
  }
  compare(b){
    if((this.epoch>0 || b.epoch>0) && Math.sign(this.epoch-b.epoch)!=0){
      return Math.sign(this.epoch-b.epoch);
    }
    if(this.compareStrings(this.upstream,b.upstream) !=0){
      return this.compareStrings(this.upstream,b.upstream);
    }else{
      return this.compareStrings(this.debian,b.debian);
    }
  }
  charCode(c){ //the lower the charcode the lower the version.
    if(c == "~")
      return 0; //tilde sort before anything
    else if(/[a-zA-Z]/.test(c))
      return c.charCodeAt(0)-"A".charCodeAt(0)+1;
    else if(/[.:+-:])/.test(c))
      return c.charCodeAt(0)+"z".charCodeAt(0)+1 //charcodes are 46..58
  }
  compareChunk(a,b){
    var ca = a.split(""),cb=b.split("");
    var diff = ca.findIndex((c,index)=>{
      if(cb[index] && c == cb[index]) return false;
      return true;
    });
    if(diff === -1){
      if(cb.length >ca.length){
        if(cb[ca.length] == "~"){
          return 1;
        }else{
          return -1;
        }
      }
      return 0; //no diff found and same length
    }else{
      return (this.charCode(ca[diff])>this.charCode(cb[diff]))?1:-1;
    }
  }
  compareStrings(a,b){
    if(a==b) return 0;
    var parseA = /([^0-9]+|[0-9]+)/g;
    var parseB = /([^0-9]+|[0-9]+)/g;
    var ra,rb;
    while((ra=parseA.exec(a))!==null && (rb = parseB.exec(b))!== null ){
      if((isNaN(ra[1]) || isNaN(rb[1])) && ra[1] != rb[1] ){ //a or b is not a number and they're not equal. Note : "" IS a number so both null is impossible
        return this.compareChunk(ra[1],rb[1]);
      }else{ //both are numbers
        if(ra[1]!=rb[1]){
          return (ra[1]>rb[1])?1:-1;
        }
      }
    }
    return 1
  }
}
module.exports = Version;
