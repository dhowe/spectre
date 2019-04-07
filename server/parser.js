let groups = /\(([^)]+\|[^)]+)\)/;

class Parser {

  parse(s) {
    parseSymbols(s);
    parseChoices(s);
  }

  parseChoices(s, db) {
    let dbug = db || false;
    dbug && console.log("parse: " + s);
    let ms = groups.exec(s);
    while (ms) {
      let index = ms.index;
      let len = ms[0].length;
      //dbug && console.log(index,len,ms);
      let parts = ms[1].split('|');
      let idx = Math.floor(Math.random() * parts.length);
      let pre = s.substring(0,index);
      let pos = s.substring(index+len);
      let part = parts[idx].trim();
      dbug && console.log("  parts: ",parts);
      dbug && console.log("  pre: '"+pre+"'");
      dbug && console.log("  pos: '"+pos+"'");
      dbug && console.log("  rep: '"+part+"'");
      s = pre + part + pos;
      s = s.replace(/ +/g,' ');
      dbug && console.log("  res:  '"+s+"'");//groups.exec(s));
      ms = groups.exec(s);
    }
    return s;
  }

  parseSymbols(s) {
    console.log("parse: " + s);
    let ms = groups.exec(s);
    for (let i = 1; ms && i < ms.length; i++) {
      console.log(i + ') ' + ms[i]);
    }
  }
}

module.exports = Parser;
