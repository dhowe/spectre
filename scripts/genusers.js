let script = 'db.users.insertMany([\n';
let names = ['Remy', 'Bailey', 'Devin', 'Tyler', 'Fran', 'Pat', 'Sam', 'Reed', 'Terry'];
names.forEach((nm, i) => {
  let id = '';
  for (let j = 0; j < 24; j++) id += (i + 1);
  script += '{\n  "_id": ObjectId("' + id + '"),\n' +
    '  "name": "' + nm + '",\n' +
    '  "login": "' + nm + '@aol.com",\n' +
    '  "loginType": "email",\n' +
    //'  "profileIcon": "/profiles/'+id+'.jpg",\n' +
    '  "gender": "' + (Math.random() < .5 ? 'male' : 'female') + '",\n' +
    '  "traits": {\n' +
    '    "agreeableness": ' + i / names.length + ',\n' +
    '    "conscientiousness": ' + i / names.length + ',\n' +
    '    "extraversion": ' + i / names.length + ',\n' +
    '    "openness": ' + i / names.length + ',\n' +
    '    "neuroticism": ' + i / names.length + '\n  }\n' +
    '},\n';
});
script += '])';
console.log(script);
