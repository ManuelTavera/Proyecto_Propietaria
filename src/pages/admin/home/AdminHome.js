import React from 'react';
import { connect } from 'react-redux';
import * as claimsActions from '../../../common/store/actions/claim/claim.action';
import * as complainsActions from '../../../common/store/actions/complain/complain.actions';

function mapDispatchToProps(dispatch){
    return {
        deleteTypeClaim: (id) => {
            dispatch(claimsActions.deleteTypeClaim(id));
        },
        deleteTypeComplaint: (id) => {
            dispatch(complainsActions.deleteTypeComplaint(id))
        }
    }
}

function mapStateToProps(state) {
    return {
    }
}

class AdminHome extends React.Component {
    componentDidMount(){
        this.props.deleteTypeComplaint(12)
    }

    render(){
        return (
            <div>Work in progress</div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);