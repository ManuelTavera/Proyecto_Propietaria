import React from 'react';
import { connect } from 'react-redux';
import { getComplains } from '../../../common/store/actions/complain/complain.actions';
import { getAllComplains, getError } from '../../../common/store/selectors/complains.selector';
import Box from '@material-ui/core/Box';
import CustomTable from '../../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
    return {
        getComplains: (data) => {
            dispatch(getComplains(data))
        }
    }
}

function mapStateToProps(state){
    return {
        complaints: getAllComplains(state),
        complainsError: getError(state)
    }
}

const columns = [
    "Creado por",
    "Fecha de creación",
    "Departamento",
    "Tipo de queja",
    "Descripción"
]

function createData(person, date, department, type, description, id){
    let dataRow = new Map();
    dataRow.set(columns[0], person);
    dataRow.set(columns[1], date);
    dataRow.set(columns[2], department);
    dataRow.set(columns[3], type)
    dataRow.set(columns[4], description);
    dataRow.set('id', id)

    return dataRow;
}

class ViewAdminComplaint extends React.Component{
    componentDidMount(){
        this.props.getComplains('WHERE ID_ESTADO != 6');
    }

    render(){
        const { complaints } = this.props;

        return(
            <Box p={3}>
                <CustomTable
                    response
                    columns={columns}
                    rows={complaints.map((complaint) => {
                        return createData(
                            complaint.personName,
                            complaint.date,
                            complaint.departmentName,
                            complaint.complainTypeName,
                            complaint.description,
                            complaint.id
                        )
                    })}
                    editRedirect="/admin/complaint/response"
                    notFoundMessage="No se han registrado ninguna reclamación"
                />
            </Box>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminComplaint);