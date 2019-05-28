import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  clickToContinue: {
    margin: "20% 0",
  }
};

class DataIs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toTest: false }; // TMP
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(evt) {// TMP
    if (evt.key === ' ') this.setState(() => ({ toTest: true }));
  }
  componentDidMount() {// TMP
    document.addEventListener("keyup", this.handleKeyUp);
  }
  componentWillUnmount() {// TMP
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  renderRedirect() {// TMP
    if (this.state.toTest) return <Redirect to='/image-test' />
  }
  render() {
    const { classes } = this.props;
    console.log('User:', this.context);
    return (
      <div className={classes.root}>
        {this.renderRedirect()} {/* tmp */}
        <SpectreHeader colour="white" />
        <div className={classes.content + " content"}>
          <Typography component="h4" variant="h4">DATA IS {(this.context.virtue || 'power').toUpperCase()}</Typography>
          <Link to="/believe-in-dataism">
            <IconButton icon="next" text="Next" />
          </Link>
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

export default withStyles(styles)(DataIs);
