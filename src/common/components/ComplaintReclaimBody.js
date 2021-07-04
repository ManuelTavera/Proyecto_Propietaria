import React from 'react';
import { withRouter } from "react-router";
import { compose } from 'redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ComboBox from './ComboBox';

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

function ComplaintReclaimBody(
{ 
        classes, 
        history, 
        deparmentOptions, 
        titleOptions, 
        titleLabel, 
        pageTitle, 
        descriptions, 
        complaintTitle,
        edit, 
        onFieldChange, 
        department, 
        onSubmit 
}) 
{
        return(
           <Container component="main" className={classes.container}>
               <CssBaseline />
                <Typography variant="h3" component="h2">
                    {pageTitle}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {!edit &&
                            <ComboBox
                                id="title-combo-box-1"
                                onChange={(value) => onFieldChange('title', value)}
                                options={titleOptions}
                                normalComboBox
                                className={classes.comboBox}
                                fullWidth
                                required
                                variant="outlined"
                                label={titleLabel}
                                optionLabel="tittle"
                            />
                        }
                        {edit &&
                            <ComboBox
                                id="combo-box-1"
                                controllable
                                fullWidth
                                required
                                options={titleOptions}
                                className={classes.comboBox}
                                value={complaintTitle ? complaintTitle.tittle: null}
                                onChange={(newValue) => {
                                    onFieldChange('title', newValue);
                                }}
                                label={titleLabel}
                                optionSelectedLabel="tittle"
                            />
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {!edit &&
                            <ComboBox
                                id="department-combo-box-2"
                                onChange={(value) => onFieldChange('department', value)}
                                options={deparmentOptions}
                                normalComboBox
                                className={classes.comboBox}
                                fullWidth
                                required
                                variant="outlined"
                                label="Seleccione un departamento"
                                optionLabel="departmentName"
                            />
                        }
                        {edit &&
                            <ComboBox
                                id="combo-box-2"
                                controllable
                                fullWidth
                                required
                                options={deparmentOptions}
                                className={classes.comboBox}
                                value={department ? department.departmentName: null}
                                onChange={(newValue) => {
                                    onFieldChange('department', newValue);
                                }}
                                optionSelectedLabel="departmentName"
                                label="Seleccione un departamento"
                            />
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            component="textarea"
                            className={classes.textArea}
                            value={descriptions}
                            onChange={(event) => onFieldChange('description', event.target.value)}
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
                                onClick={() => onSubmit()}
                            >
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }

export default compose(withRouter, withStyles(styles))(ComplaintReclaimBody);