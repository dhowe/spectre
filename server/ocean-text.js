let openness = {
  desc: 'Openness to experience relates to our imagination and the degree to which we are comfortable with unfamiliarity',
  meta: 'People scoring high on this trait can be described as intellectually curious, sensitive to beauty, and unconventional, while people scoring low on this trait can be characterized as traditional and are more likely to prefer the familiar over the unusual.',
  text: [
    '$user.name.ucf() $user.toBe() down-to-earth and prefers things to be simple and straightforward. (One|You) might say $user.pronoun() finds life easier if things don’t change unnecessarily, that the arts are of little practical use to $user.poss(), and that $user.pronoun() thinks tradition $user.toBe() more important than others do.',
    '$user.name.ucf() dislikes needless complexity, and prefers the familiar over the unusual. (One|You) might say that $user.pronoun() is more conservative than many, and that $user.pronoun() values practical outcomes over flighty imagination.',
    '$user.name.ucf() $user.toBe() aware of $user.poss() feelings but doesn’t get carried away with $user.poss() imagination. (One|You) might say that $user.pronoun() embraces change when it $user.toBe() necessary while still resisting it when $user.pronoun() thinks otherwise, and that beauty $user.toBe() important to $user.pronoun(), but it’s not everything.',
    '$user.name.ucf() $user.toBe() intellectually curious and appreciative of what $user.pronoun() considers beautiful, no matter what others think. (One|You) might say that $user.poss() imagination $user.toBe() vivid and makes $user.poss() more creative than many others.',
    '$user.name.ucf() $user.toBe() far more intellectually curious and sensitive to beauty than most. (One|You) might say that $user.poss() beliefs are individualistic and frequently drift towards the unconventional, and that $user.pronoun() enjoys $user.poss() imagination and the exciting places it takes $user.poss().'
  ]
}

let conscientiousness = {
  desc: 'Conscientiousness concerns the way in which we control, regulate, and direct our impulses.',
  meta: 'People scoring high on this trait can be described as organized, reliable, and efficient, while people scoring low on this trait are generally characterized as spontaneous and impulsive.',
  text: [
    '$user.name.ucf() $user.toBe() impulsive and whimsical, and fine with it! $user.pronoun().ucf() would say that sometimes decisions need to be made quickly, and that $user.pronoun() make them quicker than most! $user.pronoun() would say $user.pronoun() $user.toBe() zany, colourful, and just generally great fun to be with... as long as someone isn’t relying on $user.pronoun() to get some work done.',
    '$user.name.ucf() $user.toBe() spontaneous and fun. $user.pronoun().ucf() like to do unexpected things that make life that bit more interesting. (One|You) might say that $user.pronoun() $user.toBe()n’t completely unreliable, but $user.pronoun()’ve been known to slip up on occasion.',
    '$user.name.ucf() $user.toBe() random and fun to be around but $user.pronoun() can plan and persist when life requires it. From $user.poss() responses it appears that depending on the situation, $user.pronoun() can make quick decisions or deliberate for longer if necessary.',
    '$user.name.ucf() avoids foreseeable trouble through purposeful planning and achieves success through persistence. From $user.poss() responses it appears that $user.pronoun() $user.toBe() reliable and prepared for life’s challenges.',
    '$user.name.ucf() $user.toBe() a perfectionist. From $user.poss() responses it appears that $user.pronoun() prefer to plan everything to the last detail, which has consequently led to $user.pronoun() being very successful and extremely reliable. From $user.poss() responses it appears that more than most $user.pronoun() enjoys seeing $user.poss() long-term plans come to fruition.'
  ]
}

