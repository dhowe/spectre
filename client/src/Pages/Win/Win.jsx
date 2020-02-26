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
    this.state = { virtue: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['virtue']);
    this.setState({ virtue: user.virtue });
  }

  render() {
    const { classes } = this.props;
    const { virtue } = this.state;

    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <IdleChecker />
        <div className={`${classes.content} content`}>
          <h1 className="addSpacing"><span><strong>Step 2</strong> - Complete!</span></h1>
          <h2>
            <span>Believe in the {virtue} of Dataism!</span>
          </h2>
          <p className="normal-addSpacing">
            You have successfully used computational propaganda<br/>to influence this election!</p>
          <p className="thankyou-icon">
            <Trophy />
          </p>
          <p className="normal">Democracy is easy. Like taking candy from a baby!</p>
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
