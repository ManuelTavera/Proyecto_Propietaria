import React from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../../../common/store/actions/SignIn/user.actions';
import { getAllEmployees, getError } from '../../../../common/store/selectors/user.selector';
import { updateDepartment, getDepartmentById } from '../../../../common/store/actions/department/department.action';
import { getDepartmentUpdated, getAllDepartments, getDepartment, getErrorDepartment } from '../../../../common/store/selectors/department.selector';
import CreateDepartment from '../create/CreateDepartment';

function mapDispatchToProps(dispatch){
    return {
        updateDepartment: (data) => {
            dispatch(updateDepartment(data))
        },
        getDepartmentById: (id) => {
            dispatch(getDepartmentById(id))
        },
        getEmployees: () => {
            dispatch(getEmployees())
        }
    }
}

function mapStateToProps(state){
    return {
        departmentUpdated: getDepartmentUpdated(state),
        departments: getAllDepartments(state),
        department: getDepartment(state),
        error: getErrorDepartment(state),
        employeesError: getError(state),
        employees: getAllEmployees(state),
    }
}

class EditDepartment extends React.Component {

    componentDidMount(){
        const id = parseInt(this.props.match.params.departmentId);
        this.props.getDepartmentById(id);
    }

    render(){
        return(
            <React.Fragment>
                {this.props.department &&
                    <CreateDepartment
                        updateDepartment={this.props.updateDepartment}
                        departmentUpdated={this.props.departmentUpdated}
                        edit={true}
                        department={this.props.department}
                    />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);





