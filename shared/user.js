import Parser from './parser.js';
import { predict } from './ppq.js';
import jwt from 'jsonwebtoken';
import DotEnv from 'dotenv';

DotEnv.config();

export default class User {

  constructor(tmpl) {
    Object.keys(User.schema()).forEach(k => this[k] = undefined);
    if (tmpl) this.assign(tmpl);
    this.traits = this.traits || User.emptyTraits();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = this.updatedAt || new Date();
    this.loginType = this.loginType || 'email';
    this.lastPage = this.lastPage || '';
    this.dataChoices = this.dataChoices || {};
    this.influences = this.influences || {};
    this.targetAd = this.targetAd || {};
  }

  static create(json) {
    return new User().assign(json);
  }

  static generateToken(user) {
    if (!process.env.JWT_SECRET || !process.env.JWT_SECRET.length) {
      throw Error('JWT_SECRET appears to be missing in your .env');
    }
    return jwt.sign(
      { email: user.login },
      process.env.JWT_SECRET,
      { expiresIn: '1w' }
    );
  }

  static assignToken(user) {
    user.token = User.generateToken(user);
    return user;
  }

  assign(json) {
    if (!json) throw Error('null json in User.assign');
    let dateFields = ['updatedAt', 'createdAt'];
    dateFields.forEach(df => {
      if (json.hasOwnProperty(df)) {
        if (!typeof json[df] === 'string') throw Error
          ('Expecting date string, found ' + typeof json[df]);
        this[df] = new Date(json[df]);
        if (!this[df] instanceof Date) throw Error
          ('Expecting Date object, found ' + typeof this[df]);
        delete json[df];
      }
    });
    return Object.assign(this, json);
  }

  logVisit(page) {
    page = page || window && window.location.pathname;
    if (!this.lastPage.endsWith(page)) {
      this.lastPage += (this.lastPage.length ? ',' : '') + page;
    }
    this.updatedAt = new Date();
    //console.log('[USER]', this.lastPage, this.updatedAt);
  }

  goto(props, page) {
    this.logVisit(page);
    props.history.push(page);
  }

  toString() {
    let u = this;
    let s = u._id ? u._id + ', ' + u.name : u.name;
    if (u.login) s += ', ' + u.login;
    if (u.gender) s += ', ' + u.gender;
    if (u.age) s += ', ' + u.age;
    if (u.virtue) s += ', ' + u.virtue;
    if (u.target) s += ', target=' + u.target._id + '/' + u.target.name;
    if (u.similars && u.similars.length) {
      s += ', similars(' + u.similars.length + ')';
    }
    if (u.hasImage) s += ', hasImage';
    if (User.hasOceanTraits(this)) s += ', traits';
    return s + ', ' + (u.updatedAt.getYear() + 1900);
  }

  generateSummary(person, numSentences) {
    person = person || '2p';
    return this.generateSentences(person === '2p'
      ? User.oceanDesc2p : User.oceanDesc3p, numSentences);
  }

  static definingTrait(target, excludes) {

    if (typeof target !== 'object') throw Error
      ('definingTrait requires object: got ' + typeof target);

    let traits = User.oceanTraits;
    let trait, maxDev = 0;
    traits.forEach(t => {
      if (excludes && excludes.includes(t)) return;
      let val = target.traits[t];
      let dev = Math.abs(val - .5);
      if (dev > maxDev) {
        maxDev = dev;
        trait = t;
      }
    });

    let traitIdx = 1 + traits.indexOf(trait);

    let multiply = 0;
    if (target.traits[trait] < .4) multiply = -1;
    if (target.traits[trait] >= .6) multiply = 1;

    //console.log('definingTrait: '+trait, target.traits[trait],
    // traitIdx * multiply, 'cat='+(traitIdx * multiply));

    return {
      trait: trait,
      score: target.traits[trait],
      category: traitIdx * multiply
    };
  }

