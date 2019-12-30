import Parser from './parser.js';
import { predict } from './ppq.js';
import DotEnv from 'dotenv';
import text2p from './text2p';

DotEnv.config();

/*
 * Lifecycle:
 *    - created [ id, createdAt ]  {1}
 *    - updated with brand data -> [ traits, influences, similars ]  {1}
 *    - updated with lastPageVisit{url, time} [] {*}
 */
export default class User {

  constructor(tmpl) {
    Object.keys(User.schema()).forEach(k => this[k] = undefined);
    Object.assign(this, tmpl);
    this.clientId = process.env.REACT_APP_CLIENT_ID || -1;
    this.isActive = (tmpl && tmpl.isActive) || false;
    this.category = (tmpl && tmpl.category) || 0;
    this.loginType = this.loginType || 'email';
  }

  lastPage() {
    return typeof this.lastPageVisit === 'object'
      ? this.lastPageVisit.page : 'unknown';
  }

  generateSummary(numSentences) {

    return this.generateSentences(User.secondPersonTemplate, numSentences);
  }

  generateSentences(template, numSentences) {

    this._verifyTraits();

    if (arguments.length === 1 && typeof template === 'number') {
      numSentences = template;
      template = null;
    }

    if (typeof this.gender === 'undefined') this.gender = 'female';

    numSentences = numSentences || 3;

    let data = [];
    let targetNum = 3;
    let maxPerTrait = 2;
    let parser = new Parser(this);
    let traitNames = User.oceanTraits;
    let lines = this._descriptionLines(template);

    lines.forEach((l, i) => {

      data.push({
        line: parser.parse(l),
        trait: traitNames[i],
        score: this.traits[traitNames[i]]
      });
    });

    data.sort((a, b) => Math.abs(b.score - .5) - Math.abs(a.score - .5));

    let sentences = [];
    let re = new RegExp(this.name, "g");
    for (let i = 0, idx = 0; i < data.length; i++) {
      let parts = this.splitSentences(data[i].line);
      let added = 0;
      parts.forEach((p, j) => {
        if (p.length && added < maxPerTrait) {
          if (sentences.length) p = p.replace(re, this.pronoun());
          if (sentences.length < targetNum) {
            sentences.push(p.ucf());
            if (++added >= maxPerTrait) {
              return;
            }
          }
        }
      });
    }
    return sentences;
  }

  randomImages(pre) {
    let images = [];
    let ots = User.oceanTraits;
    while (images.length < 4) {
      let flip = Math.random() < .5 ? 1 : 2;
      let mult = Math.random() < .5 ? 1 : -1;
      let cat = (Math.floor(Math.random() * ots.length) * mult);
      let imgName = pre + this.adIssue + '_' + cat + '.' + flip + '.png';
      if (images.indexOf(imgName) < 0) images.push(imgName);
    }
    return images;
  }

  targetAdImages() {
    let pre = 'imgs/';

    if (typeof this.target === 'undefined') {
      throw Error('No target for adImages!', this);
    }

    let images = this.randomImages(pre);
    if (typeof this.target !== 'undefined' &&
      this.hasOceanTraits(this.target) &&
      typeof this.adIssue !== 'undefined') {

      let cat = this.categorize(this.target);
      if (cat !== 0) {
        //console.log('['+this.adIssue+']['+(cat > 0 ? 'high' : 'low')+']['+User.oceanTraits[Math.abs(cat)-1]+']');
        images = [
          pre + this.adIssue + '_' + cat + '.1.png',
          pre + this.adIssue + '_' + cat + '.2.png',
          pre + this.adIssue + '_' + -cat + '.1.png',
          pre + this.adIssue + '_' + -cat + '.2.png'
        ];
      }
    } else {
      console.error("[WARN] no target/traits/issue: " +
        "using random images, issue=" + this.adIssue, this.target.traits);
    }

    return images;
  }

