import React from 'react';
import { connect } from 'react-redux';
import { getDepartments, deleteDepartment } from '../../../common/store/actions/department/department.action';
import { getAllDepartments, getErrorDepartment, getDepartmentDeleted } from '../../../common/store/selectors/department.selector';
import CustomTable from '../../../common/components/CustomTable';
import Box from '@material-ui/core/Box';

function mapDispatchToProps(dispatch){
    return {
        getDepartments: () => {
            dispatch(getDepartments());
        },
        deleteDepartment: (id) => {
            dispatch(deleteDepartment(id))
        }
    }
}

function mapStateToProps(state) {
    return {
        departments: getAllDepartments(state),
        error: getErrorDepartment(state),
        departmentDeleted: getDepartmentDeleted(state)
    }
}

function createData(departmenName, managerName, id){
    let dataRow = new Map();
    dataRow.set('Nombre del Departamento', departmenName);
    dataRow.set('Nombre del encargado', managerName);
    dataRow.set('id', id);

    return dataRow;
}

const departmentColumns = [
    "Nombre del Departamento",
    "Nombre del encargado",
];


class ViewDepartment extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            allDepartments: [],
        };

        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    componentDidMount(){
        this.props.getDepartments()
    }

    componentDidUpdate(prevProps){
        if(prevProps.departments !== this.props.departments){
            this.setState({ allDepartments: this.props.departments });
        }
        if(prevProps.departmentDeleted !== this.props.departmentDeleted && this.props.departmentDeleted){
            window.alert("Se ha eliminado exitosamente el departamento")
        }
        else if(prevProps.error !== this.props.error && !this.props.departmentDeleted && this.props.error){
            window.alert(this.props.error)
        }
    }

    deleteDepartment(id){
        if(window.confirm("Estas seguro de que desea eliminar el departamento?")){
            this.props.deleteDepartment(id);
        }
    }

    render(){
        const { allDepartments } = this.state;

        return (
            <Box p={3}>
                <CustomTable
                    columns={departmentColumns}
                    rows={allDepartments.map((department) => {
                        return createData(
                            department.departmentName,
                            department.managerName,
                            department.id
                        )
                    })}
                    deleteRequest={this.deleteDepartment}
                    addButtonText={'Crear departamento'}
                    redirect={'/admin/create/department'}
                    editRedirect={'/admin/edit/department'}
                    NotFoundMessage={'No se han creado ningun departamento'}
                />
            </Box>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewDepartment);