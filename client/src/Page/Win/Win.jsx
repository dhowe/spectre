import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';
import { ReactComponent as Trophy } from '../../Icons/trophy.svg';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import ComponentsStyles from '../../App.module.css';

const styles = {

};

class Win extends React.Component {

  constructor(props) {
    super(props, '/influence-a-celebrity');
    this.state = { adIssue: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'adIssue']);
    this.setState({ adIssue: user.adIssue });
  }

  render() {
    const { classes } = this.props;
    const { adIssue } = this.state;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <p>
            <strong>{adIssue === 'remain' ? 'Believe!' : 'BeLeave!'}</strong>
          </p>
          <p className="smallText">
            &nbsp;Your campaign was successful...</p>
          <p className="thankyou-icon">
            <Trophy />
          </p>
          <p>Your silent army swung the vote!</p>
          <div className="link">
          <Link to="/influence-a-celebrity">
            <IconButton className={ComponentsStyles.iconButtonStyle1} icon="next" text="Next" />
          </Link>
          </div>
        </div>
        <FooterLogo/>
      </div>
    );
  }
}

Win.propTypes = {
  classes: PropTypes.object.isRequired,
};
Win.contextType = UserSession;

export default withStyles(styles)(Win);
