import React from 'react';
import { connect } from 'react-redux';
import { createTypeComplaint } from '../../../common/store/actions/complain/complain.actions';
import { getError, getComplainTypeCreated } from '../../../common/store/selectors/complains.selector';
import ClaimComplaintBody from '../../../common/components/ClaimComplaintBody';

function mapDispatchToProps(dispatch){
    return {
        createTypeComplaint: (data) => {
            dispatch(createTypeComplaint(data))
        }
    }
}

function mapStateToProps(state){
    return {
        error: getError(state),
        complaintTypeCreated: getComplainTypeCreated(state),
    }
}

class CreateComplaintType extends React.Component{
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
            const { complaintType } = this.props;
            this.setState({
                tittle: complaintType.tittle,
                description: complaintType.description
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.error !== this.props.error){
            window.alert(this.props.error)
        }
        if(prevProps.complaintTypeCreated !== this.props.complaintTypeCreated){
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
            data['id'] = this.props.complaintType.id;

            this.props.updateTypeComplaint(data);
        }
        else{
            this.props.createTypeComplaint(data);
        }
    }

    render(){
        const { tittle, description } = this.state;
        const { pageTitle } = this.props;

        return(
            <ClaimComplaintBody
                pageTitle={pageTitle ? pageTitle: 'Crear tipo de queja'}
                onChange={this.onFieldChange}
                canSubmit={this.canSubmit}
                onSubmit={this.onSubmit}
                title={tittle}
                description={description}
                route="/admin/complaintType"
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComplaintType);