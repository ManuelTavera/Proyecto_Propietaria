import React from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../../../common/store/actions/SignIn/user.actions';
import { getAllEmployees, getError } from '../../../../common/store/selectors/user.selector';
import { createDepartment } from '../../../../common/store/actions/department/department.action';
import { getErrorDepartment, getDepartmentCreated } from '../../../../common/store/selectors/department.selector';
import CreateEditDepartment from '../../../../common/components/CreateEditDepartment';

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

        if(this.props.edit){
            const { department } = this.props;
            this.setState({ departmentName: department.departmentName })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.departmentCreated !== this.props.departmentCreated && this.props.departmentCreated){
            window.alert('El departamento se ha creado exitosamente.')
        }
        if(this.props.edit){
            if(prevProps.employees !== this.props.employees){
                const manager = this.props.employees.find((employee) => employee.managerId === this.props.department.managerId)
                console.log(manager);
                this.setState({ manager: manager })
            }
            if(prevProps.departmentUpdated !== this.props.departmentUpdated && this.props.departmentUpdated){
                window.alert('El departamento se ha editado satisfactoriamente.')
            }
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
        
        if(this.props.edit){
            this.props.updateDepartment(data);
        }
        else{
            this.props.createDepartment(data);
        }
    }

    render(){
        const { employees, edit } = this.props;
        const { departmentName, manager } = this.state;

        return(
            <CreateEditDepartment
                employees={employees}
                departmentName={departmentName}
                onChange={this.onChange}
                canSubmit={this.canSubmit}
                onSubmit={this.onSubmit}
                pageTitle={edit ? "Editar departamento": "Crear departamento"}
                defaultValue={edit ? manager: null}
                edit={edit}
                manager={manager}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDepartment);