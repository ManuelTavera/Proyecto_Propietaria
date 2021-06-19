import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle, updateComplain } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError, getAllComplains } from '../../../common/store/selectors/complains.selector';
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
      updateComplain: (data) => {
          dispatch(updateComplain(data));
      }
    }
  }
  
function mapStateToProps(state) {
    return {
        complaintsTitle: getTitle(state),
        error: getError(state),
        allComplaints: getAllComplains(state),
        allDepartments: getAllDepartments(state),
        authUser: getAuthUser(state),
    }
}

class EditComplaint extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            department: null,
            description: null,
            titleId: null,
            departmentId: null,
            complaint: null,
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){
        this.props.getComplainsTitle();

        const id = parseInt(this.props.match.params.complaintId);
        const complaint = this.props.allComplaints.find((complaint) => complaint.id === id);
        this.setState({ title: complaint.complainTypeName, department: complaint.departmentName, description: complaint.description, complaint: complaint })

    }

    onFieldChange(field, value){
        this.setState({[field]: value});
    }

    onSubmit(){
        const idPerson = this.props.authUser.id;
        const idDeparment = this.props.allDepartments.find((department) => department.departmentName === this.state.department)
        const date = this.state.complaint.date;
        const idComplaint = this.props.complaintsTitle.find((complain) => complain.tittle === this.state.title)

        const data = {
            id: this.state.complaint.id,
            idPerson: idPerson,
            idDepartment: idDeparment.id,
            date: date,
            description: this.state.description,
            idComplainType: idComplaint.id,
            idState: idComplaint.stateId
        }

        this.props.updateComplain(data);
    }

    render(){
        const { complaintsTitle, allDepartments, error } = this.props
        const { title, department, description, complaint } = this.state
        
        return(
            <React.Fragment>
            { complaint !== null && allDepartments.length > 0 &&
                <ComplaintReclaimBody
                    titleOptions={complaintsTitle.map(({ tittle }) => tittle)}
                    titleLabel="Seleccione el tipo de queja"
                    pageTitle="Editar Quejas"
                    deparmentOptions={allDepartments.map(({ departmentName }) => departmentName)}
                    descriptions={description}
                    complaintTitle={title}
                    department={department}
                    onFieldChange={this.onFieldChange}
                    onSubmit={this.onSubmit}
                />
            }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComplaint);