  targetAdInfluences() {

    if (typeof this.target === 'undefined') { //TMP: remove
      throw Error('No target for adInfluences!', this);
    }

    let ots = User.oceanTraits;
    let influences = this.randomInfluences();
    //console.log("OT",this.hasOceanTraits(this.target), typeof this.target);
    if (typeof this.target !== 'undefined' &&
      this.hasOceanTraits(this.target) &&
      typeof this.adIssue !== 'undefined') {

      let cat = this.categorize(this.target);
      if (cat !== 0) {
        influences = User.adInfluences[this.adIssue]
        [(cat > 0 ? 'high' : 'low')][ots[Math.abs(cat) - 1]];
      }
    } else {
      console.error("[WARN] no target/traits/issue: " +
        "using random influences [issue=" + this.adIssue + "] target=", this.target);
    }
    return influences;
  }

  // TODO: combine these 3: targetAdItem(type) ?
  targetAdSlogans() {

    if (typeof this.target === 'undefined') { //TMP: remove
      throw Error('No target for adSlogans!', this);
    }

    let ots = User.oceanTraits;
    let slogans = this.randomSlogans();
    if (typeof this.target !== 'undefined' &&
      this.hasOceanTraits(this.target) &&
      typeof this.adIssue !== 'undefined') {

      let cat = this.categorize(this.target);
      if (cat !== 0) {
        //console.log('['+this.adIssue+']['+(cat > 0 ? 'high' : 'low')+']['+ots[Math.abs(cat)-1]+']');
        let good = User.adSlogans[this.adIssue]
        [(cat > 0 ? 'high' : 'low')][ots[Math.abs(cat) - 1]];
        let bad = User.adSlogans[this.adIssue]
        [(cat < 0 ? 'high' : 'low')][ots[Math.abs(cat) - 1]];
        slogans = good.concat(bad);
      }
    } else {
      console.error("[WARN] no target/traits/issue: using random slogan, issue="
        + this.adIssue, this.target.traits);
    }

    return slogans;
  }

  randomSlogans() {
    let ots = User.oceanTraits;
    let issue = this.adIssue;
    let idx1 = Math.floor(Math.random() * ots.length);
    let idx2 = Math.floor(Math.random() * ots.length)
    //console.log('['+this.adIssue+']['+(Math.random() < .5 ? 'high' : 'low')+']['+[ots[idx1]]+']');
    let set1 = User.adSlogans[issue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx1]];
    let set2 = User.adSlogans[issue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx2]];
    return set1.concat(set2);
  }

  randomInfluences() {
    let ots = User.oceanTraits;
    let idx = Math.floor(Math.random() * ots.length);
    //console.log(this.adIssue, this);
    return User.adInfluences[this.adIssue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx]];
  }

  targetImgUrl() {
    let tid = 'default';
    if (typeof this.target._id !== 'undefined' && this.target._id)
      tid = this.target._id;
    return User.profileDir + tid + '.jpg';
  }

  setBrands(brandData) {
    let traits = {};
    predict(brandData).forEach(t => traits[t.trait] = t.score);
    return this.setTraits(traits);
  }

  hasOceanTraits(obj) {
    obj = obj || this;
    if (typeof obj === 'string') {
      obj = JSON.parse(obj); // TMP:for targets
    }
    if (typeof obj.traits === 'undefined') {
      return false;
    }
    let result = true;
    User.oceanTraits.forEach(tname => {
      if (typeof obj.traits[tname] === 'undefined') {
        //if (obj.traits.hasOwnProperty(tname)) {
        result = false;
        return;
      }
      let val = obj.traits[tname];
      if (typeof val === 'undefined' || val < 0 || val > 1) {
        result = false;
        return;
      }
    });
    return result;
  }

  _verifyTraits() {

    if (!this.hasOceanTraits()) {
      throw Error('User with traits required');
    }
  }

  splitSentences(text) {

    let delim = '___';
    let abbrs = User.abbreviations;
    let re = new RegExp(delim, 'g');

    let unescapeAbbrevs = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(re, ".");
      }
      return arr;
    }

    let escapeAbbrevs = (text) => {
      for (let i = 0; i < abbrs.length; i++) {
        let abv = abbrs[i],
          idx = text.indexOf(abv);
        while (idx > -1) {
          text = text.replace(abv, abv.replace('.', delim));
          idx = text.indexOf(abv);
        }
      }
      return text;
    }

    let arr = escapeAbbrevs(text).match(/(\S.+?[.!?]["”\u201D]?)(?=\s+|$)/g);
    return (text.length && arr && arr.length) ? unescapeAbbrevs(arr) : [text];
  }

  _descriptionLines(tmpl) {

    tmpl = tmpl || User.descriptionTemplate;

    let lines = [];
    let traitNames = User.oceanTraits;
    for (let i = 0; i < traitNames.length; i++) {
      if (typeof tmpl[traitNames[i]] !== 'undefined') {
        let val = this.traits[traitNames[i]];
        if (val < 0 || val > 1) throw Error('Bad "' + traitNames[i] + '" trait -> ' + val);
        let idx = Math.min(traitNames.length - 1, Math.floor(val * traitNames.length));
        lines.push(tmpl[traitNames[i]].text[idx]);
      }
    }
    return lines;
  }

  generateDescription() {
    this._verifyTraits();
    let parser = new Parser(this);
    let lines = this._descriptionLines();
    for (let i = 0; i < lines.length; i++) {
      lines[i] = parser.parse(lines[i]);
    }
    return lines.join(' ').trim();
  }

  poss() {
    switch (this.gender) {
      case 'male':
        return 'his';
      case 'other': //return 'their'; TODO:
      case 'female':
        return 'her';
    }
  }

  pronoun() {
    switch (this.gender) {
      case 'male':
        return 'he';
      case 'other': //return 'they'; TODO:
      case 'female':
        return 'she';
    }
  }

  predictInfluences() {
    // TODO
    this.influences = ['Images that contain X and Y', 'Slogans that contain X and Y'];
  }

  predictDescriptors() {
    this.descriptors = this.generateSentences(3);
  }

  setTraits(traits) {
    if (typeof traits === 'string') throw Error('expecting traits object');

    this.traits = traits;
    this.predictInfluences();
    this.predictDescriptors();

    return this;
  }

  // setSimilars(arr) {
  //   if (!Array.isArray(arr)) throw Error('expecting array of objects');
  //   //this.similars = arr.map(obj => JSON.stringify(obj)); // TODO: cache
  // }
  // setTarget(obj) {
  //   if (typeof obj === 'string') throw Error('expecting object');
  //   this.target = JSON.stringify(obj); // TODO: cache
  //   //this.target = obj;
  // }
  //
  // getSimilars() {
  //   if (typeof this.similars === 'undefined') return [];
  //   return this.similars.map(s => JSON.parse(s)); // TODO: cache
  // }
  //
  // getTarget() {
  //   if (typeof this.target === 'undefined') {
  //     console.error("ERROR: user has no target");
  //     return { id: null, name: null, traits: User._randomTraits() };
  //   }
  //   return JSON.parse(this.target); // TODO: cache
  // }

  virtueAsAdverb() {
    const adverbs = {
      power: 'powerful',
      truth: 'truthful',
      wealth: 'valuable',
      faith: 'faithful',
      influence: 'influential',
    }
    return adverbs[this.virtue];
  }

  toBe() {
    return (this.gender === 'other') ? 'are' : 'is';
  }

  oceanTraits() {
    return User.oceanTraits;
  }

  categorize(obj) {

    obj = obj || this;
    if (typeof obj === 'string') {
      obj = JSON.parse(obj); // TMP:for targets
    }
    obj.category = 0;

    let maxVal = 0;
    let trait = null;
    let traits = User.oceanTraits;

    traits.forEach(t => {
      let val = obj.traits[t];
      if (Math.abs(val - .5) > maxVal) {
        maxVal = Math.abs(val - .5);
        trait = t;
      }
    });

    let traitIdx = 1 + traits.indexOf(trait);

    //console.log('def-trait: '+trait, this.traits[trait], 'idx='+traitIdx);

    let multiply = 0;
    if (obj.traits[trait] < .4) multiply = -1;
    if (obj.traits[trait] >= .6) multiply = 1;

    obj.category = traitIdx * multiply;

    return obj.category;
  }

  _randomizeTraits() {
    this.traits = User._randomTraits();
    return this;
  }
};

User.profileDir = process.env.PUBLIC_URL + '/profiles/';
User.imageDir = process.env.PUBLIC_URL + '/imgs/';

/**
 * MongoDB database schema for the application
 */
User.schema = () => {
  return {
    name: {
      type: 'string'
    },
    celebrity: {
      type: 'string'
    },
    influences: {
      type: ['string']
    },

    /* In this case, the Monolith id from client's .env file */
    clientId: {
      type: 'number',
      default: -1
    },

    /*
     * OCEAN-group: from -5 to 5, according to OCEAN acronym (O=1, C=2, etc).
     * Positive numbers mean 'high', negative numbers mean 'low',
     * 0 means the user is neutral and gets random assignments
     */
    category: {
      type: 'number',
      default: 0,
    },
    hasImage: {
      type: 'boolean',
      default: false
    },
    isActive: {
      type: 'boolean',
      default: false
    },
    target: { // JSON-stringified User
      type: 'string'
      //type: { type: 'objectId', ref: 'User' }
    },
    similars: { // JSON-stringified Users
      type: ['string']
    },
    descriptors: {
      type: ['string']
    },
    virtue: {
      type: 'string'
    },
    adIssue: {
      type: 'string'
    },
    lastPageVisit: {
      time: { type: 'date' },
      page: { type: 'string' }
    },
    traits: {
      openness: { type: 'number' },
      conscientiousness: { type: 'number' },
      extraversion: { type: 'number' },
      agreeableness: { type: 'number' },
      neuroticism: { type: 'number' },
      relationship: { type: 'number' },
      gender: { type: 'number' },
      age: { type: 'number' }
    },
    login: {
      type: 'string',
      required: true
    },
    dataChoices: { // TODO: should be arrays
      consumer: { type: 'string' }, // comma-delimited
      home: { type: 'string' }, // comma-delimited
      political: { type: 'string' } // comma-delimited
    },
    loginType: {
      type: 'string',
      enum: ['twitter', 'google', 'facebook', 'email'],
      required: true
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other']
    },
    createdAt: {
      type: 'date',
      default: Date.now
    }
  }
}

function rand() {
  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return arguments[0][irand(arguments[0].length)];
  }
  var randnum = Math.random();
  if (!arguments.length) return randnum;
  return (arguments.length === 1) ? randnum * arguments[0] :
    randnum * (arguments[1] - arguments[0]) + arguments[0];
}

