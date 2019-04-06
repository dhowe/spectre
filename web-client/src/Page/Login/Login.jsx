import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginRegister from 'react-mui-login-register';

const classes = {
    root: {
        flexGrow: 1,
        width: "100%",
        textAlign: "center",
    },
    Login_image: {
        position: 'relative',
    },
};

class Login extends React.Component {
    // const { classes } = props;
    handleLogin = content => {
        alert(`Logging in with content '${JSON.stringify(content)}'`);
    };

    handleLoginWithProvider = providerId => {
        alert(`Logging in with provider '${providerId}'`);
    };

    handleRegister = content => {
        alert(`Registering with content '${JSON.stringify(content)}'`);
    };

    handleRegisterWithProvider = providerId => {
        alert(`Registering with provider '${providerId}'`);
    };

    render() {
        const header = (
            <div className='header'>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Spectre
            </Typography>
                    </Toolbar>
                </AppBar>
                <img alt="Touch to Continue" className={classes.TouchToBegin_logo} src="https://i.gyazo.com/dedc1236cc349c728e64b134504bf774.png"></img>
                <Typography component="h1" variant="h1">Hello!</Typography>
                <Typography component="h2" variant="h2">Let's Play!</Typography>
            </div>
        );

        const footer = (
            <Typography>Terms</Typography>
        );
        return (
            <div className={classes.root}>

                <LoginRegister header={header} footer={footer}
                    onLogin={this.handleLogin}
                    onLoginWithProvider={this.handleLoginWithProvider}
                />
            </div >
        )
    }
}
export default (Login);