let extraversion = {
  desc: 'Extraversion refers to the extent to which people get their energy from the company of others, and whether they actively seek excitement and stimulation',
  meta: 'People scoring high on this trait can be described as energetic, talkative and sociable, while people scoring low on this trait tend to be more shy, reserved and comfortable in their own company.',
  text: [
    '$user.name.ucf() $user.toBe() quiet and somewhat withdrawn. $user.poss() answers describe $user.pronoun() as someone who doesn’t need lots of other people around to have fun, and can sometimes find that people are tiring.',
    '$user.name.ucf() prefers low-key social occasions, with a few close friends. (One|You) might say that it’s not that $user.pronoun() $user.toBe() afraid of large parties; they&#39;re just not that fun for $user.poss().',
    '$user.name.ucf() enjoys and actively seeks out social occasions, but would say that they’re not everything. (One|You) might say that sometimes it $user.toBe() nice to step back for a while and have a quiet night in.',
    '$user.name.ucf() $user.toBe() energetic and active. $user.poss() answers describe $user.pronoun() as someone who enjoys and actively seeks out social occasions, and that $user.pronoun() especially enjoys talking with a big group of people.',
    '$user.name.ucf() $user.toBe() constantly energetic, exuberant and active. $user.poss() answers describe $user.pronoun() as someone who aims to be the centre of attention at social occasions, asserts yourself when in groups, and usually says, "Yes!"'
  ]
}

let agreeableness = {
  desc: 'Agreeableness reflects individual differences concerning cooperation and social harmony.',
  meta: 'People scoring high on this trait are generally considered soft-hearted, generous, and sympathetic, while people scoring low on this trait tend to be more driven, self-confident and competitive.',
  text: [
    '$user.name.ucf() $user.toBe() willing to make difficult decisions when necessary, and will point out when something $user.toBe() wrong no matter what other people might feel. $user.poss().ucf() responses suggest that $user.pronoun() would say that $user.pronoun() can be tough and uncompromising.',
    '$user.name.ucf() people can find difficult to get along with when $user.pronoun() first meet, as $user.pronoun() can be suspicious of their motives. $user.poss() responses suggest that over time though people warm to $user.pronoun(), and $user.pronoun() to them, although that doesn’t stop $user.pronoun() telling them "how it $user.toBe()".',
    '$user.name.ucf() gets along with people well, especially once they have proved themselves trustworthy to $user.pronoun(). $user.poss() responses suggest that $user.pronoun() do have a healthy scepticism about others’ motives, but that doesn’t stop $user.pronoun() from considering others to be basically honest and decent.',
    '$user.name.ucf() is someone people get along with easily. $user.poss() $user.toBe() considerate and friendly, and expect others to be generally honest and decent.',
    '$user.name.ucf() $user.toBe() extremely easy to get along with. $user.poss() $user.toBe() considerate, friendly, generous and helpful and $user.pronoun() considers most others to be decent and trustworthy.'
  ]
}

let neuroticism = {
  desc: 'Neuroticism refers to the tendency to experience negative emotions.',
  meta: 'People scoring high on this trait generally worry more than most, and react poorly to stressful situations. However, they often show an emotional depth that others lack.',
  text: [
    '$user.name.ucf() $user.toBe() extremely difficult to upset or stress out, since $user.pronoun() rarely, if ever, react with negative emotions, and even when $user.pronoun() $user.toBe() anxious about something the feeling quickly passes. Based on $user.poss() responses, $user.pronoun() come across as very calm and resilient.',
    '$user.name.ucf() $user.toBe() calm and emotionally stable. Based on $user.poss() responses, $user.pronoun() come across as someone who $user.toBe() rarely bothered by things, and when they do get $user.pronoun() down the feeling does not persist for very long.',
    '$user.name.ucf() $user.toBe() generally calm. Based on $user.poss() responses, $user.pronoun() come across as someone who can feel emotional or stressed out by some experiences, however $user.poss() feelings tend to be warranted by the situation.',
    '$user.name.ucf() tends to be more self-conscious than many. Based on $user.poss() responses, $user.pronoun() come across as someone who can find it hard to not get caught up by anxious or stressful situations. (One|You) might say that $user.pronoun() $user.toBe() in touch with $user.poss() own feelings.',
    '$user.name.ucf() reacts poorly to stressful situations, and consequently worries more than most about them. However, $user.pronoun() $user.toBe() someone that has an emotional depth that others lack.'
  ]
}

module.exports = {
  openness: openness,
  conscientiousness: conscientiousness,
  extraversion: extraversion,
  agreeableness: agreeableness,
  neuroticism: neuroticism,
}
