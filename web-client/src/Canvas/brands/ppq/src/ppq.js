const predictions = [
  { trait: 'openness', abbrev: 'ope', boost: true, correction: true },
  { trait: 'conscientiousness', abbrev: 'con', boost: true, correction: true },
  { trait: 'extraversion', abbrev: 'ext', boost: true, correction: true },
  { trait: 'agreeableness', abbrev: 'agr', boost: true, correction: true },
  { trait: 'neuroticism', abbrev: 'neu', boost: true, correction: true },
  { trait: 'age', abbrev: 'age', boost: false, correction: false },
  { trait: 'relation', abbrev: 'relation', boost: false, correction: false },
  { trait: 'gender', abbrev: 'gender', boost: false, correction: false }
];

const allItems = getAllItems();

/**
 * Performs scoring for a completed brand personality test
 * @param  {Array} responses An array of objects with 'item'
 *         (e.g., 'adidas') and 'rating' (-.8 to .8) properties
 * @returns  {Array} An array containing personality predictions
 */
function predict(responses) {

  if (Array.isArray(responses) && responses.length > 0) {
    const itemRatings = getItemRatings(responses);
    const sumRatings = getSumRatings(itemRatings);
    if (sumRatings > 0) {
      return getPredictions(itemRatings, sumRatings)
        .map(p => ({ trait: p.trait, score: p.score / 100 }));
    }
  }
  throw Error('Unexpected input', responses);
}

function getPredictions(itemRatings, sumRatings) {
  return predictions
    .map(prediction => ({
      trait: prediction.trait,
      score: getScoreForTrait(
        itemRatings,
        sumRatings,
        prediction.abbrev + '_perc',
        prediction.boost,
        prediction.correction)
    }));
}

function getItemRatings(responses) {
  return responses
    .map(response => ({
      item: allItems.find(item => item['object_name'] === response.item),
      rating: response.rating
    }))
    .filter(itemResponse => itemResponse.item !== undefined)
}

function getSumRatings(itemRatings) {
  return itemRatings.reduce((acc, itemRating) => acc + Math.abs(itemRating.rating), 0);
}

function getScoreForTrait(itemRatings, sumRatings, trait, boost = false, correction = false) {
  const weightedScores = itemRatings
    .map(itemRating => getWeightedScoreForTrait(itemRating, trait, boost));
  const weightedSum = weightedScores
    .reduce((acc, weightedScore) => acc + weightedScore.score * weightedScore.weight, 0);
  const score = ((correction) ? getCorrectionForTrait(itemRatings, trait) : 0) + weightedSum / sumRatings;
  return trimToRange(score);
}

function getWeightedScoreForTrait(itemRating, trait, boost = false) {
  let score = Number.parseFloat(itemRating.item[trait]);
  let weight = itemRating.rating;
  if (boost && (itemRating.rating < -.6 || itemRating.rating > .6)) {
    score = getBoostedScore(score);
  } else if (itemRating.rating < 0) {
    score = 100 - itemRating.item[trait];
    weight *= -1;
  }
  return ({ score: score, weight: weight })
}

function getBoostedScore(score) {
  if (score <= 50) {
    const d = 50 - score;
    return score - (.5 * d)
  } else {
    const d = score - 50;
    return score + (.5 * d)
  }
}

function getCorrectionForTrait(itemRatings, trait) {
  return (50 - getMeanForTrait(itemRatings, trait)) / 2;
}

function getMeanForTrait(itemRatings, trait) {
  return getSumForTrait(itemRatings, trait) / itemRatings.length;
}

function getSumForTrait(itemRatings, trait) {
  return itemRatings
    .map(itemRating => Number.parseFloat(itemRating.item[trait]))
    .reduce((acc, v) => acc + v, 0);
}

function trimToRange(score, min = 1, max = 99) {
  return Math.min(max, Math.max(min, score));
}

