module.exports.oceanSort = function (user, allUsers) {

  var compare = function (a, b) { return a.value - b.value; };
  var reorder = function (e) { return allUsers[e.index]; };
  var distances = function (b, i) {
    return { index: i, value: oceanDist(user, b) };
  };
  return allUsers.map(distances).sort(compare).map(reorder);
}

module.exports.oceanDist = function (a, b) {

  if (!a || !b) throw Error('2 args required');

  if (!a.traits.openness || !b.traits.openness) {
    throw Error('traits required');
  }

  let ta = a.traits, tb = b.traits;
  let traits = a.traitNames(), diff = 0, total = 0;

  for (let i = 0; i < traits.length; i++) {
    diff = ta[traits[i]] - tb[traits[i]];
    //console.log(traits[i]+": "+diff);
    total += diff * diff;
  }

  //console.log(Math.sqrt(total));

  return Math.sqrt(total);
}
