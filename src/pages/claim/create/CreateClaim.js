import React from "react";
import { connect } from "react-redux";
import ComplaintReclaimBody from "../../../common/components/ComplaintReclaimBody";
import {
  getClaimsTitle,
  createClaim,
} from "../../../common/store/actions/claim/claim.action";
import {
  getClaimsTitle as getTitle,
  getClaimsError,
  getClaimsCreated,
} from "../../../common/store/selectors/claim.selector";
import { getDepartments } from "../../../common/store/actions/department/department.action";
import {
  getAllDepartments,
  getErrorDepartment,
} from "../../../common/store/selectors/department.selector";
import { getAuthUser } from "../../../common/store/selectors/user.selector";

function mapDispatchToProps(dispatch) {
  return {
    getClaimsTitle: () => {
      dispatch(getClaimsTitle());
    },
    getDepartments: () => {
      dispatch(getDepartments());
    },
    createClaim: (data) => {
      dispatch(createClaim(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    claimsTitle: getTitle(state),
    error: getClaimsError(state),
    allDepartments: getAllDepartments(state),
    authUser: getAuthUser(state),
    errorDepartment: getErrorDepartment(state),
    claimCreated: getClaimsCreated(state),
  };
}

class CreateClaim extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      department: null,
      description: "",
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getClaimsTitle();
    this.props.getDepartments();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.claimCreated !== this.props.claimCreated &&
      this.props.claimCreated
    ) {
      window.alert("La reclamación se ha creado exitosamente");
    }
  }

  onFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  onSubmit() {
    const { title, department, description } = this.state;
    const idPerson = this.props.authUser.id;
    // const idDeparment = this.props.allDepartments.find((department) => department.departmentName === this.state.department)
    const date = new Date().toISOString();
    // const idClaim = this.props.claimsTitle.find((claim) => claim.tittle === this.state.title)

    const data = {
      idPerson: idPerson,
      idDepartment: department.id,
      date: date.replace("-", "").replace("-", "").slice(0, 8),
      description: description,
      claimType: title.id,
      idState: title.stateId,
    };

    this.props.createClaim(data);
  }

  render() {
    const { claimsTitle, allDepartments, error } = this.props;
    const { title, department, description } = this.state;

    return (
      <ComplaintReclaimBody
        titleOptions={claimsTitle}
        titleLabel="Seleccione el tipo de reclamación"
        pageTitle="Crear Reclamación"
        deparmentOptions={allDepartments}
        descriptions={description}
        complaintTitle={title}
        department={department}
        onFieldChange={this.onFieldChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClaim);
