import React from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SpectreHeader from '../Components/SpectreHeader/SpectreHeader';
import UserSession from '../Components/UserSession/UserSession';
import AvatarComponent from '../Components/AvatarComponent/AvatarComponent';
import OceanProfile from '../Components/OceanProfile/OceanProfile';

import PrivacyImage from './images/spectre-privacy.png';

// import QuantImage from './images/quant-privacy.png';
// import FaceSearchImage from './images/face-search.png';
// import GamingImage from './images/Gaming.jpg';
// import AIImage from './images/artificial-intelligence.jpg';

import BiasImage from './images/Spectre-biases.png';
import PersonalizationImage from './images/Spectre-personalization.png';
import GamificationImage from './images/Spectre-gamification.png';

import FacebookImage from './images/facebook-ad.jpg';
import StatsImage from './images/stats.jpg';
import RumorsImage from './images/Rumors.jpg';
import BreakoutImage from './images/breakout.png';
//import OceanProfileImage from './images/OCEAN-profile.jpg';
//import AvatarImage from './images/spectre-profile.png';
import SpectreVideo from './images/spectre-video.jpg';

import Funding1 from './images/arts-council-art-culture.png';
import Funding2 from './images/doc-fest.png';
import Funding3 from './images/arts-council-england.png';
import Funding4 from './images/british-council.png';

import Cat1 from './images/cat1.jpg';
import Cat2 from './images/cat2.jpg';
import Cat3 from './images/cat3.jpg';
import Cat4 from './images/cat4.jpg';
import Cat5 from './images/cat5.jpg';
import Cat7 from './images/cat7.jpg';

import './style.css';
import './bootstrap.min.css';

const styles = {};

