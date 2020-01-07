import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black',
  },
  clickToContinue: {
    margin: "20% 0",
  }
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
          <Typography component="h5" variant="h5"
            style={{ marginTop: '170px', marginLeft: '100px', marginRight: '100px' }}>
            We’re sorry <strong>{name}</strong>, we’re afraid you can’t&nbsp;do&nbsp;that.
          </Typography>
          <Link to="/goodbye" style={{ marginBottom: '270px' }}>
            <IconButton icon="tick" text="Next" />
          </Link>
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
