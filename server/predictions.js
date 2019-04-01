
let oceanDist = function (a, b) {

  if (!a || !b) throw Error('2 args required');

  if (typeof a.traits.openness === 'undefined' ||
    typeof b.traits.openness === 'undefined')
  {
    throw Error('traits required');
  }

  let ta = a.traits,
    tb = b.traits;
  let traits = a.traitNames(),
    diff = 0,
    total = 0;

  for (let i = 0; i < traits.length; i++) {
    diff = ta[traits[i]] - tb[traits[i]];
    total += diff * diff;
  }

  return Math.sqrt(total);
}

let oceanSort = function (user, candidates) {

  if (typeof user === 'undefined') throw Error('null user');
  if (typeof candidates === 'undefined') throw Error('null candidates');
  if (candidates.length < 1) throw Error('no candidates');
  candidates = candidates.filter(function(o) {
    return o._id !== user._id;
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
