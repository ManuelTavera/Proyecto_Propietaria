import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle, createComplain } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError, getComplainCreated } from '../../../common/store/selectors/complains.selector';
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
        authUser: getAuthUser(state),
        complainCreated: getComplainCreated(state)
    }
}

class CreateComplaint extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            department: null,
            description: '',
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){
        this.props.getComplainsTitle();
    }

    componentDidUpdate(prevProps){
        if(prevProps.complainCreated !== this.props.complainCreated && this.props.complainCreated){
            window.alert("Se ha creado la queja exitosamente")
        }
    }

    onFieldChange(field, value){
        this.setState({[field]: value})
    }

    onSubmit(){
        const { title, department, description } = this.state;
        const idPerson = this.props.authUser.id;
        const date = new Date().toISOString();
        
        const data = {
            idPerson: idPerson,
            idDepartment: department.id,
            date: date.replace('-', '').replace('-', '').slice(0, 8),
            description: description,
            idComplainType: title.id,
            idState: title.stateId
        }

        this.props.createComplain(data);
    }

    render(){
        const { complaintsTitle, allDepartments, error } = this.props
        const { title, department, description, } = this.state

        return(
            <ComplaintReclaimBody
                titleOptions={complaintsTitle}
                titleLabel="Seleccione el tipo de queja"
                pageTitle="Crear Quejas"
                deparmentOptions={allDepartments}
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