function irand() {
  var randnum = Math.random();
  if (!arguments.length) throw Error('requires args');
  return (arguments.length === 1) ? Math.floor(randnum * arguments[0]) :
    Math.floor(randnum * (arguments[1] - arguments[0]) + arguments[0]);
}

User._randomData = function(tmpl) {
  if (!tmpl || typeof tmpl._id === 'undefined' || typeof tmpl.name === 'undefined') {
    console.log(tmpl);
    throw Error('id and login required' + tmpl);
  }
  let user = tmpl;
  if (typeof tmpl.hasOceanTraits !== 'function') user = new User(tmpl);

  user._randomizeTraits();
  user.login = user.login || user.name.toLowerCase() + '@mail.com';
  user.loginType = user.loginType || 'email';
  user.adIssue = user.adIssue || rand(['leave', 'remain']);
  user.gender = user.gender || rand(['male', 'female', 'other'])
  user.virtue = user.virtue || rand(['power', 'wealth', 'influence', 'truth']);
  // user.dataChoices = {};
  // user.dataChoices.consumer = ['health', 'finance', 'travel'];
  // user.dataChoices.home = ['smart watch', 'smart tv', 'smart assistant'];
  // user.dataChoices.political = ['online maps', 'polls & surveys', 'voting records'];
  user.clientId = user.clientId || irand(1, 7);
  user.hasImage = true;

  return user;
}

User._randomTraits = function(tmpl) {
  let traits = {};
  User.oceanTraits.forEach(t => traits[t] = Math.random());
  return traits;
}

User.oceanTraits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

User.adInfluences = {
  leave: {
    high: {
      openness: ["expansive, open themes", "‘freedom’, ‘future’ or ‘potential’"],
      conscientiousness: ["money or financial focus", "‘control’, ‘savings’ or ‘rights’"],
      extraversion: ["successful, outspoken people", "‘your rules’ or ‘your rights’ "],
      agreeableness: ["family scenes, or relaxing locations", "negativity toward institutions"],
      neuroticism: ["negative imagery, fear of ‘others’", "messages of fear"]
    },
    low: {
      openness: ["British traditions and culture", "‘British’ or ‘traditions’"],
      conscientiousness: ["action rather than tranquility", "‘no more’ or ‘time to act’"],
      extraversion: ["strong characters and visions of the future", "ideas of a ‘new’ tomorrow"],
      agreeableness: ["struggle or strife", "‘borders’, ‘jobs’ or ‘mistakes’"],
      neuroticism: ["easy-going or relaxing themes ", "‘relax’ or ‘no big deal’"]
    }
  },
  remain: {
    high: {
      openness: ["aspirational or inclusive themes", "‘solidarity’ or collective action "],
      conscientiousness: ["gambling or risk-taking ", "‘gambling’ or ‘trust’"],
      extraversion: ["successful, outspoken people", "outspoken or vocal themes"],
      agreeableness: ["social or familial harmony", "familial or cooperative themes"],
      neuroticism: ["fear and uncertainty", "‘stability’ or ‘uncertainty’"],
    },
    low: {
      openness: ["conventional or traditional families", "change and fear"],
      conscientiousness: ["impulsive, risky actions", "risk and danger"],
      extraversion: ["solitary people or ‘loners’", "thoughts of the future"],
      agreeableness: ["competition or contest", "losing’, ’quitting’ or ‘control’"],
      neuroticism: ["scenes of relaxation", "‘hassle’ or ‘worry’"],
    }
  }
};

User.adSlogans = {
  leave: {
    high: {
      openness: ["Free to create a British future", "Unleash our true potential"],
      conscientiousness: ["Greater control. Greater savings", "Your future, your right"],
      extraversion: ["Play by your own rules", "Tell the EU, your voice matters"],
      agreeableness: ["Love Europe Not the EU", "Better for family budgets"],
      neuroticism: ["No more foreign criminals", "Tipping point"]
    },
    low: {
      openness: ["British is best", "The EU is diluting our traditions"],
      conscientiousness: ["No more sitting around", "Its time to act"],
      extraversion: ["Rise like Lions", "Imagine a new tomorrow"],
      agreeableness: ["Our borders. Our jobs", "Don't pay for their mistakes"],
      neuroticism: ["No EU. No problem", "Relax. It's no big deal"]
    }
  },
  remain: {
    high: {
      openness: ["No country by itself", "For Solidarity"],
      conscientiousness: ["Never trust a joker", "They're gambling with the future"],
      extraversion: ["Don't be silenced", "Don't leave the conversation"],
      agreeableness: ["A future for your family", "Cooperation leads the way"],
      neuroticism: ["Au revoir stability.", "Imagine the uncertainty"],
    },
    low: {
      openness: ["Don't make this a hassle", "Change is scary"],
      conscientiousness: ["Seize the opportunity ", "I'll take my chances"],
      extraversion: ["You don't need the crowd to have your say", "Contemplate your future"],
      agreeableness: ["The fastest way to lose is to quit", "Control your destiny"],
      neuroticism: ["Who needs the hassle?", "Who has time to worry?"],
    }
  }
};

