
function ndistance(oceanA, oceanB) {
    let total = 0, diff;
    for (let i = 0; i < a.length; i++) {
        diff = b[i] - a[i];
        total += diff * diff;
    }
    return Math.sqrt(total);
}

module.exports = {
  dist: function (req, res) {
    if (!(req.body.oceanA &&req.body.oceanB)) {
      res.send('An error occurred: OceanA and OceanB are required parameters');
    }

    if (req.body.oceanA.length != 5 || req.body.oceanB.length != 5) {
      res.send('An error occurred: OceanA and OceanB must be arrays of length 5');
    }
    return ndistance(req.body.oceanA, req.body.oceanB);
  }
};
