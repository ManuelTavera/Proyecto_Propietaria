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
import ComboBox from '../components/ComboBox';


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

function CreateEditDepartment(
    { 
        classes, 
        employees, 
        departmentName, 
        onChange, 
        canSubmit, 
        onSubmit, 
        pageTitle, 
        history, 
        manager,
        edit 
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
                    id="department"
                    label="Nombre del departamento"
                    className={classes.whiteBackground}
                    style={{ marginBottom: 20 }}
                    value={departmentName}
                    onChange={(event) => onChange('departmentName', event.target.value)}
                />
                {edit && 
                    <ComboBox
                        id="employees-combo-box"
                        onChange={(value) => onChange('manager', value)}
                        options={employees}
                        controllable
                        style={{ marginBottom: 20 }}
                        className={classes.whiteBackground}
                        fullWidth
                        required
                        variant="outlined"
                        label="Seleccione un encargado"
                        value={manager ? manager.name: null}
                        optionSelectedLabel="name"
                    />
                }
                {!edit &&
                    <ComboBox
                        id="employees-combo-box"
                        onChange={(value) => onChange('manager', value)}
                        options={employees}
                        normalComboBox
                        style={{ marginBottom: 20 }}
                        className={classes.whiteBackground}
                        fullWidth
                        required
                        variant="outlined"
                        label="Seleccione un encargado"
                        optionLabel="name"
                    />
                }

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