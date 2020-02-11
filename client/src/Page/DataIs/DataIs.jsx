import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
//import Keyboardist from 'react-keyboardist';

const styles_landscape = {}, styles_portrait = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class DataIs extends React.Component {

  constructor(props) {
    super(props, '/personalised');
    this.countdown = React.createRef();
    this.state = { virtue: '', virtueAdverb: '', nextPage: '/personalised' };
  }

  async componentDidMount() {
    let nextPage = this.state.nextPage;
    const user = await UserSession.ensure(this.context, ['_id', 'virtue', 'hasImage']);
    if (!user.hasImage) {
      nextPage = '/selfie';
      console.log('[DATAIS] No webcam image found for ' + user._id);
    }
    this.setState({ virtue: user.virtue, virtueAdverb: user.virtueAsAdverb(), nextPage: nextPage });
  }

  render() {
    const { virtue, virtueAdverb } = this.state;

    return (

      <div className={this.props.root}>
        {
        // <Keyboardist bindings={{
        //   Right: () => {
        //     console.log('RIGHT');
        //     this.props.history.push(this.state.nextPage);
        //     return false;
        //   }
        // }} />
        }
        <SpectreHeader colour="white" />
        <div className={`${this.props.content} content`}>
          <Fade in={true} style={{ transitionDelay: '200ms' }}>
            <h1 className="addSpacing">Data is {virtue}</h1>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '1200ms' }}>
            <p className="normal">To become more <strong>{virtueAdverb}</strong> you need&nbsp;more&nbsp;data</p>
          </Fade>
          <Fade in={true} style={{ transitionDelay: '2000ms' }}>
            <p className="normal-nextline">We can help you believe in the {virtue}&nbsp;of&nbsp;Dataism.</p>
          </Fade>
          <Countdown
            ref={e => this.countdown = e}
            onComplete={() => this.props.history.push(this.state.nextPage)}
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
