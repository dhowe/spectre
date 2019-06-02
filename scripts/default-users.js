let result, x = [];
defaults.forEach(d => {
  let user = new User(d);
  user._randomizeTraits();
  x.push(user);
  result = x.map(({ id, name, traits, influences }) => ({ id, name, traits, influences }));
});
console.log(JSON.stringify(result));