  influencingSentences(tmpl, adIssue) {
    if (!adIssue) throw Error('No adIssue in User.influencingSentences()');
    let is2p = tmpl === User.oceanDesc2p;
    User.computeInfluencesFor(this);
    if (!Array.isArray(this.influences[adIssue].themes)
      || this.influences[adIssue].themes.length != 2) {
      throw Error('this.influences.adIssue.themes not an array[2]');
    }
    return (is2p ? 'You' : this.name.ucf()) + ' can'
      + ' likely be influenced by images showing '
      + this.influences[adIssue].themes[0]
      + ' and by slogans containing '
      + this.influences[adIssue].themes[1] + '.';
  }

  getAge() {
    return Math.round(this.age).toString();
  }

  openingSentences(tmpl, parser) {
    parser = parser || new Parser(this);
    tmpl = tmpl === '2p' ? User.oceanDesc2p : tmpl || User.oceanDesc3p;
    let target = this;
    let is2p = tmpl === User.oceanDesc2p;
    let { category, trait } = User.definingTrait(target);
    let text = parser.parse(is2p ? User.opening2p : User.opening3p) + ' ';
    text += (is2p ? 'Your' : target.possPron().ucf()) + ' defining OCEAN trait';
    text += ' is ' + trait + ', on which ' + (is2p ? 'you score' : target.persPron() + ' scores');
    text += ' unusually ' + (category > 0 ? 'high. ' : 'low. ');
    text += User.oceanDesc[trait].desc + ' ';
    text += tmpl[trait].meta[category < 0 ? 0 : 1];

    return text;
  }

  generateDescription(tmpl, adIssue) {

    let target = this;

    // validate args  && user state
    tmpl = tmpl === '2p' ? User.oceanDesc2p : User.oceanDesc3p;
    if (!User.hasOceanTraits(target)) throw Error('traits required');

    if (typeof target.age === 'undefined') {
      console.error('User.generateDescription: no age found!');
      target.age = 25;
    }

    if (typeof target.gender === 'undefined') {
      console.error('User.generateDescription: no gender found!');
      target.gender = 'female';
    }

    let { trait, score } = User.definingTrait(target);
    let traitNames = User.oceanTraits;
    let idx = Math.min(traitNames.length - 1,
      Math.floor(score * traitNames.length));
    let tmplText = tmpl[trait].text[idx];

    let parser = new Parser(target);
    let opening = this.splitSentences(parser.parse(target.openingSentences(tmpl, parser)));
    let description = this.splitSentences(parser.parse(tmplText));
    let closing = null;
    if (adIssue) closing = this.splitSentences(target.influencingSentences(tmpl, adIssue));

    //console.log(target.traits, '\n', trait, score,'\n', text);

    return { trait, opening, description, closing };
  }

