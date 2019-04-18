const ppq = require('./ppq.js');

const responses = [
    { "item": "zara", "rating": .4 },
    { "item": "cocacola", "rating": .8 },
    { "item": "next", "rating": -.2 },
    { "item": "rayban", "rating": 0 },
    { "item": "sony", "rating": .3 },
    { "item": "gap", "rating": -.6 },
];

const predictions = ppq.predict(responses);

console.log(predictions);
