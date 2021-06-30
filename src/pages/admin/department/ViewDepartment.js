import React from 'react';
import { connect } from 'react-redux';
import { getDepartments } from '../../../common/store/actions/department/department.action';
import { getAllDepartments } from '../../../common/store/selectors/department.selector';
import CustomTable from '../../../common/components/CustomTable';
import Box from '@material-ui/core/Box';

function mapDispatchToProps(dispatch){
    return {
        getDepartments: () => {
            dispatch(getDepartments());
        }
    }
}

function mapStateToProps(state) {
    return {
        departments: getAllDepartments(state)
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
    }

    componentDidMount(){
        this.props.getDepartments()
    }

    componentDidUpdate(prevProps){
        if(prevProps.departments !== this.props.departments){
            this.setState({ allDepartments: this.props.departments });
        }
    }

    render(){
        const { allDepartments } = this.state;
        console.log('Departamentos: ', allDepartments)

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
                    deleteRequest={() => {}}
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