  generateSentences(template, numSentences) {

    if (!User.hasOceanTraits(this)) throw Error('traits required');

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

    // TODO: use category here
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
    for (let i = 0; i < data.length; i++) {
      let parts = this.splitSentences(data[i].line);
      let added = 0;
      parts.forEach(p => {
        if (p.length && added < maxPerTrait) {
          if (sentences.length) p = p.replace(re, this.persPron());
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

  targetImage() {
    let tid = (this.target && typeof this.target._id !== 'undefined'
      && this.target._id.length) ? this.target._id : 'default';
    return tid + '.jpg'
  }

  traitsFromBrands(brandRatings) {
    let traits = {};
    let ratings = predict(brandRatings);
    ratings.forEach(r => traits[r.trait] = r.score);
    this.traits = traits;
    console.log(brandRatings, traits);
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

    tmpl = tmpl || User.oceanDesc3p;

    // TODO: use category here

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

  _randomizeTraits() {
    this.traits = User.randomTraits();
    return this;
  }



  objPron() {
    switch (this.gender) {
      case 'male':
        return 'him';
      case 'other':
        return 'them';
      case 'female':
        return 'her';
    }
  }

  persPron() { // personal pronoun
    switch (this.gender) {
      case 'male':
        return 'he';
      case 'other':
        return 'they';
      case 'female':
        return 'she';
    }
  }

  possPron() {
    switch (this.gender) {
      case 'male':
        return 'his';
      case 'other':
        return 'their';
      case 'female':
        return 'her';
    }
  }
  // statics =================================================================

  static hasOceanTraits(obj) {
    if (typeof obj !== 'object') throw Error
      ('hasOceanTraits expects object: got ' + typeof obj);
    if (typeof obj.traits === 'undefined') return false;
    for (let i = 0; i < User.oceanTraits.length; i++) {
      let t = User.oceanTraits[i];
      if (!obj.traits.hasOwnProperty(t)) return false;
      if (obj.traits[t] < 0 || obj.traits[t] > 1) return false;
    }
    return true;
  }

  /*
   * Categorize according to OCEAN-group:
   * from -5 to 5, according to OCEAN acronym (O=1, C=2, etc).
   * Positive numbers mean 'high', negative numbers mean 'low',
   * 0 means the user is neutral and gets random assignments
   */
  static categorize(user) {
    return User.definingTrait(user).category;
  }

  static categorizeOLD(user) {
    if (typeof user !== 'object') throw Error
      ('categorize requires object: got ' + typeof user);

    let maxVal = 0;
    let trait = null;
    let traits = User.oceanTraits;

    traits.forEach(t => {
      let val = user.traits[t];
      if (Math.abs(val - .5) > maxVal) {
        maxVal = Math.abs(val - .5);
        trait = t;
      }
    });

    let traitIdx = 1 + traits.indexOf(trait);

    //console.log('def-trait: '+trait, this.traits[trait], 'idx='+traitIdx);

    let multiply = 0;
    if (user.traits[trait] < .4) multiply = -1;
    if (user.traits[trait] >= .6) multiply = 1;

    return traitIdx * multiply;
  }

  static randomInfluencingImages(adIssue, pre, ext) {
    let images = [];
    let ots = User.oceanTraits;
    while (images.length < 4) {
      let flip = Math.random() < .5 ? 1 : 2;
      let mult = Math.random() < .5 ? 1 : -1;
      let cat = (Math.floor(Math.random() * ots.length) * mult);
      if (cat !== 0) {
        let imgName = (pre + adIssue + '_' + cat + '.' + flip) + ext;
        if (images.indexOf(imgName) < 0) images.push(imgName);
      }
    }
    return images;
  }

  static randomIfluencingSlogans(adIssue) {
    let ots = User.oceanTraits;
    let idx1 = Math.floor(Math.random() * ots.length);
    let idx2 = Math.floor(Math.random() * ots.length)
    let set1 = User.ifluencingSlogans[adIssue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx1]];
    let set2 = User.ifluencingSlogans[adIssue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx2]];
    return set1.concat(set2);
  }

  static randomInfluencingThemes(adIssue) {
    let ots = User.oceanTraits;
    let idx = Math.floor(Math.random() * ots.length);
    //console.log(this.adIssue, this);
    return User.influencingThemes[adIssue]
    [(Math.random() < .5 ? 'high' : 'low')][ots[idx]];
  }

  // target is an object with traits
  static computeInfluencesFor(target, issues) {

    if (typeof target === 'undefined') {
      throw Error('No target in User.computeInfluencesFor()');
    }

    let needsWork = false;
    issues = issues || User.adIssues;
    issues.forEach(issue => {
      if (!target.influences
        || !target.influences[issue]
        || !target.influences[issue].images
        || !target.influences[issue].themes
        || !target.influences[issue].slogans) {
        needsWork = true;
      }
    });

    if (!needsWork) return;

    if (!User.hasOceanTraits(target)) throw Error
      ('No traits for target in User.computeInfluencesFor()');

    const pre = 'imgs/', cat = User.categorize(target), ext = '.jpg';
    target.influences = {};

    issues.forEach(issue => {
      let images = this.randomInfluencingImages(issue, pre, ext);
      let slogans = this.randomIfluencingSlogans(issue);
      let themes = this.randomInfluencingThemes(issue);

      if (cat !== 0) {
        images = [
          pre + issue + '_' + cat + '.1' + ext,
          pre + issue + '_' + cat + '.2' + ext,
          pre + issue + '_' + -cat + '.1' + ext,
          pre + issue + '_' + -cat + '.2' + ext
        ];
        themes = User.influencingThemes[issue][(cat > 0 ? 'high' : 'low')][User.oceanTraits[Math.abs(cat) - 1]];
        slogans = User.ifluencingSlogans[issue][(cat > 0 ? 'high' : 'low')][User.oceanTraits[Math.abs(cat) - 1]];
        slogans = slogans.concat(User.ifluencingSlogans[issue][(cat < 0 ? 'high' : 'low')][User.oceanTraits[Math.abs(cat) - 1]]);
      }
      else {
        //console.warn('[TARGET] Using random target data: ', issue, cat, images, themes, slogans);
      }

      target.influences[issue] = {};
      target.influences[issue].images = images;
      target.influences[issue].themes = themes;
      target.influences[issue].slogans = slogans;

      return target; // ?
    });
  }
}

/*
 * MongoDB database schema for the application
 */
User.schema = () => {
  return {
    name: {
      type: 'string'
    },
    login: {
      type: 'string',
      required: true
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date
    },
    celebrity: {
      type: 'string'
    },
    clientId: {
      type: 'string',
      default: 'localhost'
    },
    hasImage: {
      type: 'boolean',
      default: false
    },
    targetId: {
      type: 'string'
    },
    virtue: {
      type: 'string'
    },
    adIssue: {
      type: 'string'
    },
    keepData: {
      type: 'boolean',
      default: true
    },
    targetAd: {
      image: {
        type: 'string'
      },
      slogan: {
        type: 'string'
      }
    },
    lastPage: {
      type: 'string',
      default: ''
    },
    traits: {
      openness: { type: 'number', default: -1 },
      conscientiousness: { type: 'number', default: -1 },
      extraversion: { type: 'number', default: -1 },
      agreeableness: { type: 'number', default: -1 },
      neuroticism: { type: 'number', default: -1 },
      relationship: { type: 'number', default: -1 },
      gender: { type: 'string', default: 'other' },
      age: { type: 'number', default: -1 }
    },
    dataChoices: {
      consumer: { type: 'string' }, // comma-delimited
      home: { type: 'string' }, // comma-delimited
      political: { type: 'string' } // comma-delimited
    },
    loginType: {
      type: 'string',
      enum: ['twitter', 'google', 'facebook', 'email'],
      required: true
    },
    age: {
      type: 'number'
      //default: 0,
    },
    genderProb: {
      type: 'number'
    },
    gender: {
      type: 'string',
      enum: ['male', 'female', 'other']
    }
  }
}

User.publicUrl = 'https://spectreknows.me/';
User.epochDate = new Date(1970, 1, 1);

User.randomTraits = () => {
  let traits = {};  // non-zero random trait values
  User.oceanTraits.forEach(t => traits[t] = Math.random() + .000000001);
  return traits;
}

User.emptyTraits = () => {
  let traits = {};  // non-zero random trait values
  User.oceanTraits.forEach(t => traits[t] = -1);
  return traits;
}

User.adIssues = ['democrat', 'republican'];
User.oceanTraits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

User.influencingThemes = {

  ///////////////////////////////// US /////////////////////////////////////
  republican: {
    high: {
      openness: ["freedom, open skies or scenic vistas", "freedom, future or potential"],
      conscientiousness: ["organization, synchronicity or finances", "control, fiscal responsibility or rights"],
      extraversion: ["free expression, success or confidence", "your rules or your rights"],
      agreeableness: ["family scenes or relaxing locations", "relaxation, friendship or loyalty"],
      neuroticism: ["negative imagery or fear of ‘the other‘", "crime, instability or fear"]
    },
    low: {
      openness: ["traditional institutions or culture", "unity, tradition or values"],
      conscientiousness: ["impulsive actions, gambling or risk-taking", "aggression or action-taking"],
      extraversion: ["strong characters or ‘visions of the future‘", "rising up, or ‘ideas for a new tomorrow‘"],
      agreeableness: ["competition, sports or winning", "borders, jobs or paying for others mistakes"],
      neuroticism: ["carefree activities or relaxation", "hassle, stress or worry"]
    }
  },
  democrat: {
    high: {
      openness: ["aspirational or inclusive themes", "solidarity or collective action"],
      conscientiousness: ["impulsive actions or gambling", "risk and trust"],
      extraversion: ["silence or restriction ", "expression, or ones 'voice'"],
      agreeableness: ["social cohesion or family harmony", "family, community or cooperation"],
      neuroticism: ["anxiety, stress or uncertainty", "instability or indecision"],
    },
    low: {
      openness: ["traditional institutions or culture", "unity, tradition or values"],
      conscientiousness: ["impulsive actions or gambling", "risk and danger"],
      extraversion: ["solitary people or loners", "contemplation or solitude"],
      agreeableness: ["competition, sports or winning", "losing, quitting or control"],
      neuroticism: ["carefree activities, relaxation or fun", "hassle, stress or worry"],
    }
  },

  ///////////////////////////////// UK /////////////////////////////////////
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
      extraversion: ["strong characters or visions of the future", "ideas of a ‘new’ tomorrow"],
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

User.ifluencingSlogans = {

  ///////////////////////////////// US /////////////////////////////////////
  republican: {
    high: {
      openness: ["For a free America", "Unleash our true potential"],
      conscientiousness: ["More control, more savings", "Your future, your rights"],
      extraversion: ["Play by your own rules", "Your voice matters"],
      agreeableness: ["Family and friends first", "Keep it real, America"],
      neuroticism: ["No more foreign criminals", "Americans protect their own"]
    },
    low: {
      openness: ["The best of America", "Put America First"],
      conscientiousness: ["Now's the time for action", "Time to act"],
      extraversion: ["Imagine a new tomorrow", "Live the Pioneer Spirit"],
      agreeableness: ["American jobs, American workers", "Good fences make good neighbors"],
      neuroticism: ["Keep American winning", "Relax, winning is guaranteed"]
    }
  },
  democrat: {
    high: {
      openness: ["All for one, one for all", "Together we can"],
      conscientiousness: ["Don't gamble with our future", "Never trust a joker"],
      extraversion: ["We will not be silenced", "Your voice matters"],
      agreeableness: ["A future for your family", "Cooperate, together"],
      neuroticism: ["No more uncertainty", "Say No to the New Normal"],
    },
    low: {
      openness: ["Keep families together", "Putting family first"],
      conscientiousness: ["Seize the opportunity ", "Our chance is now"],
      extraversion: ["Imagine a new tomorrow", "Contemplate your future"],
      agreeableness: ["Quitters never win", "Control your destiny"],
      neuroticism: ["Don't fret, just vote", "Less worry, more change"],
    }
  },

  ///////////////////////////////// UK /////////////////////////////////////
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

User.oceanDesc = {
  openness: {
    desc: 'Openness to experience relates to imagination and creativity, and to the degree that one is comfortable with unfamiliarity.',
    poles: ['Conservative and Traditional', 'Liberal and Artistic'], // [low, high] unused as yet
  },
  conscientiousness: {
    desc: 'Conscientiousness concerns thoughtfulness and the way in which one controls, regulates, and directs impulses.',
    poles: ['Impulsive and Spontaneous', 'Organized and Hard-working'],
  },
  extraversion: {
    desc: 'Extraversion refers to the extent to one derives energy from the company of others, and whether they actively seek excitement and stimulation.',
    poles: ['Contemplative', 'Engaged with Outside World'],
  },
  agreeableness: {
    desc: 'Agreeableness refers to attributes such as trust, altruism, kindness, affection, and other pro-social behaviors.',
    poles: ['Competitive', 'Team-working and Trusting'],
  },
  neuroticism: {
    desc: 'Neuroticism refers to the degree that one experiences negative emotions such as anxiety, irritability, and sadness.',
    poles: ['Laid-back and Relaxed', 'Easily Stressed and Emotional'],
  }
};

User.opening2p = 'You are a $user.gender of approximately $user.getAge() years of age.';
User.opening3p = '$user.name.ucf() is a $user.getAge() year-old $user.gender follower.';

User.oceanDesc2p = {
  openness: {
    text: [
      'While you\'re down-to-earth, simple and straightforward, you can be rigid in your views. Obviously you find value in the arts, but tradition always wins for you in the end',
      'You dislike complexity, and prefer the familiar over the unusual. You\'re quite conservative and choose practical outcomes over creative or imaginative flights.',
      'You are very aware of your feelings -- but not as much your imagination. You both embrace change and resist simultanesouly. Have you forgotten that beauty was once so important to you?',
      'You are intellectually curious and adept at recognizing beauty, no matter the opinions of others. Your imagination is vivid but your creativity can lead you astray',
      'You\'re more intellectually curious than most, and recognize beauty in the world. But your beliefs are unconventional, and can tend even toward pessimism.'
    ],
    meta: ['People like you, who score low on this trait, are generally traditional and prefer the familiar over the unusual.', 'People like you, who score high on this trait, are intellectually curious, sensitive to beauty, and unconventional.']
  },

  conscientiousness: {
    text: [
      'You are impulsive, even whimsical... But you can act decisively. Friends might call you "fun" to be with, but you\'re no philosopher',
      'You\'re spontaneous and like to do unexpected things to try to keep life "interesting". You aren’t unreliable per se, but you\'ve been known to slip.',
      'You are random and fun to be around but you can plan when life requires it. Depending on the situation, you can make quick decisions or deliberate for longer if necessary.',
      'You avoid trouble through planning and imagine that your persistence will get you where you want to go.',
      'You\'re a bit of a perfectionist, planning things to the most minute detail. You can appear somewhat self-satisified, especially when long-term plans come to fruition.'
    ],
    meta: ['People like you, who score low on this trait, are generally characterized as spontaneous and impulsive.', 'People like you, who score high on this trait, can be described as organized, reliable, and efficient.']
  },

  extraversion: {
    text: [
      'You are quiet and a bit withdrawn, someone who doesn’t need people around to have \'fun\'. You even find people tiring at times.',
      'You prefer low-key social occasions with a few close friends. It’s not that you are afraid of large parties, they\'re just not that fun for you.',
      'You enjoy and actively seek out social occasions, but don\'t think them super important. You might say that sometimes its nice to take a step back and have a quiet night in.',
      'You think you\'re energetic and dynamic. But you\'re someone who seeks out social attention, especially in large groups.',
      'You think you\'re energetic, exuberant and active. You enjoy being the center of attention at social occasions, but like to think you\'re ready for something bigger.'
    ],
    meta: ['People like you, who score low on this trait, tend to be shy, reserved and most comfortable alone.', 'People like you, who score high on this trait, can be described as energetic, talkative and sociable.']
  },

  agreeableness: {
    text: [
      'You can make tough decisions when necessary, and are happy to point out when something\'s wrong. You are tough, but somewhat uncompromising.',
      'You often have a hard time with new people, as you can be suspicious of their motives. Over time, however, you make good connections. But it doesn’t stop your from telling them \'how it is\'.',
      'You get along with people, especially once they\'ve proved themselves trustworthy. You have a healthy scepticism about others’ motives, but that doesn’t stop you from considering them basically honest and decent.',
      'You\'re someone people think they can get along with easily. You generally expect others to be honest and decent, even when they\'re not',
      'You are easy to get along with (most of the time). You imagine yourself friendly and tolerant, but this doesn\'t always extend to those who are not as enlightened'
    ],
    meta: ['People like you, who score low on this trait, tend to be more driven, self-confident and competitive.', 'People like you, who score high on this trait, are generally considered soft-hearted, generous, and sympathetic.']
  },

  neuroticism: {
    text: [
      'You don\'t show negative emotions even when you feel anxious. You try to present yourself as calm and resilient.',
      'You\'re generally emotionally stable, but try too hard to act as if you\'re never bothered.',
      'You are generally calm. Though you can feel emotional or stressed out by some experiences, your feelings tend to be warranted by the situation.',
      'You are more self-conscious than some, and can get caught up in stressful situations.  On the other hand you\'re quite \"in touch\" with your own feelings.',
      'You are likely to react poorly to stressful situations. On the other hand you demonstrate a somewhat unexpected emotional depth.'
    ],
    meta: ['People like you, who score low on this trait, often show an unusual emotional depth.', 'People like you, who score high on this trait, generally worry more than most, and react poorly to stressful situations.']
  }
};

User.oceanDesc3p = {
  openness: {
    text: [
      '$user.name.ucf() $user.toBe() down-to-earth and prefers things simple. $user.persPron().ucf() finds life easier if things don’t change unnecessarily. The arts are of little practical use to $user.possPron() as tradition $user.toBe() generally more important.',
      '$user.name.ucf() dislikes needless complexity. $user.persPron().ucf() prefers the familiar over the unusual and is more conservative than many. $user.persPron().ucf() values practical outcomes over flighty imagination.',
      '$user.name.ucf() $user.toBe() aware of $user.possPron() feelings. But $user.persPron() doesn’t get carried away with $user.possPron() imagination. $user.persPron().ucf() embraces change when it $user.toBe() necessary while still resisting it when $user.persPron() thinks otherwise. Beauty $user.toBe() important to $user.possPron(), but it’s not everything.',
      '$user.name.ucf() $user.toBe() intellectually curious. $user.persPron().ucf() $user.toBe() appreciative of what $user.persPron() considers beautiful, no matter what others think. $user.possPron().ucf() imagination $user.toBe() vivid and makes $user.possPron() more creative than others.',
      '$user.name.ucf() $user.toBe() is highly intellectually curious. And $user.persPron() $user.toBe() more sensitive to beauty than most. $user.possPron().ucf() beliefs are individualistic and frequently drift towards the unconventional. $user.persPron().ucf() enjoys $user.possPron() imagination and the exciting places it takes $user.possPron().'
    ],
    meta: ['People like $user.name.ucf(), who score low on this trait, are generally traditional and prefer the familiar over the unusual.', 'People like $user.name.ucf(), who score high on this trait, are intellectually curious, sensitive to beauty, and unconventional.']
  },

  conscientiousness: {
    text: [
      '$user.name.ucf() $user.toBe() is impulsive and whimsical. $user.persPron().ucf() would say that sometimes decisions need to be made quickly, and that $user.persPron() makes them quicker than most. $user.persPron().ucf() would say $user.persPron() $user.toBe() zany, colourful, and just generally great fun to be with... as long as someone isn’t relying on $user.objPron() to get work done.',
      '$user.name.ucf() $user.toBe() spontaneous and fun. $user.persPron().ucf() likes to do unexpected things that make life that bit more interesting. $user.persPron().ucf() $user.toBe()n’t completely unreliable, but $user.persPron()’ve been known to slip up on occasion.',
      '$user.name.ucf() $user.toBe() random and fun to be around. But $user.persPron() can plan and persist when life requires it. Depending on the situation, $user.persPron() can make quick decisions or deliberate for longer if necessary.',
      '$user.name.ucf() avoids foreseeable trouble through planning. And $user.persPron() achieves success through persistence. $user.persPron().ucf() $user.toBe() reliable and prepared for life’s challenges.',
      '$user.name.ucf() $user.toBe() a perfectionist. $user.persPron().ucf() likes to plan everything down to the last detail. This has consequently led to $user.possPron() being very successful and extremely reliable. $user.persPron().ucf() particularly enjoys seeing $user.possPron() long-term plans come to fruition.'
    ],
    meta: ['People like $user.name.ucf(), who score low on this trait, are generally characterized as spontaneous and impulsive.', 'People like $user.name.ucf(), who score high on this trait, can be described as organized, reliable, and efficient.']
  },

  extraversion: {
    text: [
      '$user.name.ucf() $user.toBe() quiet and somewhat withdrawn. $user.persPron().ucf() is someone who doesn’t need lots of other people around to have fun, and sometimes finds people tiring.',
      '$user.name.ucf() prefers low-key social occasions. It’s not that $user.persPron() $user.toBe() afraid of large parties, but $user.persPron() prefers those with just a few friends.',
      '$user.name.ucf() enjoys social occasions. But $user.persPron() doesn\'t depend on then for her enjoyment. $user.name.ucf() often likes to step back and have a quiet night in.',
      '$user.name.ucf() $user.toBe() energetic and active. $user.persPron().ucf() is someone who enjoys and actively seeks out social occasions, and especially enjoys talking with large groups of people.',
      '$user.name.ucf() $user.toBe() constantly exuberant and active. $user.persPron().ucf() is someone who aims to be the center of attention at social occasions. $user.persPron().ucf() takes charge in groups, and usually says "Yes" to challenges.'
    ],
    meta: ['People like $user.name.ucf(), who score low on this trait, tend to be shy, reserved and most comfortable alone.', 'People like $user.name.ucf(), who score high on this trait, can be described as energetic, talkative and sociable.']
  },

  agreeableness: {
    text: [
      '$user.name.ucf() $user.toBe() willing to make (tough|difficult) decisions. $user.persPron().ucf() will point out when something $user.toBe() wrong, no matter what other people might feel. (One|You) might say that $user.persPron() is tough and uncompromising.',
      '$user.name.ucf() can have trouble meeting new people. This is because $user.persPron() can be suspicious of their motives. Over time though, people warm to $user.possPron(), and $user.persPron() to them, although that doesn’t stop $user.possPron() from telling them "how it $user.toBe()".',
      '$user.name.ucf() gets along with people well. This is especially true once they prove themselves trustworthy to $user.persPron(). $user.persPron().ucf() does have a healthy scepticism about others’ motives, but that doesn’t stop $user.persPron() from considering others to be basically honest and decent.',
      '$user.name.ucf() is someone people get along with. $user.persPron().ucf() $user.toBe() considerate and friendly, and expect others to be honest and decent.',
      '$user.name.ucf() $user.toBe() very easy to get along with. $user.persPron().ucf() $user.toBe() considerate, friendly, generous and helpful. And $user.persPron() considers others to be decent and trustworthy.'
    ],
    meta: ['People like $user.name.ucf(), who score low on this trait, tend to be more driven, self-confident and competitive.', 'People like $user.name.ucf(), who score high on this trait, are generally considered soft-hearted, generous, and sympathetic.']
  },

  neuroticism: {
    text: [
      '$user.name.ucf() $user.toBe() extremely hard to upset. $user.persPron().ucf() will rarely, if ever, react with negative emotions. Even when $user.persPron() $user.toBe() anxious about something, the feeling quickly passes. Thus $user.name.ucf() comes across as calm and resilient.',
      '$user.name.ucf() $user.toBe() calm and emotionally stable. $user.persPron().ucf() comes across as someone who $user.toBe() rarely bothered by things. When something does get $user.persPron() down, the feeling does not persist for long.',
      '$user.name.ucf() $user.toBe() generally calm. $user.persPron().ucf() can feel emotional or stressed out occasionally, but only when warranted by the situation.',
      '$user.name.ucf() is more self-conscious than most. $user.persPron().ucf() finds it hard to not get caught up in anxious or stressful situations. Yet $user.persPron().ucf() $user.toBe() in touch with $user.possPron() own feelings.',
      '$user.name.ucf() reacts poorly to stressful situations. Thus $user.persPron() worries about them more than most. However $user.persPron() has an emotional depth that others often lack.'
    ],
    meta: ['People like $user.name.ucf(), who score low on this trait, often show an unusual emotional depth.', 'People like $user.name.ucf(), who score high on this trait, generally worry more than most, and react poorly to stressful situations.']
  }
};
