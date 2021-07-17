import React from 'react';
import { compose } from 'redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: '60px'
    },
    form: {
        width: '100%',
    },
    buttonContainer:{
        justifyContent: 'flex-end',
        paddingRight: '10px'
    },
    alignLeft: {
        justifyContent: 'flex-end',
        display: 'flex'
    },
    whiteBackground: {
        backgroundColor: '#FFF',
    }
})

function ClaimComplaintBody(
    { 
        classes, 
        onChange, 
        canSubmit, 
        onSubmit,
        route,
        description,
        title,
        pageTitle,
        history
    }
){
    return(
        <Container component="div" className={classes.container} maxWidth="sm">
            <CssBaseline />
            <Typography variant="h3" component="h2">
                {pageTitle}
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Title"
                    label="Tipo de queja"
                    className={classes.whiteBackground}
                    style={{ marginBottom: 20 }}
                    value={title}
                    onChange={(event) => onChange('tittle', event.target.value)}
                />
                
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Descripción"
                    className={classes.whiteBackground}
                    style={{ marginBottom: 20 }}
                    value={description}
                    onChange={(event) => onChange('description', event.target.value)}
                />
            </form>
            <Grid container className={classes.buttonContainer} spacing={3}>
                <Grid item xs={4} className={classes.alignLeft}>
                    <Button
                        variant="contained"
                        onClick={() => history.push(route)}
                    >
                        Volver atras
                    </Button>
                </Grid>
                <Grid item xs={2} className={classes.alignLeft}>
                    <Button
                        variant="contained"
                        onClick={() => onSubmit()}
                        disabled={canSubmit() ? false: true}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default compose(withRouter, withStyles(styles))(ClaimComplaintBody);