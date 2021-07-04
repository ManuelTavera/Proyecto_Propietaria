import React from 'react';
import { withRouter } from "react-router";
import { compose } from 'redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ComboBox from './ComboBox';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    container: {
        padding: theme.spacing(8),
        width: '100%',
        height: '100%',
    },
    textArea: {
        width: '100%',
        height: '100%',
        resize: 'none',
    },
    textAreaDescription: {
        height: 200,
        maxHeight: 200,
    },
    textAreaResponse: {
        height: 200,
        maxHeight: 200,
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
        display: 'flex',
    }
})

function ResponseBody
(
    {   redirect, 
        pageTitle, 
        classes, 
        history, 
        titleType, 
        department, 
        description, 
        answer, 
        person, 
        onChange,
        onSubmit,
        canSubmit,
    }
){
    return(
        <Container component="main" className={classes.container}>
               <CssBaseline />
                <Typography variant="h3" component="h2">
                    {pageTitle}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ComboBox
                            id="combo-box-1"
                            disabled
                            controllable
                            fullWidth
                            className={classes.comboBox}
                            value={titleType}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ComboBox
                            id="combo-box-2"
                            disabled
                            controllable
                            fullWidth
                            className={classes.comboBox}
                            value={department}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            value={person}
                            variant="outlined"
                            className={classes.comboBox}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            component="textarea"
                            disabled
                            readOnly
                            className={`${classes.textArea} ${classes.textAreaDescription}`}
                            value={description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            component="textarea"
                            className={`${classes.textArea} ${classes.textAreaResponse}`}
                            onChange={(event) => onChange(event.target.value)}
                            value={answer}
                        />
                    </Grid>
                    <Grid container className={classes.buttonContainer} spacing={1}>
                        <Grid item xs={3} className={classes.alignLeft} style={{ marginRight: '10px' }}>
                            <Button
                                variant="contained"
                                onClick={() => history.push(redirect)}
                            >
                                Volver atras
                            </Button>
                        </Grid>
                        <Grid item xs={1} className={classes.alignLeft}>
                            <Button
                                variant="contained"
                                onClick={() => onSubmit()}
                                disabled={canSubmit() ? false: true}
                            >
                                Responder
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
    )
}

export default compose(withRouter, withStyles(styles))(ResponseBody);