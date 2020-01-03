import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import IconButton from '../../Components/IconButton/IconButton';
import { Link } from 'react-router-dom';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class Campaign extends React.Component {
  constructor(props) {
    super(props, '/dark-ad');
    this.state = {
      targetName: '',
      influences: [],
      targetPronoun: ''

    };
  }

  componentDidMount() {
    UserSession.ensure(this.context,
      ['_id', 'name', 'adIssue', 'influences', 'target' ],
      user => this.setState({
        influences: user.influences,
        targetName: user.target.name.ucf(),
        targetPronoun: (user.target.gender === 'male' ? 'he' : 'she')
      }));
  }

  render() {
    const { classes } = this.props;
    let { influences, targetPronoun, targetName } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <Typography component="h6" variant="h6" style={{ marginTop: '100px' }}>
            Now use a simple design tool to create a targeted Facebook ad.
          </Typography>
          <Typography component="h6" variant="h6">
            <strong>{targetName}</strong>'s OCEAN profile shows that {targetPronoun} can be influenced by:
          </Typography>
          <Typography component="h6" variant="h6">
            <strong>Images</strong> that contain {influences[0]}
          </Typography>
          <Typography component="h6" variant="h6" style={{ marginBottom: '100px' }}>
            <strong>Slogans</strong> that contain {influences[1]}
          </Typography>
          <Link to="/dark-ad">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
Campaign.contextType = UserSession;

export default withStyles(styles)(Campaign);
