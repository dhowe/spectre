const choices = /\(([^)]*\|[^)]*)\)/;
const symbols = /\$user((?:\.[_A-Za-z][_A-Za-z0-9]*(?:\(\))?)+)/;

export default class Parser {

  constructor(user) {
    this.user = user;
  }

  parse(s) {
    s = this.parseChoices(s);
    return this.parseSymbols(s);
  }

  parseSymbols(s) {
    let extractParts = (match) => {
      let parts = match.split('.');
      parts.shift();
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].endsWith('()')) {
          parts[i] = parts[i].substring(0, parts[i].length - 2);
        }
      }
      return parts;
    }

    let parts, resolved, pre, pos;
    let ms = symbols.exec(s);
    while (ms) {
      parts = extractParts(ms[1])
      resolved = this.user[parts[0]];

      if (typeof resolved === 'function') {
        let tmp = resolved.apply(this.user);
        if (typeof tmp !== 'string') {
          throw Error('Expected ' + parts[0] + '() to return'
          + ' a string, but found a '+(typeof tmp)+':\n' + tmp);
        }
        resolved = tmp;
      }

      if (typeof resolved !== 'string') {
        throw Error(this.user.hasOwnProperty(parts[0]) ?
          'user.' + parts[0] + ' is ' + this.user[parts[0]] :
          'Parser: No User.' + parts[0] + ' property for ' + this.user.name);
      }

      for (var i = 1; i < parts.length; i++) {
        let func = resolved[parts[i]];
        if (typeof func !== 'function') {
          throw Error('Error parsing function \'' + parts[i] + '()\' in\n' + s);
        }
        resolved = resolved[parts[i]]();
      }

      pre = s.substring(0, ms.index);
      pos = s.substring(ms.index + ms[0].length);
      s = pre + resolved + pos;
      ms = symbols.exec(s);
    }

    return s;
  }

  parseChoices(s) {

    let parts, idx, pre, pos;
    let ms = choices.exec(s);
    while (ms) {
      parts = ms[1].split('|');
      idx = Math.floor(Math.random() * parts.length);
      pre = s.substring(0, ms.index);
      pos = s.substring(ms.index + ms[0].length);
      s = pre + parts[idx].trim() + pos;
      s = s.replace(/ +/g, ' ');
      ms = choices.exec(s);
    }

    return s;
  }
}

// //////////////////  TODO: remove  /////////////////////

String.prototype.uc = function() {
  return this.toUpperCase();
}

String.prototype.ucf = function() {
  return this[0].toUpperCase() + this.substring(1);
}
