import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getEmployees } from '../../../../common/store/actions/SignIn/user.actions';
import { getAllEmployees, getError } from '../../../../common/store/selectors/user.selector';
import { createDepartment } from '../../../../common/store/actions/department/department.action';
import { getErrorDepartment, getDepartmentCreated } from '../../../../common/store/selectors/department.selector'

function mapDispatchToProps(dispatch){
    return {
        getEmployees: () => {
            dispatch(getEmployees())
        },
        createDepartment: (data) => {
            dispatch(createDepartment(data))
        }
    }
}

function mapStateToProps(state){
    return {
        error: getError(state),
        employees: getAllEmployees(state),
        errorDepartment: getErrorDepartment(state),
        departmentCreated: getDepartmentCreated(state),
    }
}

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


class CreateDepartment extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            departmentName: '',
            manager: null,
        };

        this.onChange = this.onChange.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getEmployees();
    }

    componentDidUpdate(prevProps){
        if(prevProps.departmentCreated !== this.props.departmentCreated && this.props.departmentCreated){
            window.alert('El departamento se ha creado exitosamente.')
        }
    }

    onChange(field, value = ''){
        if(field === 'manager' && !value){
            this.setState({ manager: null })
        }
        else{
            this.setState({ [field]: value })
        }
    }

    canSubmit(){
        const { departmentName, manager } = this.state;
        return departmentName !== '' && manager;
    }

    onSubmit(){
        const { departmentName, manager } = this.state;
        const data = {
            departmentName,
            managerId: manager.managerId
        }

        this.props.createDepartment(data);
    }

    render(){
        const { classes, employees, history } = this.props;
        const { departmentName } = this.state;

        return(
            <Container component="div" className={classes.container} maxWidth="sm">
                <CssBaseline />
                <Typography variant="h3" component="h2">
                    Crear departamento
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
                        onChange={(event) => this.onChange('departmentName', event.target.value)}
                    />
                    <Autocomplete
                        id="combo-box-demo"
                        options={employees}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => this.onChange('manager', value)}
                        style={{ marginBottom: 20 }}
                        className={classes.whiteBackground}
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
                            onClick={() => this.onSubmit()}
                            disabled={this.canSubmit() ? false: true}
                        >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(CreateDepartment);