import User from './shared/user';

const oceanDist = function (a, b) {

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
  let traitNames = User.oceanTraits();
  for (let i = 0; i < traitNames.length; i++) {
    diff = ta[traitNames[i]] - tb[traitNames[i]];
    total += diff * diff;
  }

  return Math.sqrt(total);
}

const oceanSort = function (user, candidates, limit) {

  if (typeof user === 'undefined') throw Error('null user');
  if (typeof candidates === 'undefined') throw Error('null candidates');
  if (typeof limit === 'undefined') limit = candidates.length;

  if (!Number.isInteger(limit) || limit < 1) throw Error('bad limit: '+limit);

  if (candidates.length < 1) throw Error('no candidates');
  candidates = candidates.filter(function(o) {
    return !(o.login === user.login && o.loginType === user.loginType);
  });
  let distances = function (b, i) {
    return { index: i, value: module.exports.oceanDist(user, b) };
  };
  let compare = function (a, b) { return a.value - b.value; };
  let reorder = function (e) { return candidates[e.index]; };
  return candidates.map(distances).sort(compare).map(reorder).slice(0, limit);
}

export { oceanSort, oceanDist };