User.abbreviations = ["Adm.", "Capt.", "Cmdr.", "Col.", "Dr.", "Gen.", "Gov.", "Lt.", "Maj.", "Messrs.", "Mr.", "Mrs.", "Ms.", "Prof.", "Rep.", "Reps.", "Rev.", "Sen.", "Sens.", "Sgt.", "Sr.", "St.", "a.k.a.", "c.f.", "i.e.", "e.g.", "vs.", "v.", "Jan.", "Feb.", "Mar.", "Apr.", "Mar.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

User.secondPersonTemplate = text2p;

User.descriptionTemplate = {
  openness: {
    desc: 'Openness to experience relates to our imagination and the degree to which we are comfortable with unfamiliarity',
    poles: ['Conservative and Traditional', 'Liberal and Artistic'],
    meta: 'People scoring high on this trait can be described as intellectually curious, sensitive to beauty, and unconventional, while people scoring low on this trait can be characterized as traditional and are more likely to prefer the familiar over the unusual.',
    text: [
      '$user.name.ucf() $user.toBe() down-to-earth and prefers things to be simple and straightforward. $user.pronoun().ucf() finds life easier if things don’t change unnecessarily. The arts are of little practical use to $user.poss() as tradition $user.toBe() generally more important.',
      '$user.name.ucf() dislikes needless complexity, and prefers the familiar over the unusual. $user.pronoun().ucf() is more conservative than many and values practical outcomes over flighty imagination.',
      '$user.name.ucf() $user.toBe() aware of $user.poss() feelings but doesn’t get carried away with $user.poss() imagination. $user.pronoun().ucf() embraces change when it $user.toBe() necessary while still resisting it when $user.pronoun() thinks otherwise. Beauty $user.toBe() important to $user.poss(), but it’s not everything.',
      '$user.name.ucf() $user.toBe() intellectually curious and appreciative of what $user.pronoun() considers beautiful, no matter what others think. $user.poss().ucf() imagination $user.toBe() vivid and makes $user.poss() more creative than many others.',
      '$user.name.ucf() $user.toBe() far more intellectually curious and sensitive to beauty than most. $user.poss().ucf() beliefs are individualistic and frequently drift towards the unconventional. $user.pronoun().ucf() enjoys $user.poss() imagination and the exciting places it takes $user.poss().'
    ]
  },

  conscientiousness: {
    desc: 'Conscientiousness concerns the way in which we control, regulate, and direct our impulses.',
    poles: ['Impulsive and Spontaneous', 'Organized and Hard-working'],
    meta: 'People scoring high on this trait can be described as organized, reliable, and efficient, while people scoring low on this trait are generally characterized as spontaneous and impulsive.',
    text: [
      '$user.name.ucf() $user.toBe() impulsive and whimsical, and fine with it! $user.pronoun().ucf() would say that sometimes decisions need to be made quickly, and that $user.pronoun() makes them quicker than most. $user.pronoun().ucf() would say $user.pronoun() $user.toBe() zany, colourful, and just generally great fun to be with... as long as someone isn’t relying on $user.pronoun() to get some work done.',
      '$user.name.ucf() $user.toBe() spontaneous and fun. $user.pronoun().ucf() likes to do unexpected things that make life that bit more interesting. $user.pronoun().ucf() $user.toBe()n’t completely unreliable, but $user.pronoun()’ve been known to slip up on occasion.',
      '$user.name.ucf() $user.toBe() random and fun to be around but $user.pronoun() can plan and persist when life requires it. Depending on the situation, $user.pronoun() can make quick decisions or deliberate for longer if necessary.',
      '$user.name.ucf() avoids foreseeable trouble through purposeful planning and achieves success through persistence. $user.pronoun().ucf() $user.toBe() reliable and prepared for life’s challenges.',
      '$user.name.ucf() $user.toBe() a perfectionist. $user.pronoun().ucf() prefers to plan everything to the last detail, which has consequently led to $user.poss() being very successful and extremely reliable. $user.pronoun().ucf() enjoys seeing $user.poss() long-term plans come to fruition.'
    ]
  },

  extraversion: {
    desc: 'Extraversion refers to the extent to which people get their energy from the company of others, and whether they actively seek excitement and stimulation',
    poles: ['Contemplative', 'Engaged with Outside World'],
    meta: 'People scoring high on this trait can be described as energetic, talkative and sociable, while people scoring low on this trait tend to be more shy, reserved and comfortable in their own company.',
    text: [
      '$user.name.ucf() $user.toBe() quiet and somewhat withdrawn. $user.pronoun().ucf() is someone who doesn’t need lots of other people around to have fun, and sometimes finds people tiring.',
      '$user.name.ucf() prefers low-key social occasions, with a few close friends. It’s not that $user.pronoun() $user.toBe() afraid of large parties; they\'re just not that fun for $user.poss().',
      '$user.name.ucf() enjoys and actively seeks out social occasions, but would say that they’re not everything. $user.pronoun().ucf() might say that sometimes it $user.toBe() nice to step back for a while and have a quiet night in.',
      '$user.name.ucf() $user.toBe() energetic and active. $user.pronoun().ucf() is someone who enjoys and actively seeks out social occasions, and especially enjoys talking with a big group of people.',
      '$user.name.ucf() $user.toBe() constantly energetic, exuberant and active. $user.pronoun().ucf() is someone who aims to be the centre of attention at social occasions, takes charge in groups, and usually says "Yes" to challenges.'
    ]
  },

  agreeableness: {
    desc: 'Agreeableness reflects individual differences concerning cooperation and social harmony.',
    poles: ['Competitive', 'Team-working and Trusting'],
    meta: 'People scoring high on this trait are generally considered soft-hearted, generous, and sympathetic, while people scoring low on this trait tend to be more driven, self-confident and competitive.',
    text: [
      '$user.name.ucf() $user.toBe() willing to make (tough|difficult) decisions when necessary, and will point out when something $user.toBe() wrong no matter what other people might feel. (One|You) might say that $user.pronoun() is tough and uncompromising.',
      '$user.name.ucf() often finds it difficult to get along with new people when they first meet, as $user.pronoun() can be suspicious of their motives. Over time though people warm to $user.poss(), and $user.pronoun() to them, although that doesn’t stop $user.poss() from telling them "how it $user.toBe()".',
      '$user.name.ucf() gets along with people well, especially once they have proved themselves trustworthy to $user.pronoun(). $user.pronoun().ucf() do have a healthy scepticism about others’ motives, but that doesn’t stop $user.pronoun() from considering others to be basically honest and decent.',
      '$user.name.ucf() is someone people get along with easily. $user.pronoun().ucf() $user.toBe() considerate and friendly, and expect others to be honest and decent.',
      '$user.name.ucf() $user.toBe() extremely easy to get along with. $user.pronoun().ucf() $user.toBe() considerate, friendly, generous and helpful and $user.pronoun() considers most others to be decent and trustworthy.'
    ]
  },

  neuroticism: {
    desc: 'Neuroticism refers to the tendency to experience negative emotions.',
    poles: ['Laid-back and Relaxed', 'Easily Stressed and Emotional'],
    meta: 'People scoring high on this trait generally worry more than most, and react poorly to stressful situations. However, they often show an emotional depth that others lack.',
    text: [
      '$user.name.ucf() $user.toBe() extremely (hard|difficult) to upset or stress out, since $user.pronoun() rarely, if ever, react with negative emotions, and even when $user.pronoun() $user.toBe() anxious about something the feeling quickly passes. $user.pronoun().ucf() comes across as very calm and resilient.',
      '$user.name.ucf() $user.toBe() calm and emotionally stable. $user.pronoun().ucf() comes across as someone who $user.toBe() rarely bothered by things, and when they do get $user.pronoun() down, the feeling does not persist for very long.',
      '$user.name.ucf() $user.toBe() generally calm. $user.pronoun().ucf() comes across as someone who can feel emotional or stressed out by some experiences, but $user.poss() feelings tend to be warranted by the situation.',
      '$user.name.ucf() tends to be more self-conscious than many. $user.pronoun().ucf() comes across as someone who can find it hard to not get caught up by anxious or stressful situations. $user.pronoun().ucf() $user.toBe() in touch with $user.poss() own feelings.',
      '$user.name.ucf() reacts poorly to stressful situations, and consequently worries about them more than most. However $user.pronoun() has an emotional depth that others may lack.'
    ]
  }
};
