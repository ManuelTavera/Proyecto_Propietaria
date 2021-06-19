import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle, createComplain } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError } from '../../../common/store/selectors/complains.selector';
import { getDepartments } from '../../../common/store/actions/department/department.action';
import { getAllDepartments, getErrorDepartment } from '../../../common/store/selectors/department.selector';
import { getAuthUser } from '../../../common/store/selectors/user.selector';

function mapDispatchToProps(dispatch){
    return {
        getComplainsTitle: (data) => {
            dispatch(getComplainsTitle(data));
      },
      getDepartments: () => {
          dispatch(getDepartments());
      },
      createComplain: (data) => {
          dispatch(createComplain(data))
      }
    }
  }
  
function mapStateToProps(state) {
    return {
        complaintsTitle: getTitle(state),
        error: getError(state),
        allDepartments: getAllDepartments(state),
        authUser: getAuthUser(state)
    }
}

class CreateComplaint extends React.Component {
    constructor(props){
        super(props);

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
        this.props.getComplainsTitle();
    }

    onFieldChange(field, value){
        this.setState({[field]: value})
    }

    onSubmit(){
        const idPerson = this.props.authUser.id;
        const idDeparment = this.props.allDepartments.find((department) => department.departmentName === this.state.department)
        const date = '20000101';
        const idComplaint = this.props.complaintsTitle.find((complain) => complain.tittle === this.state.title)
        
        const data = {
            idPerson: idPerson,
            idDeparment: idDeparment.id,
            date: date,
            description: this.state.description,
            idComplainType: idComplaint.id,
            idState: idComplaint.stateId
        }

        this.props.createComplain(data);
    }

    render(){
        const { complaintsTitle, allDepartments, error } = this.props
        const { title, department, description, complaint } = this.state

        return(
            <ComplaintReclaimBody
                titleOptions={complaintsTitle.map(({ tittle }) => tittle)}
                titleLabel="Seleccione el tipo de queja"
                pageTitle="Crear Quejas"
                deparmentOptions={allDepartments.map(({ departmentName }) => departmentName)}
                descriptions={description}
                complaintTitle={title}
                department={department}
                onFieldChange={this.onFieldChange}
                onSubmit={this.onSubmit}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComplaint);
