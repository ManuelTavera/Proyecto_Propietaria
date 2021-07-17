import React from 'react';
import { connect } from 'react-redux';
import * as claimsActions from '../../../common/store/actions/claim/claim.action';
import * as claimsSelector from '../../../common/store/selectors/claim.selector';
import Box from '@material-ui/core/Box';
import CustomTable from '../../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
    return {
        getClaimsTitle: () => {
            dispatch(claimsActions.getClaimsTitle())
        },
        deleteTypeClaim: (id) => {
            dispatch(claimsActions.deleteTypeClaim(id))
        }
    }
}

function mapStateToProps(state) {
    return {
        error: claimsSelector.getClaimsError(state),
        claimsType: claimsSelector.getClaimsTitle(state)
    }
}

const columns = [
    "Titulo",
    "Descripción",
    "Estado"
];

function createData(title, description, status, id){
    let dataRow = new Map();
    dataRow.set(columns[0], title);
    dataRow.set(columns[1], description);
    dataRow.set(columns[2], status);
    dataRow.set('id', id);

    return dataRow;
}

class ViewAdminClaimType extends React.Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
       this.props.getClaimsTitle();
    }

    onDelete(id){
        if(window.confirm("Esta seguro de que quiere eliminar este tipo de reclamación")){
            this.props.deleteTypeClaim(id)
        }
    }

    render(){
        const { claimsType } = this.props;

        return(
            <Box p={3}>
                <CustomTable
                    columns={columns}
                    rows={claimsType.map((claimType) => {
                        return createData(
                            claimType.tittle,
                            claimType.description,
                            claimType.stateName,
                            claimType.id
                        )
                    })}
                    deleteRequest={this.onDelete}
                    editRedirect="/admin/claimType/edit"
                    redirect="/admin/claimType/create"
                    addButtonText={'Crear tipo de reclamación'}
                    NotFoundMessage={'No se han registrado ningún tipo de queja'}
                />
            </Box>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminClaimType);