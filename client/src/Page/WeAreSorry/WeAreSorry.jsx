import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {

};

class WeAreSorry extends React.Component {
  constructor(props) {
    super(props, '/goodbye');
    this.state = { name: '' };
  }

  async componentDidMount() {
    const user = await UserSession.ensure(this.context, ['_id', 'name']);
    this.setState({ name: user.name });
  }

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <p>We’re sorry <strong>{name}</strong>, </p>
          <p> we’re afraid you can’t do that.</p>
          <div className="link">
            <Link to="/goodbye">
              <IconButton icon="tick" text="Next" />
            </Link>
          </div>
        </div >
        <FooterLogo />
      </div >
    );
  }
}

WeAreSorry.propTypes = {
  classes: PropTypes.object.isRequired,
};
WeAreSorry.contextType = UserSession;

export default withStyles(styles)(WeAreSorry);
