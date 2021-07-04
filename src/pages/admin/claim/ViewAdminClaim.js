import React from 'react';
import { connect } from 'react-redux';
import { getClaims } from '../../../common/store/actions/claim/claim.action';
import { getAllClaims, getClaimsError } from '../../../common/store/selectors/claim.selector';
import Box from '@material-ui/core/Box';
import CustomTable from '../../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
    return {
        getClaims: (data) => {
            dispatch(getClaims(data));
        }
    }
}

function mapStateToProps(state) {
    return {
        claims: getAllClaims(state),
        claimsError: getClaimsError(state)
    }
}

const columns = [
    "Creado por",
    "Fecha de creación",
    "Departamento",
    "Tipo de reclamación",
    "Descripción"
];

function createData(person, date, department, type, description, id){
    let dataRow = new Map();
    dataRow.set(columns[0], person);
    dataRow.set(columns[1], date);
    dataRow.set(columns[2], department);
    dataRow.set(columns[3], type);
    dataRow.set(columns[4], description);
    dataRow.set('id', id);

    return dataRow;
}

class ViewAdminClaim extends React.Component {

    componentDidMount(){
        this.props.getClaims('WHERE ID_ESTADO != 6')
    }

    render(){
        const { claims } = this.props;

        return(
            <Box p={3}>
                <CustomTable
                    response
                    columns={columns}
                    rows={claims.map((claim) => {
                        return createData(
                            claim.personName,
                            claim.date,
                            claim.departmentName,
                            claim.complainTypeName,
                            claim.description,
                            claim.id
                        )
                    })}
                    editRedirect="/admin/claim/response"
                    NotFoundMessage={'No se han registrado ninguna queja'}
                />
            </Box>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminClaim);