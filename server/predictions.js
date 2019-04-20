
let oceanDist = function (a, b) {

  if (!a || !b) throw Error('2 args required');

  if (typeof a.traits.openness === 'undefined' ||
    typeof b.traits.openness === 'undefined')
  {
    throw Error('traits required');
  }


  let diff = 0;
  let total = 0;
  let ta = a.traits;
  let tb = b.traits;
  let traitNames = Object.keys(a.traits);
  for (let i = 0; i < traitNames.length; i++) {
    diff = ta[traitNames[i]] - tb[traitNames[i]];
    total += diff * diff;
  }

  return Math.sqrt(total);
}

let oceanSort = function (user, candidates) {

  if (typeof user === 'undefined') throw Error('null user');
  if (typeof candidates === 'undefined') throw Error('null candidates');
  if (candidates.length < 1) throw Error('no candidates');
  candidates = candidates.filter(function(o) {
    return !(o.login === user.login && o.loginType === user.loginType);
  });
  let distances = function (b, i) {
    return { index: i, value: oceanDist(user, b) };
  };
  let compare = function (a, b) { return a.value - b.value; };
  let reorder = function (e) { return candidates[e.index]; };
  return candidates.map(distances).sort(compare).map(reorder);
}

module.exports.oceanSort = oceanSort;
module.exports.oceanDist= oceanDist;
