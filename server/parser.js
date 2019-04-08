let choices = /\(([^)]*\|[^)]*)\)/;
let symbols = /\$user((?:\.[_A-Za-z][_A-Za-z0-9]*(?:\(\))?)+)/;

String.prototype.uc = function() {
  return this.toUpperCase();
}

String.prototype.ucf = function() {
  return this[0].toUpperCase() + this.substring(1);
}


class Parser {

  constructor(user) {
    this.user = user;
  }

  parse(s, db) {
    s = this.parseChoices(s, db);
    return this.parseSymbols(s, db);
  }

  parseSymbols(s, db) {

    function extractParts(match) {
      let parts = match.split('.');
      parts.shift();
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].endsWith('()')) {
          parts[i] = parts[i].substring(0, parts[i].length-2);
        }
      }
      return parts;
    }

    let dbug = db || false;
    dbug && console.log("parseSymbols: " + s);
    let ms = symbols.exec(s);
    while (ms) {
      dbug && console.log('match: '+ms);
      let parts = extractParts(ms[1])
      let resolved = this.user[parts[0]];
      dbug && console.log("P0:",parts[0]);
      dbug && console.log("RES:",resolved);
      dbug && console.log("TYPE:",typeof resolved);
      if (typeof resolved === 'function') {
        resolved = resolved.apply(this.user);
      }

      dbug && console.log('resolved[0] = '+resolved);

      if (typeof resolved !== 'string') throw Error('expected str')

      for (var i = 1; i < parts.length; i++) {
        resolved = resolved[parts[i]]();
        dbug && console.log('resolved['+i+'] = '+resolved);
      }

      let pre = s.substring(0, ms.index);
      let pos = s.substring(ms.index + ms[0].length);
      s = pre + resolved + pos;
      ms = symbols.exec(s);
    }

    return s;
  }

  parseChoices(s, db) {
    let dbug = db || false;
    dbug && console.log("parse: " + s);
    let ms = choices.exec(s);
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
      ms = choices.exec(s);
    }
    return s;
  }
}

module.exports = Parser;