function getAllItems() {
  return [
    {
      "id": "42",
      "object_id": "40796308305",
      "object_name": "cocacola",
      "parent_category": "Shop",
      "our_category": "Food/Beverages",
      "n_user": "21740",
      "include": "1",
      "age": "21.4452",
      "age_perc": "57.02820997",
      "expected_age": "24",
      "gender_perc": "29.88510156",
      "relation_perc": "42.36554941",
      "ope_perc": "44.56626629",
      "con_perc": "58.6419683",
      "ext_perc": "51.876027",
      "agr_perc": "58.3424705",
      "neu_perc": "62.07000034",
      "type": "shop"
    },
    {
      "id": "43",
      "object_id": "11784025953",
      "object_name": "disney",
      "parent_category": "Shop",
      "our_category": "Company",
      "n_user": "19793",
      "include": "1",
      "age": "21.3694",
      "age_perc": "56.38456696",
      "expected_age": "24",
      "gender_perc": "64.87734851",
      "relation_perc": "48.70704123",
      "ope_perc": "53.02239907",
      "con_perc": "67.40775028",
      "ext_perc": "57.71789376",
      "agr_perc": "76.59427",
      "neu_perc": "58.68516423",
      "type": "shop"
    },
    {
      "id": "44",
      "object_id": "23402039579",
      "object_name": "converse",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "16075",
      "include": "1",
      "age": "19.2905",
      "age_perc": "32.06373475",
      "expected_age": "21",
      "gender_perc": "69.90531974",
      "relation_perc": "42.33129885",
      "ope_perc": "56.74015712",
      "con_perc": "49.9099795",
      "ext_perc": "58.78653832",
      "agr_perc": "64.21392902",
      "neu_perc": "49.45238993",
      "type": "shop"
    },
    {
      "id": "45",
      "object_id": "14104316802",
      "object_name": "playstation",
      "parent_category": "Shop",
      "our_category": "Games/Toys",
      "n_user": "12691",
      "include": "1",
      "age": "20.7841",
      "age_perc": "51.20034775",
      "expected_age": "23",
      "gender_perc": "6.893906602",
      "relation_perc": "25.24951535",
      "ope_perc": "60.09661232",
      "con_perc": "53.05416565",
      "ext_perc": "42.2559516",
      "agr_perc": "55.42037598",
      "neu_perc": "77.2424575",
      "type": "shop"
    },
    {
      "id": "46",
      "object_id": "16547831022",
      "object_name": "xbox",
      "parent_category": "Shop",
      "our_category": "Games/Toys",
      "n_user": "10864",
      "include": "1",
      "age": "20.5653",
      "age_perc": "49.09674131",
      "expected_age": "23",
      "gender_perc": "5.356448175",
      "relation_perc": "34.60676928",
      "ope_perc": "54.31122565",
      "con_perc": "52.9275122",
      "ext_perc": "47.67479545",
      "agr_perc": "57.19005119",
      "neu_perc": "79.66211659",
      "type": "shop"
    },
    {
      "id": "47",
      "object_id": "14226545351",
      "object_name": "red bull",
      "parent_category": "Shop",
      "our_category": "Food/Beverages",
      "n_user": "9584",
      "include": "1",
      "age": "20.7636",
      "age_perc": "50.99919057",
      "expected_age": "23",
      "gender_perc": "14.77351802",
      "relation_perc": "36.36279567",
      "ope_perc": "34.49690069",
      "con_perc": "56.95855649",
      "ext_perc": "75.72792349",
      "agr_perc": "47.10829958",
      "neu_perc": "71.85238536",
      "type": "shop"
    },
    {
      "id": "48",
      "object_id": "40444963499",
      "object_name": "hello kitty",
      "parent_category": "Shop",
      "our_category": "Retail and consumer merchandise",
      "n_user": "6537",
      "include": "1",
      "age": "20.6857",
      "age_perc": "50.26770993",
      "expected_age": "23",
      "gender_perc": "98.15515947",
      "relation_perc": "68.42200804",
      "ope_perc": "63.5294151",
      "con_perc": "53.48382187",
      "ext_perc": "61.960063",
      "agr_perc": "46.69698502",
      "neu_perc": "31.5973294",
      "type": "shop"
    },
    {
      "id": "49",
      "object_id": "56381779049",
      "object_name": "pepsi",
      "parent_category": "Shop",
      "our_category": "Food/Beverages",
      "n_user": "6504",
      "include": "1",
      "age": "21.6535",
      "age_perc": "58.79425608",
      "expected_age": "24",
      "gender_perc": "40.43773184",
      "relation_perc": "39.44637389",
      "ope_perc": "41.14878979",
      "con_perc": "60.76156778",
      "ext_perc": "53.82028349",
      "agr_perc": "58.17487686",
      "neu_perc": "59.11416355",
      "type": "shop"
    },
    {
      "id": "50",
      "object_id": "21415640912",
      "object_name": "h&m",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "5173",
      "include": "1",
      "age": "22.456",
      "age_perc": "64.98186288",
      "expected_age": "25",
      "gender_perc": "81.86253829",
      "relation_perc": "65.07778303",
      "ope_perc": "61.19329277",
      "con_perc": "74.64431962",
      "ext_perc": "80.23533492",
      "agr_perc": "42.2000784",
      "neu_perc": "61.9290965",
      "type": "shop"
    },
    {
      "id": "51",
      "object_id": "10461186460",
      "object_name": "ben & jerrys",
      "parent_category": "Shop",
      "our_category": "Food/Beverages",
      "n_user": "5133",
      "include": "1",
      "age": "21.0238",
      "age_perc": "53.397188",
      "expected_age": "23",
      "gender_perc": "56.01778542",
      "relation_perc": "72.84683833",
      "ope_perc": "41.39911902",
      "con_perc": "54.06086181",
      "ext_perc": "54.55289776",
      "agr_perc": "62.90698269",
      "neu_perc": "40.45712293",
      "type": "shop"
    },
    {
      "id": "52",
      "object_id": "1.41463E+11",
      "object_name": "old spice",
      "parent_category": "Shop",
      "our_category": "Health/Beauty",
      "n_user": "4121",
      "include": "1",
      "age": "20.5202",
      "age_perc": "48.63926612",
      "expected_age": "22",
      "gender_perc": "5.416445216",
      "relation_perc": "29.8781365",
      "ope_perc": "68.17129104",
      "con_perc": "51.43578443",
      "ext_perc": "71.12726508",
      "agr_perc": "69.9277359",
      "neu_perc": "84.28193344",
      "type": "shop"
    },
    {
      "id": "53",
      "object_id": "1.22792E+11",
      "object_name": "burberry",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "3842",
      "include": "1",
      "age": "22.2708",
      "age_perc": "63.61543304",
      "expected_age": "25",
      "gender_perc": "87.23542401",
      "relation_perc": "33.77824815",
      "ope_perc": "36.56311021",
      "con_perc": "73.00520813",
      "ext_perc": "63.43979031",
      "agr_perc": "33.36448492",
      "neu_perc": "62.69163494",
      "type": "shop"
    },
    {
      "id": "54",
      "object_id": "1.82162E+14",
      "object_name": "adidas",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "787",
      "include": "1",
      "age": "20.5877",
      "age_perc": "49.30779147",
      "expected_age": "23",
      "gender_perc": "17.37284189",
      "relation_perc": "6.596658515",
      "ope_perc": "18.21386404",
      "con_perc": "64.02048037",
      "ext_perc": "66.70229763",
      "agr_perc": "58.64925208",
      "neu_perc": "85.29998514",
      "type": "shop"
    },
    {
      "id": "55",
      "object_id": "6883542487",
      "object_name": "marvel",
      "parent_category": "Shop",
      "our_category": "Product/Service",
      "n_user": "3534",
      "include": "1",
      "age": "23.2351",
      "age_perc": "70.21134994",
      "expected_age": "27",
      "gender_perc": "5.920803906",
      "relation_perc": "29.81854051",
      "ope_perc": "82.10373053",
      "con_perc": "57.77555645",
      "ext_perc": "37.98933345",
      "agr_perc": "50.75218298",
      "neu_perc": "75.81970024",
      "type": "shop"
    },
    {
      "id": "56",
      "object_id": "15087023444",
      "object_name": "nike",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "3126",
      "include": "1",
      "age": "20.2203",
      "age_perc": "45.44413466",
      "expected_age": "22",
      "gender_perc": "28.03998707",
      "relation_perc": "17.12733674",
      "ope_perc": "18.63987784",
      "con_perc": "71.02560899",
      "ext_perc": "81.10924112",
      "agr_perc": "58.06835548",
      "neu_perc": "86.47980474",
      "type": "shop"
    },
    {
      "id": "57",
      "object_id": "33331950906",
      "object_name": "zara",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "3094",
      "include": "1",
      "age": "22.7238",
      "age_perc": "66.82015769",
      "expected_age": "26",
      "gender_perc": "69.04727986",
      "relation_perc": "43.58349945",
      "ope_perc": "35.71023114",
      "con_perc": "68.80690176",
      "ext_perc": "68.6334768",
      "agr_perc": "29.00733435",
      "neu_perc": "64.30045386",
      "type": "shop"
    },
    {
      "id": "58",
      "object_id": "25297200265",
      "object_name": "vans",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "2898",
      "include": "1",
      "age": "19.5515",
      "age_perc": "36.5095782",
      "expected_age": "21",
      "gender_perc": "45.31721723",
      "relation_perc": "27.30249413",
      "ope_perc": "49.81920667",
      "con_perc": "46.03711003",
      "ext_perc": "71.33707079",
      "agr_perc": "57.19005119",
      "neu_perc": "60.57093208",
      "type": "shop"
    },
    {
      "id": "59",
      "object_id": "22092443056",
      "object_name": "starbucks",
      "parent_category": "Connect",
      "our_category": "Restaurant/Caf",
      "n_user": "25290",
      "include": "1",
      "age": "22.0969",
      "age_perc": "62.30356447",
      "expected_age": "25",
      "gender_perc": "57.05937789",
      "relation_perc": "56.66721468",
      "ope_perc": "50.77255801",
      "con_perc": "73.26021889",
      "ext_perc": "70.05378759",
      "agr_perc": "67.36213293",
      "neu_perc": "62.44355272",
      "type": "shop"
    },
    {
      "id": "60",
      "object_id": "59672929326",
      "object_name": "topshop",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "1686",
      "include": "1",
      "age": "19.8944",
      "age_perc": "41.45216896",
      "expected_age": "22",
      "gender_perc": "96.09060375",
      "relation_perc": "82.20785982",
      "ope_perc": "23.49490259",
      "con_perc": "47.22469913",
      "ext_perc": "67.35701655",
      "agr_perc": "46.74215008",
      "neu_perc": "20.46792651",
      "type": "shop"
    },
    {
      "id": "61",
      "object_id": "25440047420",
      "object_name": "lacoste",
      "parent_category": "Shop",
      "our_category": "Health/Beauty",
      "n_user": "1733",
      "include": "1",
      "age": "22.2988",
      "age_perc": "63.81928831",
      "expected_age": "25",
      "gender_perc": "22.96653864",
      "relation_perc": "18.27267559",
      "ope_perc": "20.9649312",
      "con_perc": "72.86463983",
      "ext_perc": "60.27593147",
      "agr_perc": "40.32643832",
      "neu_perc": "79.32257548",
      "type": "shop"
    },
    {
      "id": "62",
      "object_id": "14856729724",
      "object_name": "gap",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "1376",
      "include": "1",
      "age": "26.2489",
      "age_perc": "84.56935576",
      "expected_age": "32",
      "gender_perc": "76.7378595",
      "relation_perc": "68.71382284",
      "ope_perc": "41.09770219",
      "con_perc": "83.73610646",
      "ext_perc": "72.42987997",
      "agr_perc": "57.47069952",
      "neu_perc": "63.07490483",
      "type": "shop"
    },
    {
      "id": "63",
      "object_id": "56232316996",
      "object_name": "sony",
      "parent_category": "Shop",
      "our_category": "Product/Service",
      "n_user": "1230",
      "include": "1",
      "age": "22.0699",
      "age_perc": "62.08412027",
      "expected_age": "25",
      "gender_perc": "15.28171213",
      "relation_perc": "20.48868704",
      "ope_perc": "60.3347373",
      "con_perc": "64.69407228",
      "ext_perc": "40.87572565",
      "agr_perc": "58.47484107",
      "neu_perc": "65.39653142",
      "type": "shop"
    },
    {
      "id": "64",
      "object_id": "27639519808",
      "object_name": "new look",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "1149",
      "include": "1",
      "age": "20.5095",
      "age_perc": "48.54093594",
      "expected_age": "22",
      "gender_perc": "98.06804048",
      "relation_perc": "81.66430338",
      "ope_perc": "7.155953408",
      "con_perc": "47.96019787",
      "ext_perc": "54.91593557",
      "agr_perc": "70.96340778",
      "neu_perc": "13.68110574",
      "type": "shop"
    },
    {
      "id": "65",
      "object_id": "36143771015",
      "object_name": "calvin klein",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "937",
      "include": "1",
      "age": "22.4994",
      "age_perc": "65.24567557",
      "expected_age": "25",
      "gender_perc": "27.39453945",
      "relation_perc": "16.58172527",
      "ope_perc": "34.56643658",
      "con_perc": "77.26116169",
      "ext_perc": "69.31690898",
      "agr_perc": "29.51806887",
      "neu_perc": "78.68350653",
      "type": "shop"
    },
    {
      "id": "66",
      "object_id": "81958664405",
      "object_name": "rayban",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "894",
      "include": "1",
      "age": "21.8346",
      "age_perc": "60.30848098",
      "expected_age": "24",
      "gender_perc": "22.83312056",
      "relation_perc": "18.24767267",
      "ope_perc": "42.46798511",
      "con_perc": "64.23658638",
      "ext_perc": "66.10955384",
      "agr_perc": "35.82583896",
      "neu_perc": "72.87729648",
      "type": "shop"
    },
    {
      "id": "67",
      "object_id": "94971738769",
      "object_name": "next",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "688",
      "include": "1",
      "age": "25.8105",
      "age_perc": "83.05363192",
      "expected_age": "31",
      "gender_perc": "91.15988801",
      "relation_perc": "93.01631012",
      "ope_perc": "5.993142909",
      "con_perc": "70.13165144",
      "ext_perc": "41.1801998",
      "agr_perc": "50.01363474",
      "neu_perc": "24.6858959",
      "type": "shop"
    },
    {
      "id": "68",
      "object_id": "1.06922E+11",
      "object_name": "swarovski",
      "parent_category": "Shop",
      "our_category": "Jewellery/Watches",
      "n_user": "574",
      "include": "1",
      "age": "23.7176",
      "age_perc": "73.16875019",
      "expected_age": "28",
      "gender_perc": "89.26929631",
      "relation_perc": "80.05041683",
      "ope_perc": "46.83370419",
      "con_perc": "74.35835544",
      "ext_perc": "61.65359882",
      "agr_perc": "21.81387448",
      "neu_perc": "57.58594277",
      "type": "shop"
    },
    {
      "id": "69",
      "object_id": "1.06325E+11",
      "object_name": "tommy hilfiger",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "543",
      "include": "1",
      "age": "23.0352",
      "age_perc": "68.92046647",
      "expected_age": "26",
      "gender_perc": "26.87319529",
      "relation_perc": "19.72695451",
      "ope_perc": "20.64364697",
      "con_perc": "78.18976436",
      "ext_perc": "77.37310734",
      "agr_perc": "34.06440141",
      "neu_perc": "81.51958935",
      "type": "shop"
    },
    {
      "id": "70",
      "object_id": "10936503735",
      "object_name": "asos",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "694",
      "include": "1",
      "age": "23.5504",
      "age_perc": "72.19204365",
      "expected_age": "27",
      "gender_perc": "85.78097518",
      "relation_perc": "79.37568073",
      "ope_perc": "37.23803415",
      "con_perc": "65.31370867",
      "ext_perc": "66.58716035",
      "agr_perc": "22.55299084",
      "neu_perc": "22.61292314",
      "type": "shop"
    },
    {
      "id": "71",
      "object_id": "67341283611",
      "object_name": "marks and spencer",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "326",
      "include": "1",
      "age": "28.4098",
      "age_perc": "90.42989477",
      "expected_age": "37",
      "gender_perc": "72.16356454",
      "relation_perc": "88.09587418",
      "ope_perc": "20.10382135",
      "con_perc": "77.44574632",
      "ext_perc": "28.84459025",
      "agr_perc": "49.64208816",
      "neu_perc": "48.74587006",
      "type": "shop"
    },
    {
      "id": "72",
      "object_id": "2.03976E+11",
      "object_name": "vivienne westwood",
      "parent_category": "Shop",
      "our_category": "Clothing",
      "n_user": "330",
      "include": "1",
      "age": "25.0217",
      "age_perc": "79.79644452",
      "expected_age": "30",
      "gender_perc": "83.14083141",
      "relation_perc": "55.62085996",
      "ope_perc": "88.56290586",
      "con_perc": "31.35950838",
      "ext_perc": "42.61074501",
      "agr_perc": "8.725947472",
      "neu_perc": "14.49308914",
      "type": "shop"
    },
    {
      "id": "73",
      "object_id": "10109514234",
      "object_name": "chanel",
      "parent_category": "Shop",
      "our_category": "Company",
      "n_user": "2557",
      "include": "1",
      "age": "23.6788",
      "age_perc": "72.92862068",
      "expected_age": "27",
      "gender_perc": "91.95875272",
      "relation_perc": "60.56972387",
      "ope_perc": "52.91738568",
      "con_perc": "79.11950293",
      "ext_perc": "81.59537631",
      "agr_perc": "21.14349992",
      "neu_perc": "58.4050714",
      "type": "shop"
    },
    {
      "id": "74",
      "object_id": "10909609473",
      "object_name": "nintendo64",
      "parent_category": "Shop",
      "our_category": "Games/Toys",
      "n_user": "3699",
      "include": "1",
      "age": "20.4837",
      "age_perc": "48.26333303",
      "expected_age": "22",
      "gender_perc": "15.87182002",
      "relation_perc": "42.38815479",
      "ope_perc": "79.95833523",
      "con_perc": "52.00373713",
      "ext_perc": "48.97428316",
      "agr_perc": "71.07873492",
      "neu_perc": "68.70934367",
      "type": "shop"
    },
    {
      "id": "75",
      "object_id": "6665038402",
      "object_name": "lego",
      "parent_category": "Shop",
      "our_category": "Games/Toys",
      "n_user": "1433",
      "include": "1",
      "age": "22.8824",
      "age_perc": "67.90298888",
      "expected_age": "26",
      "gender_perc": "18.41936562",
      "relation_perc": "49.70065008",
      "ope_perc": "72.30030426",
      "con_perc": "48.90157948",
      "ext_perc": "31.59622918",
      "agr_perc": "48.16470762",
      "neu_perc": "63.31612763",
      "type": "shop"
    }
];
}

if (typeof exports !== 'undefined') exports.predict = predict;
if (typeof window !== 'undefined') window.predict = predict;
