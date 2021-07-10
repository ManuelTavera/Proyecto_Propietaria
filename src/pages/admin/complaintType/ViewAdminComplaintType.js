import React from 'react';
import { connect } from 'react-redux';
import * as complainsActions from '../../../common/store/actions/complain/complain.actions';
import * as complainsSelector from '../../../common/store/selectors/complains.selector';
import Box from '@material-ui/core/Box';
import CustomTable from '../../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
    return {
        getComplainsTitle: () => {
            dispatch(complainsActions.getComplainsTitle())
        },
        deleteTypeComplaint: (id) => {
            dispatch(complainsActions.deleteTypeComplaint(id))
        }
    }
}

function mapStateToProps(state) {
    return {
        error: complainsSelector.getError(state),
        complaintsType: complainsSelector.getComplainsTitle(state)
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

class ViewAdminComplaintType extends React.Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
       this.props.getComplainsTitle();
    }

    onDelete(id){
        if(window.confirm("Esta seguro de que quiere eliminar este tipo de reclamación")){
            this.props.deleteTypeComplaint(id)
        }
    }

    render(){
        const { complaintsType } = this.props;

        return(
            <Box p={3}>
                <CustomTable
                    columns={columns}
                    rows={complaintsType.map((complaintType) => {
                        return createData(
                            complaintType.tittle,
                            complaintType.description,
                            complaintType.stateName,
                            complaintType.id
                        )
                    })}
                    deleteRequest={this.onDelete}
                    editRedirect="/admin/complaintType/edit"
                    redirect="/admin/complaintType/create"
                    addButtonText={'Crear tipo de queja'}
                    NotFoundMessage={'No se han registrado ningún tipo de queja'}
                />
            </Box>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminComplaintType);