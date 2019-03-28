function ndistance(a, b) {
  let total = 0,
    diff;
  for (let i = 0; i < a.length; i++) {
    diff = b[i] - a[i];
    total += diff * diff;
  }
  return Math.sqrt(total);
}

module.exports = {
  distance: function (req, res) {
    if (!(req.body.oceanA && req.body.oceanB)) {
      res.send('An error occurred: oceanA and oceanB are required parameters,' +
        ' {a:' + (typeof oceanA) + ',b:' + (typeof oceanB) + '}');
      return;
    }

    let a = req.body.oceanA;
    let b = req.body.oceanB;

    if (a.length != 5 || b.length != 5) {
      res.send('An error occurred: oceanA and oceanB must be arrays of length 5', oceanA, oceanB);
      return;
    }

    res.send(ndistance(a, b));
  }
};
