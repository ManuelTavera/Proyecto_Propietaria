import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getClaimsTitle, createClaim } from '../../../common/store/actions/claim/claim.action';
import { getClaimsTitle as getTitle , getClaimsError } from '../../../common/store/selectors/claim.selector';
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
    }
}

class CreateClaim extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: null,
            department: null,
            description: '',
            titleId: null,
            departmentId: null,
            complaint: null,
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getClaimsTitle();
        this.props.getDepartments();
    }

    onFieldChange(field, value){
        this.setState({[field]: value})
    }

    onSubmit(){
        const idPerson = this.props.authUser.id;
        const idDeparment = this.props.allDepartments.find((department) => department.departmentName === this.state.department)
        const date = '20000101';
        const idClaim = this.props.claimsTitle.find((claim) => claim.tittle === this.state.title)
        
        const data = {  
            idPerson: idPerson,
            idDepartment: idDeparment.id,
            date: date,
            description: this.state.description,
            claimType: idClaim.id,
            idState: idClaim.stateId
        }

        this.props.createClaim(data);
    }

    render(){
        const { claimsTitle, allDepartments, error } = this.props
        const { title, department, description, complaint } = this.state

        return(
            <ComplaintReclaimBody
                titleOptions={claimsTitle.map(({ tittle }) => tittle)}
                titleLabel="Seleccione el tipo de reclamación"
                pageTitle="Crear Reclamación"
                deparmentOptions={allDepartments.map(({ departmentName }) => departmentName)}
                descriptions={description}
                complaintTitle={title}
                department={department}
                onFieldChange={this.onFieldChange}
                onSubmit={this.onSubmit}
            />
        )
        return <div>hola</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClaim);