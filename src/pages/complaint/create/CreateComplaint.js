import React from 'react';
import { connect } from 'react-redux';
import ComplaintReclaimBody from '../../../common/components/ComplaintReclaimBody';
import { getComplainsTitle } from '../../../common/store/actions/complain/complain.actions';
import { getComplainsTitle as getTitle, getError } from '../../../common/store/selectors/complains.selector';
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
        allDepartments: getAllDepartments(state)
    }
}

class CreateComplaint extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getComplainsTitle();
        this.props.getDepartments();
    }

    render(){
        const { complaintsTitle, error } = this.props

        return(
            <ComplaintReclaimBody
                titleOptions={complaintsTitle}
                titleLabel="Seleccione el tipo de queja"
                pageTitle="Crear Queja"
                deparmentOptions={[]}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComplaint);
