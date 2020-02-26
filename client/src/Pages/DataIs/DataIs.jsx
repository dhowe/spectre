import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
//import Keyboardist from 'react-keyboardist';

const styles_landscape = {}, styles_portrait = {};

class DataIs extends React.Component {

  constructor(props) {
    super(props, '/personalised');
    this.countdown = React.createRef();
    this.state = { virtue: '', virtueAdverb: '', nextPage: '/personalised' };
  }

  async componentDidMount() {

    const user = await UserSession.ensure(this.context, ['virtue', 'hasImage']);
    if (user.virtue !== this.context.virtue) throw Error("\n"+user+"\n"+this.context);

    let nextPage = this.state.nextPage;
    if (!user.hasImage) { // MOVE TO personalized?
      nextPage = '/selfie';
      console.log('[DATAIS] No webcam image found for ' + user._id);
    }
    this.setState({
      virtue: user.virtue,
      virtueAdverb: user.virtueAsAdverb(),
      nextPage: nextPage
    });
  }

  render() {
    const { virtue, virtueAdverb } = this.state;
    return (

      <div className={this.props.root}>
        { // <Keyboardist bindings={{
          //   Right: () => {
          //     console.log('RIGHT');
          //     this.context.goto(this.props, this.state.nextPage)}
          //     return false;
          //   }}} />
        }
        <SpectreHeader colour="white" />
        <div className={`${this.props.content} content`}>
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <h1 className="addSpacing">Data is {virtue}</h1>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '1200ms' }}>
            <p className="normal">To become more <span>{virtueAdverb} </span>you need&nbsp;more&nbsp;data</p>
          </Fade>
          <br/>
          <Fade in={true} style={{ transitionDelay: '2000ms' }}>
            <p className="normal-nextline">We can help you believe in the {virtue}&nbsp;of&nbsp;Dataism.</p>
          </Fade>
          <Countdown
            ref={e => this.countdown = e}
            onComplete={() => this.context.goto(this.props, this.state.nextPage)}
            date={Date.now() + 5000}
            renderer={() => null}
          />
        </div>
        <FooterLogo />
      </div>
    );
  }
}

DataIs.propTypes = {
  classes: PropTypes.object.isRequired,
};
DataIs.contextType = UserSession;

export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(DataIs);