class PostExp extends React.Component {
  constructor(props) {
    super(props, '/post-experience');
    this.state = { target: UserSession.oceanData() };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context,
      ['name', 'target', 'traits']);
    this.setState({ target: UserSession.oceanData(user) });
  }

  render() {
    const { target } = this.state;

    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className="PostExp">
        <SpectreHeader colour="white" />
        <section className="intro">
          <div className="container">
            <div className="row">
              <div className="col-xs-10 col-xs-push-1 col-md-6">
                <h1>Welcome to the Altar of dataism. </h1>
                <p>As a reward for being a loyal follower, {target.name}, we can now reveal to you the secrets of Silicon Valley.</p>
                <p>In an age of misinformation and fake news enabled by large social media platforms, tech giants are using your personal data to predict and influence your behaviors--both online and in the voting booth. </p>
              </div>
              <div className="col-xs-10 col-xs-push-1 col-md-5">
                {/*<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/395969657?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>*/
                //
                // CHANGE TO VIDEO
                }
                <img src={SpectreVideo} alt="Spectre dark pattern" title="Spectre dark pattern" className="img-responsive full-width" />
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <main>
            <section id="section-1">
              <div className="row bg-1">
                <ContentCol>
                  <h1>Terms of service</h1>
                  <p>Be honest, did you really read the full Terms of Service agreement and privacy ‘policy’? Did you realize that you had granted Spectre the rights to take photos and videos of you and to use them without restriction? Don’t worry if not, you are in the majority. Spectre takes privacy seriously as it can be very bad for business. If it is easy and uncomplicated for you to setup strong privacy controls, we get less of your data. So we use ‘dark design’ to influence your choice when considering privacy settings and especially when signing up to Terms of Service agreements.</p>
                  <p><q>"Small design changes, like a few extra pixels of padding or the tint of a button, can have large and unexpected repercussions."</q></p>
                  <img src={PrivacyImage} alt="Spectre dark patterns" title="Spectre Dark Patterns" className="img-responsive image-1 visible-xs visible-sm" />
                  <p>The design of the user experience of digital technologies can have significant effects on the way we share data or interact with platforms, websites, commercial advertisers and political campaigners. </p>
                  <p><strong>Dark Design Patterns or Dark UX (user experience)</strong>, these design tricks are based on human psychology that are used to provoke or manipulate people into signing up for something, buying something, or giving away more personal information than they thought or intended. You’ve probably seen the “in high demand” or “only X amount left at this price” notices when shopping for things online. Or think about how "accepting tracking cookies" is far easier than going through numerous menus and sub-menus to opt out. Social media sites and apps use the infinite scroll and auto-play functions to nudge you into continuous engagement. </p>
                  <img src={Cat1} alt="Privacy dark pattern" title="Privacy dark pattern" className="img-responsive image-2 visible-xs visible-sm" />
                  <p>Political campaigns are know for using the same methods: seemingly innocent voter surveys on political issues to collect names, email addresses, phone numbers and other contact details for their voter databases. These are only a few examples of how apparently benign design choices can knowingly manipulate users. </p>
                  <p><strong>Further Reading:</strong></p>
                  <ul>
                    <li><a href="https://datadetoxkit.org/en/wellbeing/darkpatterns">Data detox - dark patterns</a></li>
                    <li><a href="https://www.darkpatterns.org/">Dark patterns.org</a></li>
                    <li><a href="https://twitter.com/darkpatterns">Twitter - dark patterns</a></li>
                    <li><a href="https://techcrunch.com/2018/07/01/wtf-is-dark-pattern-design/">WTF is dark pattern design?</a></li>
                    <li><a href="https://www.theguardian.com/us-news/2020/jan/28/donald-trump-facebook-ad-campaign-2020-election">Donald Trump Facebook ad campaign 2020 election</a></li>
                  </ul>
                </ContentCol>
                <div className="col-md-7 col-md-pull-5  image-col hidden-xs hidden-sm">
                  <img src={PrivacyImage} alt="Spectre dark pattern" title="Spectre dark pattern" className="img-responsive image-1" />
                  <img src={Cat1} alt="Privacy dark pattern" title="Privacy dark pattern" className="img-responsive image-2" />
                </div>
              </div>

            </section>
            <section id="section-2">
              <div className="row bg-2">
                <ContentCol>
                  <h1>Biometric data</h1>
                  {
                    <div className="img-responsive user-profile no-shadow visible-xs visible-sm"><AvatarComponent target={target} /></div>
                    //<img src={AvatarImage} alt="User profile picture" title="User profile picture" className="img-responsive user-profile no-shadow visible-xs visible-sm"/>
                  }
                  <p>Selfies are a defining feature of the digital age, but we usually don’t think about the data that can be extracted from them. Beyond just the time, date, location and your appearance, there is a wider data-set that can be gained from selfies that you upload: this is called a faceprint. The distances between your eyes, the width of your nose, the depth of your eye sockets, the shape of your cheekbones, and the length of your jaw line are all nodes that create your unique faceprint.</p>
                  <p><strong>Faceprints can be created from your selfies</strong> but also out of other photographs or video footage, such as videos posted online or CCTV recordings. Law enforcement, border control, and security agencies are interested in faceprint data for identification and verification. But so too are the advertising industry, political influencers, commercial businesses, and others.</p>
                  <p>What if relatively harmless applications of faceprints are also used to improve ways of monitoring your behavior, like where you go, when, and with whom? What if it can determine other characteristics about you, like what you think, your mood, IQ, and political or sexual orientations? Or what about when it’s used to fake a scene in an image or video that you were never part of?</p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://theglassroom.org/object/adam_harvey-mega_pixels">Face Search</a></li>
                    <li><a href="https://megapixels.cc">The ethics of facial recognition</a></li>
                    <li><a href="https://www.reuters.com/article/us-china-health-surveillance-idUSKBN2011HO">China's surveillance state</a></li>
                  </ul>
                </ContentCol>
                <div className="col-md-7 col-md-pull-5 image-col text-right hidden-xs hidden-sm">
                  {
                    <div className="img-responsive image-1 no-shadow user-profile"><AvatarComponent target={target} /></div>
                    //<img src={AvatarImage} alt="User profile picture" title="User profile picture" className="img-responsive image-1 no-shadow user-profile"/>
                  }
                  <img src={Cat2} alt="Facial analysis data" title="Facial analysis data" className="img-responsive" />
                </div>
              </div>
            </section>
            <section id="section-3">
              <div className="row bg-3">
                <ContentCol>
                  <h1>Algorithmic bias</h1>
                  <p>Did it feel uncomfortable to infer the characteristics of another follower? Someone you have never met before. Were you judging someone you could see who was worshipping at the altar of dataism at the same time as you? When did you realize someone else was probably judging you at that same moment?
                  </p>
                  <p>
                    Today, automated systems are making inferences about you and billions of people every second of every day with no human oversight or intervention.
                  </p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center"><img src={BiasImage} alt="Algrythmic biases" title="Algrythmic biases" className="img-responsive full-width pull-right" /></div>
                </div>
              </div>
              <div className="row bg-m">
                <ContentCol>
                  <p>
                    When Google Photos was released in 2015, its image recognition system <a href="https://www.wired.com/story/when-it-comes-to-gorillas-google-photos-remains-blind/"> labeled black people as gorillas</a>. In 2016, researchers discovered that LinkedIn searches recommended male names, so when users searched for someone named “Andrea”, they’d be ask if they meant “Andrew”, but not the other way around. PredPol, a popular predictive policing software used by over 50 police departments in the US, has been accused of perpetuating racist practices.</p>
                  <p>
                    <strong>How do the technologies around us end up this way?</strong> Unfortunately, it’s not a matter of simply the fault of the software developer or data scientist; the problem is much deeper. In the case of the Google Photos fiasco, Google’s image-classification system worked by using a large volume of training data. This training data, for example, contained thousands of photos of dogs, helping the system understand what a dog looks like, so when a user uploads a photo of her dog, the image will recognize it as such. The problem was that the training data included plenty of white faces but excluded a sufficient number of black faces, causing the system to mis-classify images of black people. In fact, researchers have discovered that several common facial recognition technologies work best on white men, then slightly less accurately for white women , even worse for black men, and worst of all on black women. </p>
                  <div className="text-center"><img src={Cat3} alt="Spectre artificial intelligence" title="Spectre artificial intelligence" className="img-responsive full-width visible-xs visible-sm" /></div>
                  <p>
                    <strong>Biased algorithms</strong> feed exclusionary and discriminatory practices, and they spread quickly and at scale. The result of biased algorithms can manifest themselves in any number of places in which algorithms are being used today: in determining eligibility for a loan, in determining the length of someone’s prison sentence, and in evaluating whether or not to hire someone for a job. How might algorithmic bias be affecting your life? Would you even know about it, when it’s baked so deeply into a particular system?
                        </p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href=" https://www.ted.com/talks/cathy_o_neil_the_era_of_blind_faith_in_big_data_must_end">Blind faith in big data</a></li>
                    <li><a href="https://www.newscientist.com/article/2166207-discriminating-algorithms-5-times-ai-showed-prejudice/">Discriminating algorithms</a></li>
                    <li><a href="https://www.wired.com/story/the-real-reason-tech-struggles-with-algorithmic-bias/">Algorithmic bias</a></li>
                    <li><a href="https://www.technologyreview.com/s/608248/biased-algorithms-are-everywhere-and-no-one-seems-to-care/">Biased algorithms are everywhere</a></li>
                  </ul>
                </ContentCol>
                <div className="col-md-7 col-md-pull-5 image-col hidden-xs hidden-sm">
                  <img src={Cat3} alt="Spectre artificial intelligence" title="Spectre artificial intelligence" width="500px" className="img-responsive image-2" />
                </div>
              </div>
            </section>

            <section id="section-4">
              <div className="row bg-4">
                <ContentCol>
                  <h1>Personalization</h1>
                  <p>Specter wants to personalize your experience because it opens the door to the extraction and renditioning of your personal data, most of which can be incredibly revealing. We use your name, sound like your friend because deep down we need your behavioral profile. </p>
                  <p><q>"Nearly every product or service that begins with the word “smart” or “personalised” ... is simply a supply-chain interface for the unobstructed flow of behavioural data on its way to predicting our futures in a surveillance economy." -Zuboff</q></p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center"><img src={PersonalizationImage} alt="Personalization" title="Personalization" className="img-responsive full-width pull-right" /></div>
                </div>
              </div>
              <div className="row">
                <ContentCol>
                  <p>When you search for something online, you are indirectly expressing a curiosity, an interest, or a need. Advertisers have figured this out, and used this insight to personalize our experiences on the Internet. The fact that we all see different news recommendations and different advertisements when we search online is because the information we are fed has been personalized to meet advertisers’ or campaigners’ ideas of what is most relevant to us. In this sense, the Internet we experience has been customized to each of us individually. The scope of this personalization even informs the ads delivered to our Internet-connected Smart TVs, political profiles amassed by campaigns, the texts and robocalls we may or may not receive, and sometimes even the snail mail that arrives in our physical mailboxes. </p>
                  <p>
                    How does this work? Technologies like cookies, browser pixels, and browser fingerprints attempt to capture our behaviors online. By tracking your visit from the ESPN website to a travel blog, an advertiser might infer that you are interested in sports and travel. Visiting websites related to floral centerpieces and gowns might lead an advertiser to conclude that you are part of an upcoming wedding. This sort of behavioral profiling extends to other domains as well. If you are using an online dating service and spend more time on profiles of people with tattoos or people of a certain racial background, the dating service may infer these underlying preferences and feed you such profiles to maximize your time using the service.</p>
                  <p>
                    How do we feel about our behavior being profiled online so companies can maximize the time we spend clicking, browsing, or shopping?</p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/third-party-tracking">Third party tracking</a></li>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/robocalls-texting">Robo calls and texting</a></li>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/addressable-tv">Your TV viewing habits as political assets</a></li>
                    <li><a href="https://theprivacyissue.com/data-tracking/big-business-ad-tech">Ad tech is big business</a></li>
                  </ul>
                </ContentCol>
                  {/*<div className="col-md-7 col-md-pull-5 image-col">
                    <div className="recommend-box">
                    <h2>Recommendations</h2>
                    <p><strong>Cookie Self-Defense</strong></p>
                    <ul>
                      <li className="one">Force cookies to self-destruct after you close each tab with the <a href="https://github.com/Cookie-AutoDelete/Cookie-AutoDelete">Cookie-AutoDelete extension</a>.</li>
                      <li className="two">Install the EFF's <a href="https://www.eff.org/privacybadger">Privacy Badger</a>, a browser extension that blocks a variety of cookie tracking methods.</li>
                      <li className="three">Regularly delete cookies and <a href="https://www.lifewire.com/how-to-clear-cache-2617980">clear your browser cache.</a></li>
                    </ul>
                  </div></div>
                  */}
                  <div className="col-md-7 col-md-pull-5  image-col hidden-xs hidden-sm">
                    <a href="https://www.forbes.com/sites/kashmirhill/2012/02/16/how-target-figured-out-a-teen-girl-was-pregnant-before-her-father-did">
                      <img src={Cat4} alt="Gamification" title="Gamification" className="img-responsive image-2" />
                    </a>
                  </div>
              </div>
            </section>

            <section id="section-5">
              <div className="row bg-5">
                <ContentCol>
                  <h1>Gamification</h1>
                  <p>Spectre uses single task design philosophy , timed elements, progress bar and instant rewards mixed with a series of escalating moral dilemmas to keep you clicking so your personal data keeps flowing.</p>
                  <p>Apps aren’t just for music and ride-sharing anymore; increasingly, they are becoming tools for companies and political campaigns to raise money and win votes. One strategy that apps commonly employ to boost engagement and feed addiction is gamification. Gamification is the process by which the user experience is turned into a game.</p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center"><img src={GamificationImage} alt="Gamification" title="Gamification" className="img-responsive full-width pull-right" /></div>
                </div>
              </div>
              <div className="row">
                <ContentCol>
                  <p>In the political world, many prominent political campaigns (including the official Brexit app and Donald Trump’s 2016 campaign apps) used gamification to encourage users to spend more time on the app and, in the process, collect more data. App creators have spoken openly about the rich, personal data their apps collect: names, email addresses, address book contacts, political views, and more.</p>
                  <p>Users are motivated to accumulate points within the app by completing actions suggested by the campaign – like completing surveys, checking into a rally, or calling their representative about an issue as instructed by the app. Users with enough points can unlock badges, which feed a system of popularity within the apps. One review of one such political gamified app stated, “I’ve officially hit leader status. Wow! Hooked. As bad as a game! #addictionisbad #helpme...”</p>
                  <div className="text-center"><img src={Cat5} alt="Gamification" title="Gamification" className="img-responsive full-width visible-xs visible-sm" /></div>
                  <p>How do you feel about the fact that campaign apps used to promote political agendas are engineered to be addictive and gamified? Do you really think you like Facebook just because it ‘connects you’?</p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/campaign-apps">Campaigning apps</a></li>
                    <li><a href=" https://www.fastcompany.com/90260703/the-dark-side-of-gamifying-work">The dark side of gamifiying work</a></li>
                  </ul>

                </ContentCol>
                <div className="col-md-7 col-md-pull-5  image-col hidden-xs hidden-sm">
                  <img src={Cat5} alt="Gamification" title="Gamification" className="img-responsive image-2" />
                </div>
              </div>
            </section>

            <section id="section-6">
              <div className="row bg-6">
                <ContentCol>
                  <h1>OCEAN Profiling</h1>
                  <p>Spectre utilizes a game consisting of famous and popular brands that are actually pre-weighted Facebook data sets. These data sets have been specifically selected to allow for a comparison with your score against 1 million + personality profile surveys conducted by the Psychometric Centre at Cambridge University. This analysis is conducted on your game score in milliseconds and creates a much more rounded OCEAN personality profile. </p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center">
                    {
                      <div className="full-width pull-right OceanProfileWrapper">
                        <OceanProfile target={target} />
                      </div>
                      //<img src={OceanProfileImage} alt="Ocean Profile" title="Ocean Profile" className="img-responsive full-width pull-right" />
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <ContentCol>
                  <div className="pull-quote"><q>This is 1984 meets the 21st century.</q></div>
                  <p>'OCEAN' stands for the set of traits (Openness, Contentiousness, Extroversion, Agreeableness, and Neuroticism) used by researchers to ‘measure' human personality, a process known as psychometric profiling. Insights into your personality can help marketers and political strategists promote their products or agendas. For example, individuals high in contentiousness tend to be efficient, organized, obedient, and disciplined, so advertisements that appeal to their sense of organization, competence, and respect for authority are believed to be effective on them. By appealing to these underlying traits, psychometrically-informed ads are thought to have the potential to be more persuasive than standard ads. </p>
                  <p>
                    Cambridge Analytica claimed to have profiled “the personality of every single adult in the United States of America,” as Alexander Nix, former CEO of the firm explained.
                        </p>
                  <div className="youtube-player">
                    <YouTube
                      videoId="n8Dd5aVXLCc"
                      opts={opts}
                      onReady={this._onReady}
                    /></div>

                  <p>While the company has since dissolved after journalists revealed it had improperly gained access to voters’ data, commercial and political actors still routinely use psychometric tools to market their products, whether run-of-the-mill goods and services or political candidates. </p>
                  <p className="red">errors in OCEAN infernences- add short sentence here.</p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/psychometric-profiling">Psychometric profiling</a></li>
                    <li><a href="https://qz.com/1666776/data-firm-ideia-uses-cambridge-analytica-methods-to-target-voters/">How data firms target voters</a></li>
                    <li><a href="https://www.youtube.com/watch?v=NesTWiKfpD0">The end of privacy</a></li>
                  </ul>

                </ContentCol>
              </div>
            </section>

            <section id="section-7">
              <div className="row bg-7">
                <ContentCol>
                  <h1>Micro targeting</h1>
                  <p>Specter works with behavioral psychologists at Psychometric Centre, Cambridge University, to create 40 different combinations of image and slogans for creating targeted Facebook ads. The Dark ad choice of ad could also be used to influence you… as you have similar ocean traits.</p>
                  <p>
                    Currently Facebook enables these techniques for targeted misinformation campaigns at scale, the difference being they have personality profiles for billions of people that corporate or political actors can buy easy access too.</p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center"><img src={FacebookImage} alt="Facebook ad" title="Facebook ad" className="img-responsive full-width pull-right" /></div>
                </div>
              </div>
              <div className="row">
                <ContentCol>
                  <p>
                    Social media platforms have access to all kinds of potentially useful data about voters, and this makes them great places for political campaigns to advertise. Political campaigns can use Facebook, Instagram, YouTube, Google Search, and Snapchat to target you with specific ads based on categories like your age, location, and gender. But they can also use very specific information such as what kind of content you engage with on their platforms, including what you ‘Like’ or comment on.* As the important details of micro-targeting are the business secrets of the individual platforms, we simply do not know enough about all of the factors that go into how users are selected for such finely segmented groups and then micro-targeted with ads.</p>
                  <p>
                    What we do know is that social media platforms offer special services specifically for political campaigns. Both Facebook and Google allow political campaigns to upload their voter contact lists to the platforms so they can send targeted ads just to the people on those lists. On top of that, it is also possible to target people with “similar profiles” to the voters on their lists. In politics alone, many thousands of ads are being delivered to an unknowable amount of segmented, micro-targeted lists, making it almost impossible to gain a full picture of how far microtargeting extends.</p>
                  <div className="text-center"><a href="https://www.anotheracronym.org/newsletter/fwiw-outside-influence/"><img src={StatsImage} alt="social media political spend" title="social media political spend" className="img-responsive full-width visible-xs visible-sm" /></a></div>
                  <p>
                    At the time of writing, the remaining eight candidates for the Democratic Party nomination as well as incumbent President Trump have spent over $190M on Facebook and Google alone, with the Trump campaign running over 480,000 different ads during the campaign until now.</p>
                  <p>
                    <strong>*Note:</strong> As of November 2019, many companies, including Facebook, Twitter, and Google, are revising (or reportedly considering revising) their policies toward political advertisements on their platforms.
                        </p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/consumer-data">Consumer Data</a></li>
                    <li><a href="https://ourdataourselves.tacticaltech.org/posts/digital-listening">Digital Listening</a></li>
                    <li><a href="https://ad.watch/">Ad Watch</a></li>
                    <li><a href="https://www.anotheracronym.org/fwiw-2020-dashboard/">Social media political spending trends</a></li>
                  </ul>

                </ContentCol>
                <div className="col-md-7 col-md-pull-5  image-col hidden-xs hidden-sm">
                  <a href="https://www.anotheracronym.org/newsletter/fwiw-outside-influence/"><img src={Cat7} alt="social media political spend" title="social media political spend" className="img-responsive image-2" /></a>
                </div>
              </div>

            </section>

            <section id="section-8">
              <div className="row bg-8">
                <ContentCol>
                  <h1>Synthesized video</h1>
                  <p>Spectre is the world’s first installation to embed synthesized ‘deep fake’ content into narrative story telling. If you listen carefully to Spectre’s famous followers, there is truth in the deep fake…</p>
                  <p>
                    Synthesized video means video and moving image clips in which elements of its content are purposely manipulated, sometimes using AI and machine learning. The most widely referenced category of synthesized video is the “deepfake”, in which a person in a video, usually their face or their voice, is replaced with that of another. </p>
                </ContentCol>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center kim">
                    <div className="youtube-player">
                      <YouTube
                        videoId="6xVKyBdXUCM"
                        opts={opts}
                        onReady={this._onReady} />
                    </div></div>
                </div>
              </div>
              <div className="row">
                <ContentCol>
                  <p>AI and machine learning techniques have dramatically increased the quality of such manipulations, in some cases making the edits either difficult to spot or appear astoundingly real. While deepfakes can have light-hearted, humorous or benign intentions – replacing the face of a celebrity with that of another in a short clip, for example – they are also frequently used in fake celebrity or revenge pornography. There are also cases where creators of deepfakes have attempted to discredit journalists or politicians.
                     </p>
                  <p>
                    While there is legitimate concern that deepfakes could be used in adversarial politics –such as making a politician say and do things on video that are purposely faked – a more immediate concern remains relatively “low-grade” but effective shallow fakes or cheapfakes. Here, the deception is not based on a sophisticated AI and machine learning approach but is instead replaced with basic false attribution of a video’s source, context or data and time. There are already examples of violence and misinformation having spread from relabeled, re-uploaded, or marginally altered video content.
                     </p>
                  <div className="text-center"><img src={RumorsImage} alt="Rumours and provocation" title="Rumours and provocation" className="img-responsive full-width visible-xs visible-sm" /></div>
                  <p>
                    At the time of writing, the remaining eight candidates for the Democratic Party nomination as well as incumbent President Trump have spent over $190M on Facebook and Google alone, with the Trump campaign running over 480,000 different ads during the campaign until now.</p>
                  <p>
                    <strong>*Note:</strong> As of November 2019, many companies, including Facebook, Twitter, and Google, are revising (or reportedly considering revising) their policies toward political advertisements on their platforms.
                        </p>
                  <strong>Further Reading:</strong>
                  <ul>
                    <li><a href="https://lab.witness.org/projects/synthetic-media-and-deep-fakes/">Synthetic Media and Deepfakes</a></li>
                    <li><a href="https://www.technologyreview.com/s/613033/this-ai-lets-you-deepfake-your-voice-to-speak-like-barack-obama/">Deepfake your voice to speak like Barack Obama</a></li>
                    <li><a href="https://www.nytimes.com/2018/05/22/opinion/india-journalists-slut-shaming-rape.html">In India, Journalists Face Slut-Shaming and Rape Threats</a></li>
                    <li><a href="https://www.buzzfeednews.com/article/pranavdixit/whatsapp-destroyed-village-lynchings-rainpada-india">How WhatsApp Destroyed A Village</a></li>
                  </ul>

                </ContentCol>
                <div className="col-md-7 col-md-pull-5  image-col hidden-xs hidden-sm">
                  <img src={RumorsImage} alt="Rumours and provocation" title="Rumours and provocation" className="img-responsive image-2" />
                </div>
              </div>
            </section>

            <footer>
              <div className="row">
                <div className="col-md-4 col-md-push-8 text-right">
                  <img src={BreakoutImage} alt="" className="breakout no-shadow" />
                </div>
                <div className="col-md-8 col-md-pull-4">
                  <h1>Tactical tech resources</h1>

                  <ul className="noListStyle">
                    <li><strong>Overall gateway to Data & Politics project :</strong></li>
                    <li><a href="https://tacticaltech.org/#/projects/data-politics">https://tacticaltech.org/#/projects/data-politics</a></li>
                    <li><strong>Data & Politics guide/report on digital political campaign tools:</strong></li>
                    <li><a href="http://cdn.ttc.io/s/tacticaltech.org/influence-industry.pdf">s/tacticaltech.org/influence-industry.pdf</a></li>
                    <li><strong>Visual Gallery of companies in the Influence Industry:</strong></li>
                    <li><a href="https://vimeo.com/tacticaltech/influence-industry">https://vimeo.com/tacticaltech/influence-industry</a></li>
                    <li><strong>Easy read Voter Guide to how voter data is used by digital campaigns:</strong></li>
                    <li><a href="https://datadetoxkit.org/en/privacy/voting">https://datadetoxkit.org/en/privacy/voting</a></li>
                    <li><strong>Data Detox Kit:</strong></li>
                    <li><a href="https://datadetoxkit.org/en/home">https://datadetoxkit.org/en/home</a></li>
                  </ul>
                </div>
              </div>
              <div className="row funding">
                <div className="col-sm-12 col-md-12">
                  <h1>Funding partners</h1>
                  <p className="text-center"> <img src={Funding1} alt="arts council arts and cultre" className="partner no-shadow" />
                    <img src={Funding2} alt="sheffield doc fest" className="partner no-shadow" />
                    <img src={Funding3} alt="arts council" className="partner no-shadow" />
                    <img src={Funding4} alt="British Council" className="partner no-shadow" /></p>
                </div>
              </div>
            </footer>

          </main>
        </div >
      </div >
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

class ContentCol extends React.Component {
  render() {
    return (
      <div className="col-xs-10 col-xs-push-1 col-sm-8 col-sm-push-2 col-md-5 col-md-push-7">
        {this.props.children}
      </div>)
  }
}

PostExp.propTypes = {
  classes: PropTypes.object.isRequired,
};
PostExp.contextType = UserSession;

export default withStyles(styles)(PostExp);
