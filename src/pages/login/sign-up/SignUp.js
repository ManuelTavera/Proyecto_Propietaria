import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createUser, resetProperties } from '../../../common/store/actions/SignIn/user.actions';
import { getError, getUserCreated } from '../../../common/store/selectors/user.selector';
import { Link as RouterLink } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number';
import { IMaskMixin } from "react-imask";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { emailRegex } from '../../../common/constants/regex.constant'


function mapDispatchToProps(dispatch){
  return {
    createUser: (data) => {
      dispatch(createUser(data));
    },
    resetProperties: () => {
      dispatch(resetProperties());
    }
  }
}

function mapStateToProps(state) {
  return {
    userCreated: getUserCreated(state),
    error: getError(state),
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
});

const TextFieldIMask = IMaskMixin((props) => (
  <TextField {...props}/>
));

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          name: '',
          lastName: '',
          birthDay: '0000-00-00',
          idCard: null,
          email: '',
          phone: '',
          genre: '',
          userName: '',
          password: '',
          confirmPassword: '',
          userType: 2,
          validations: {
            name: true,
            lastName: true,
            birthDay: true,
            idCard: true,
            email: true,
            phone: true,
            genre: true,
            userName: true,
            password: true,
            confirmPassword: true,
          }
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validSubmit = this.validSubmit.bind(this);
    }

    componentWillUnmount(){
      this.props.resetProperties();
    }

    onFieldChange(field, value){
      this.setState({ [field]: value })
    }

    onSubmit(event){
      event.preventDefault();

      if(this.validSubmit()){
        const { userName, password, userType, validations, name, lastName, confirmPassword, birthDay , ...rest } = this.state;

        const data = {
          name: name + ' ' + lastName,
          birthDay: birthDay.replace('-', ''),
          ...rest,
          user: {
            userName: userName,
            password: password,
            userType: userType,
          }
        }

        this.props.createUser(data);
      }
      
    }

    validSubmit(){
      const { email, confirmPassword, validations: validationsObject, ...rest } = this.state;
      const validEmail = emailRegex.test(String(email).toLowerCase());
      const validPassword = (confirmPassword === rest.password) && confirmPassword !== '';
      let canSubmit = true;

      validationsObject['email'] = validEmail;
      validationsObject['confirmPassword'] = validPassword;
      
      Object.keys(rest).forEach((key) => {
        if(rest[key] === '' || rest[key] === null || rest[key] === '0000-00-00'){
          validationsObject[key] = false;
          canSubmit = false;
        }
        else{
          validationsObject[key] = true;
        }
      })

      this.setState({ validations: validationsObject});


      return validEmail && canSubmit && validPassword;
    }

    
    render(){
        const { classes } = this.props;
        const { name, lastName, birthDay, idCard, email, phone, userName, password, confirmPassword, genre, validations } = this.state
        
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={name}
                        error={!validations['name']}
                        helperText={!validations['name'] ? 'Nombre incorrecto': ''}
                        onChange={(event) => this.onFieldChange('name', event.target.value)}
                        //onBlur={() => this.checkInputs('name', name)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={lastName}
                        error={!validations['lastName']}
                        helperText={!validations['lastName'] ? 'Apellido incorrecto': ''}
                        onChange={(event) => this.onFieldChange('lastName', event.target.value)}
                        //onBlur={() => this.checkInputs('lastName', lastName)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        id="date"
                        required
                        fullWidth
                        label="Fecha de nacimiento"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={birthDay}
                        error={!validations['birthDay']}
                        helperText={!validations['birthDay'] ? 'Dato incorrecto': ''}
                        onChange={(event) => this.onFieldChange('birthDay', event.target.value)}
                        //onBlur={() => this.checkInputs('birthDay', birthDay)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        id="genre"
                        required
                        fullWidth
                        select
                        label="Genero"
                        value={genre}
                        error={!validations['genre']}
                        helperText={!validations['genre'] ? 'Dato incorrecto': ''}
                        onChange={(event) => this.onFieldChange('genre', event.target.value)}
                        //onBlur={() => this.checkInputs('genre', genre)}
                      >
                        <MenuItem value={'M'}>
                          Masculino
                        </MenuItem>
                        <MenuItem value={'F'}>
                          Femenino
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Usuario"
                        label="Usuario"
                        name="usuario"
                        value={userName}
                        error={!validations['userName']}
                        helperText={!validations['userName'] ? 'Dato incorrecto': ''}
                        onChange={(event) => this.onFieldChange('userName', event.target.value)}
                        //onBlur={() => this.checkInputs('userName', userName)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField                        
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        error={!validations['email']}
                        helperText={!validations['email'] ? 'Correo electronico incorrecto': ''}
                        onChange={(event) => this.onFieldChange('email', event.target.value)}
                        //onBlur={() => this.checkInputs('email', email)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        error={!validations['password']}
                        helperText={!validations['password'] ? 'La contraseña no puede estar en blanco': ''}
                        onChange={(event) => this.onFieldChange('password', event.target.value)}
                        //onBlur={() => this.checkInputs('password', password)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={confirmPassword}
                        error={!validations['confirmPassword']}
                        helperText={!validations['confirmPassword'] ? 'Debe de ser igual a la contraseña ingresada': ''}
                        onChange={(event) => this.onFieldChange('confirmPassword', event.target.value)}
                        //onBlur={() => this.checkInputs('confirmPassword', confirmPassword)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MuiPhoneNumber
                        defaultCountry={'us'} 
                        onlyCountries={['us']}
                        variant="outlined" 
                        fullWidth
                        required
                        name="phone"
                        label="Phone"
                        id="phone"
                        value={phone}
                        error={!validations['phone']}
                        helperText={!validations['phone'] ? 'Debe de ingresar un telefono': ''}
                        onChange={(value) => this.onFieldChange('phone', value)}
                        //onBlur={() => this.checkInputs('phone', phone)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldIMask
                        mask={'000-0000000-0'}
                        variant="outlined"
                        label="Cédula"
                        fullWidth
                        required
                        name="cedula"
                        id="cedula"
                        value={idCard}
                        error={!validations['idCard']}
                        helperText={!validations['idCard'] ? 'La cedula no puede estar en blanco': ''}
                        onAccept={(value, mask) => this.onFieldChange('idCard', mask.unmaskedValue)}
                        //onBlur={() => this.checkInputs('idCard', phone)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    //disabled={this.validSubmit() ? false: true}
                    onClick={this.onSubmit}
                  >
                    Sign Up
                  </Button>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link component={RouterLink} variant="body2" to="/sign-in">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
          );
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUp);