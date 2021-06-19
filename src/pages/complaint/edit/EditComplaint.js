import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError, getAllComplains } from '../../../common/store/selectors/complains.selector';
import { getDepartments } from '../../../common/store/actions/department/department.action';
import { getAllDepartments, getErrorDepartment } from '../../../common/store/selectors/department.selector';

function mapDispatchToProps(dispatch){
    return {
        getComplainsTitle: (data) => {
            dispatch(getComplainsTitle(data));
      },
      getDepartments: () => {
          dispatch(getDepartments());
      }
    }
  }
  
function mapStateToProps(state) {
    return {
        complaintsTitle: getTitle(state),
        error: getError(state),
        allComplaints: getAllComplains(state),
        allDepartments: getAllDepartments(state)
    }
}

class EditComplaint extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            department: null,
            description: null,
            complaint: null
        }

        this.onFieldChange = this.onFieldChange.bind(this);

    }

    componentDidMount(){
        this.props.getComplainsTitle();
        this.props.getDepartments();
        const id = parseInt(this.props.match.params.complaintId);
        const complaint = this.props.allComplaints.find((complaint) => complaint.id === id);
        this.setState({ title: complaint.complainTypeName, department: complaint.departmentName, description: complaint.description, complaint: complaint })
    }

    onFieldChange(field, value){
        this.setState({[field]: value});
    }

    render(){
        const { complaintsTitle, allDepartments, error } = this.props
        const { title, department, description, complaint } = this.state
        
        return(
            <React.Fragment>
            { complaint !== null &&
                <ComplaintReclaimBody
                    titleOptions={complaintsTitle.map(({ tittle }) => tittle)}
                    titleLabel="Seleccione el tipo de queja"
                    pageTitle="Editar Quejas"
                    deparmentOptions={allDepartments.map(({ departmentName }) => departmentName)}
                    descriptions={description}
                    complaintTitle={title}
                    department={department}
                    onFieldChange={this.onFieldChange}
                />
            }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComplaint);
