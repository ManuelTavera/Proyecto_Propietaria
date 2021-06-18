import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    container: {
        padding: theme.spacing(12),
        width: '100%',
        height: '100%',
    },
    textArea: {
        width: '100%',
        height: '100%',
        resize: 'none',
        height: 500,
        maxHeight: 500,
    },
    comboBox: {
        width: '100%',
        marginTop: '50px',
        backgroundColor: '#FFF',
    },
    buttonContainer:{
        justifyContent: 'flex-end',
        paddingRight: '10px'
    },
    alignLeft: {
        justifyContent: 'flex-end',
        display: 'flex'
    }
})

class CreateComplaint extends React.Component {
    render(){
        const { classes, history } = this.props

        return(
           <Container component="main" className={classes.container}>
               <CssBaseline />
                <Typography variant="h3" component="h2">
                    Crear queja
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={[]}
                            getOptionLabel={(option) => option.title}
                            className={classes.comboBox}
                            renderInput={(params) => <TextField {...params} label="Seleccione un tipo de queja" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={[]}
                            getOptionLabel={(option) => option.title}
                            className={classes.comboBox}
                            renderInput={(params) => <TextField {...params} label="Seleccione un departamento" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            component="textarea"
                            className={classes.textArea}
                        />
                    </Grid>
                    <Grid container className={classes.buttonContainer} spacing={1}>
                        <Grid item xs={2} className={classes.alignLeft}>
                            <Button
                                variant="contained"
                                onClick={() => history.push('/home')}
                            >
                                Volver atras
                            </Button>
                        </Grid>
                        <Grid item xs={1} className={classes.alignLeft}>
                            <Button
                                variant="contained"
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(CreateComplaint);