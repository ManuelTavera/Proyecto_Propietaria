import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getClaimsTitle, createClaim, updateClaim } from '../../../common/store/actions/claim/claim.action';
import { getClaimsTitle as getTitle , getClaimsError, getAllClaims, getClaimUpdated, getClaimsCreated } from '../../../common/store/selectors/claim.selector';
import { getDepartments } from '../../../common/store/actions/department/department.action';
import { getAllDepartments, getErrorDepartment } from '../../../common/store/selectors/department.selector';
import { getAuthUser } from '../../../common/store/selectors/user.selector';

function mapDispatchToProps(dispatch){
    return {
        getClaimsTitle: () => {
            dispatch(getClaimsTitle());
        },
        getDepartments: () => {
            dispatch(getDepartments());
        },
        createClaim: (data) => {
            dispatch(createClaim(data))
        },
        updateClaim: (data) => {
            dispatch(updateClaim(data))
        }
    }
  }
  
function mapStateToProps(state) {
    return {
        claimsTitle: getTitle(state),
        error: getClaimsError(state),
        allDepartments: getAllDepartments(state),
        authUser: getAuthUser(state),
        errorDepartment: getErrorDepartment(state),
        allClaims: getAllClaims(state),
        claimUpdated: getClaimUpdated(state),
    }
}

class EditClaim extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: null,
            department: null,
            description: null,
            claim: null,
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getClaimsTitle();
        this.props.getDepartments();

        const id = parseInt(this.props.match.params.claimId);
        const claim = this.props.allClaims.find((claim) => claim.id === id);
        this.setState({ description: claim.description, claim: claim });
    }

    componentDidUpdate(prevProps){
        if(prevProps.claimUpdated !== this.props.claimUpdated && this.props.claimUpdated){
            window.alert("La reclamación se ha actualizado exitosamente")
        }
        if(prevProps.claimsTitle !== this.props.claimsTitle){
            const { claim } = this.state;
            const { claimsTitle } = this.props;
            const title = claimsTitle.find((title) => claim.claimTypeName === title.tittle);
            this.setState({ title: title })
        }
        if(prevProps.allDepartments !== this.props.allDepartments){
            const { claim } = this.state;
            const { allDepartments } = this.props;
            const department = allDepartments.find((department) => department.departmentName === claim.departmentName)
            this.setState({ department: department })
        }
    }

    onFieldChange(field, value){
        this.setState({[field]: value});
    }

    onSubmit(){
        const { title, department, description, claim } = this.state;
        const idPerson = this.props.authUser.id;
        const date = new Date().toISOString();

        const data = {
            id: claim.id,
            idPerson: idPerson,
            idDepartment: department.id,
            date: date.replace('-', '').replace('-', '').slice(0, 8),
            description: description,
            claimType: title.id,
            idState: title.stateId
        }

        this.props.updateClaim(data);
    }

    render(){
        const { claimsTitle, allDepartments, error } = this.props
        const { title, department, description, claim } = this.state

        return (
            <React.Fragment>
            { claim !== null && allDepartments.length > 0 &&
                <ComplaintReclaimBody
                    titleOptions={claimsTitle}
                    titleLabel="Seleccione el tipo de queja"
                    pageTitle="Editar Reclamación"
                    deparmentOptions={allDepartments}
                    descriptions={description}
                    complaintTitle={title}
                    department={department}
                    onFieldChange={this.onFieldChange}
                    onSubmit={this.onSubmit}
                    edit={true}
                />
            }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClaim);

