import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class FindCitizens extends React.Component {

  constructor(props) {
    super(props, '/targets-found');
    this.state = { targetName: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'target']);
    this.setState({ targetName: user.target.name });
  }

  render() {
    const { classes } = this.props;
    const { targetName } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p className="copy"><strong>Excellent.</strong></p>
          <p className="copy">Now target UK citizens with a similar OCEAN profile to <strong>{targetName}</strong>!</p>
          <p className="copy">A silent army that could well tip the&nbsp;balance...</p>
          <div className="link">
            <Link to="/targets-found">
              <IconButton icon="next" text="Find them" />
            </Link>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}
FindCitizens.contextType = UserSession;
FindCitizens.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FindCitizens);
