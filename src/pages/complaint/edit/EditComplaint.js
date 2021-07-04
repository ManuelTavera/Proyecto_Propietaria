import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle, updateComplain } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError, getAllComplains, getComplainsUpdated } from '../../../common/store/selectors/complains.selector';
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
        complainsUpdated: getComplainsUpdated(state),
    }
}

class EditComplaint extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            department: null,
            description: null,
            complaint: null,
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){
        this.props.getComplainsTitle();

        const id = parseInt(this.props.match.params.complaintId);
        const complaint = this.props.allComplaints.find((complaint) => complaint.id === id);
        this.setState({ description: complaint.description, complaint: complaint })
    }

    componentDidUpdate(prevProps){
        if(prevProps.complainsUpdated !== this.props.complainsUpdated && this.props.complainsUpdated){
            window.alert("La queja se ha actualizado exitosamente")
        }
        if(prevProps.complaintsTitle !== this.props.complaintsTitle){
            const { complaint } = this.state;
            const { complaintsTitle } = this.props;
            const title = complaintsTitle.find((title) => complaint.complainTypeName === title.tittle);
            this.setState({ title: title })
        }
        if(prevProps.allDepartments !== this.props.allDepartments){
            const { complaint } = this.state;
            const { allDepartments } = this.props;
            const department = allDepartments.find((department) => department.departmentName === complaint.departmentName)
            this.setState({ department: department })
        }
    }

    onFieldChange(field, value){
        this.setState({[field]: value});
    }

    onSubmit(){
        const { title, department, description, complaint } = this.state;
        const idPerson = this.props.authUser.id;
        // const idDeparment = this.props.allDepartments.find((department) => department.departmentName === this.state.department)
        const date = new Date().toISOString();
        // const idComplaint = this.props.complaintsTitle.find((complain) => complain.tittle === this.state.title)

        const data = {
            id: complaint.id,
            idPerson: idPerson,
            idDepartment: department.id,
            date: date.replace('-', '').replace('-', '').slice(0, 8),
            description: description,
            idComplainType: title.id,
            idState: title.stateId
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
                    titleOptions={complaintsTitle}
                    titleLabel="Seleccione el tipo de queja"
                    pageTitle="Editar Quejas"
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

export default connect(mapStateToProps, mapDispatchToProps)(EditComplaint);
