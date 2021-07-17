import React from 'react';
import { connect } from 'react-redux';
import { updateTypeComplaint, getComplainsTitle } from '../../../common/store/actions/complain/complain.actions';
import { getError, getComplainTypeUpdated, getComplainsTitle as getComplainType } from '../../../common/store/selectors/complains.selector';
import CreateComplaintType from './CreateComplaintType';

function mapDispatchToProps(dispatch){
    return {
        updateTypeComplaint: (data) => {
            dispatch(updateTypeComplaint(data))
        },
        getComplainsTitle: (id) => {
            dispatch(getComplainsTitle(id))
        }
    }
}

function mapStateToProps(state){
    return {
        error: getError(state),
        complainTypeUpdated: getComplainTypeUpdated(state),
        complaintType: getComplainType(state)
    }
}

class EditComplaintType extends React.Component{

    componentDidUpdate(prevProps){
        if(prevProps.complainTypeUpdated !== this.props.complainTypeUpdated && this.props.complainTypeUpdated){
            window.alert("Se ha actualizado exitosamente el tipo de queja")
        }
    }
    
    componentDidMount(){
        const id = parseInt(this.props.match.params.complaintTypeId);
        this.props.getComplainsTitle(id);
    }

    render(){
        const { complaintType: [type] } = this.props;
        return (
            <React.Fragment>
                {type && 
                    <CreateComplaintType
                        updateTypeComplaint={this.props.updateTypeComplaint}
                        edit={true}
                        complaintType={type}
                        pageTitle="Editar tipo de queja"
                    />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComplaintType);