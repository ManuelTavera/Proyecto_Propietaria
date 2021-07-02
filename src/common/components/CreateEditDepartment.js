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
import Autocomplete from '@material-ui/lab/Autocomplete';


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

function CreateEditDepartment({ classes, employees, departmentName, onChange, canSubmit, onSubmit, pageTitle, history, defaultValue }){
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
                    id="department"
                    label="Nombre del departamento"
                    className={classes.whiteBackground}
                    style={{ marginBottom: 20 }}
                    value={departmentName}
                    onChange={(event) => onChange('departmentName', event.target.value)}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={employees}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => onChange('manager', value)}
                    style={{ marginBottom: 20 }}
                    className={classes.whiteBackground}
                    value={defaultValue}
                    renderInput={(params) => <TextField {...params} label="Encargado del departamento" fullWidth required variant="outlined" />}
                />
            </form>
            <Grid container className={classes.buttonContainer} spacing={3}>
                <Grid item xs={4} className={classes.alignLeft}>
                    <Button
                        variant="contained"
                        onClick={() => history.push('/admin/department')}
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

export default compose(withRouter, withStyles(styles))(CreateEditDepartment);