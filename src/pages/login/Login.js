import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://arandasoft.com/wp-content/uploads/2016/07/seguridad-it.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  welcome: {
    fontSize: '40px',
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20px",
  }
});



class Login extends React.Component{
  render(){
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Grid container component="main" className={classes.root}>
          <CssBaseline/>
          <Grid item xs={12} sm={4} md={6} className={classes.image} />
          <Grid xs={12} sm={8} md={6} component={Paper} square container>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <VpnKeyIcon/>
                </Avatar>
                <Typography variant="h1" align="center" className={classes.welcome}>
                  Bienvenido a nuestro sistema
                </Typography>
                  <Grid container spacing={3} className={classes.buttons}>
                    <Grid item xs={4}>
                      <Button color="primary" component={Link} to="/sign-in">
                        Ingresar sesion
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button color="primary" component={Link} to="/sign-up">
                        Registrarse
                      </Button>
                    </Grid>
                  </Grid>
              </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(Login);

