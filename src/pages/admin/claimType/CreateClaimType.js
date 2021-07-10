import React from 'react';
import { connect } from 'react-redux';
import { createTypeClaim } from '../../../common/store/actions/claim/claim.action';
import { getClaimsError, getClaimTypeCreated } from '../../../common/store/selectors/claim.selector'
import ClaimComplaintBody from '../../../common/components/ClaimComplaintBody';

function mapDispatchToProps(dispatch){
    return {
        createTypeClaim: (data) => {
            dispatch(createTypeClaim(data))
        }
    }
}

function mapStateToProps(state){
    return {
        error: getClaimsError(state),
        claimTypeCreated: getClaimTypeCreated(state),
    }
}

class CreateClaimType extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tittle: '',
            description: '',
            stateId: 2
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.edit){
            const { claimType } = this.props;
            this.setState({
                tittle: claimType.tittle,
                description: claimType.description
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.error !== this.props.error){
            window.alert(this.props.error)
        }
        if(prevProps.claimTypeCreated !== this.props.claimTypeCreated){
            window.alert("Se ha creado exitosamente el tipo de queja")
        }
    }

    onFieldChange(field, value){
        this.setState({[field]: value})
    }

    canSubmit(){
        const { title, description } = this.state;
        return title !== '' && description !== '';
    }

    onSubmit(){
        const data = this.state;

        if(this.props.edit){
            data['id'] = this.props.claimType.id;

            this.props.updateClaimType(data);
        }
        else{
            this.props.createTypeClaim(data);
        }
    }

    render(){
        const { tittle, description } = this.state;
        const { pageTitle } = this.props;

        return(
            <ClaimComplaintBody
                pageTitle={pageTitle ? pageTitle: 'Crear tipo de reclamación'}
                onChange={this.onFieldChange}
                canSubmit={this.canSubmit}
                onSubmit={this.onSubmit}
                title={tittle}
                description={description}
                route="/admin/claimType"
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClaimType);