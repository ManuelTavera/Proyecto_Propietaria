import React from 'react';
import { connect } from 'react-redux';
import { updateTypeClaim, getClaimsTitle } from '../../../common/store/actions/claim/claim.action';
import { getClaimsError, getClaimTypeUpdated, getClaimsTitle as getClaimType } from '../../../common/store/selectors/claim.selector';
import CreateClaimType from './CreateClaimType';

function mapDispatchToProps(dispatch){
    return {
        updateTypeClaim: (data) => {
            dispatch(updateTypeClaim(data))
        },
        getClaimsTitle: (id) => {
            dispatch(getClaimsTitle(id))
        }
    }
}

function mapStateToProps(state){
    return {
        error: getClaimsError(state),
        claimTypeUpdated: getClaimTypeUpdated(state),
        claimType: getClaimType(state)
    }
}

class EditClaimType extends React.Component{

    componentDidUpdate(prevProps){
        if(prevProps.claimTypeUpdated !== this.props.claimTypeUpdated && this.props.claimTypeUpdated){
            window.alert("Se ha actualizado exitosamente el tipo de reclamación")
        }
    }
    
    componentDidMount(){
        const id = parseInt(this.props.match.params.claimTypeId);
        this.props.getClaimsTitle(id);
    }

    render(){
        const { claimType: [type] } = this.props;
        return (
            <React.Fragment>
                {type && 
                    <CreateClaimType
                        updateClaimType={this.props.updateTypeClaim}
                        edit={true}
                        claimType={type}
                        pageTitle="Editar tipo de reclamación"
                    />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClaimType);