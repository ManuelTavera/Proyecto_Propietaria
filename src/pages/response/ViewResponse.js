import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getClaimsAnswer,
  getComplainsAnswer,
  updateAnswer,
} from "../../common/store/actions/answer/answer.actions";
import {
  getClaimAnswer,
  getComplaintAnswer,
  getAnswerError,
  getAnswerUpdated,
} from "../../common/store/selectors/answer.selector";
import { getAuthUser } from "../../common/store/selectors/user.selector";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../common/components/CustomDataGrid";
import CustomRating from "../../common/components/CustomRating";

function mapDispatchToProps(dispatch) {
  return {
    getClaimsAnswer: (data) => {
      dispatch(getClaimsAnswer(data));
    },
    getComplainsAnswer: (data) => {
      dispatch(getComplainsAnswer(data));
    },
    updateAnswer: (data) => {
      dispatch(updateAnswer(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    claims: getClaimAnswer(state),
    complaints: getComplaintAnswer(state),
    answerError: getAnswerError(state),
    user: getAuthUser(state),
    answerUpdate: getAnswerUpdated(state),
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function dataGridRow(
  employee,
  user,
  date,
  department,
  response,
  rating,
  id,
  answerData
) {
  return {
    answerBy: employee,
    createdBy: user,
    createdAt: date,
    department: department,
    answer: response,
    rating,
    id,
    answerData,
  };
}

class ViewResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };

    this.changeTab = this.changeTab.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  componentDidMount() {
    this.props.getClaimsAnswer(this.props.user.id);
    // This gets launched but in the epic
    // this.props.getComplainsAnswer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.answerUpdate !== prevProps.answerUpdate) {
      this.props.getClaimsAnswer(this.props.user.id);
    }
  }

  updateRating(newRating, rowData) {
    if (newRating !== rowData.rating) {
      const data = {
        claim: rowData.claim === 0 ? null : rowData.claim,
        complain: rowData.complain === 0 ? null : rowData.complain,
        employee: rowData.employee,
        rating: newRating,
        message: rowData.message,
        id: rowData.id,
      };

      this.props.updateAnswer(data);
    }
  }

  renderColumns() {
    return [
      {
        field: "answerBy",
        headerName: "Respondido por",
        width: 300,
      },
      {
        field: "createdBy",
        headerName: "Creado por",
        width: 300,
      },
      {
        field: "createdAt",
        headerName: "Fecha de creación",
        width: 300,
      },
      {
        field: "department",
        headerName: "Departamento",
        width: 300,
      },
      {
        field: "answer",
        headerName: "Respuesta",
        width: 350,
        resizable: true,
      },
      {
        field: "rating",
        headerName: "Valoración",
        renderCell: (params) => {
          return <CustomRating readOnly {...params} />;
        },
        renderEditCell: (params) => {
          return <CustomRating {...params} updateRating={this.updateRating} />;
        },
        disableExport: false,
        width: 300,
        editable: true,
      },
    ];
  }

  changeTab(event, newValue) {
    this.setState({ selectedTab: newValue });
  }

  render() {
    const { claims, complaints } = this.props;
    const { selectedTab } = this.state;

    return (
      <div>
        <AppBar
          component="div"
          style={{ zIndex: 0 }}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs
            value={selectedTab}
            onChange={this.changeTab}
            textColor="inherit"
          >
            <Tab textColor="inherit" label="Quejas" />
            <Tab textColor="inherit" label="Reclamaciones" />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTab} index={0}>
          <CustomDataGrid
            rows={complaints.map((complaint) => {
              return dataGridRow(
                complaint.employeeName,
                complaint.complainPerson,
                complaint.date,
                complaint.complaintDepartment,
                complaint.message,
                complaint.rating,
                complaint.id,
                complaint
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuesta de queja"
            isCellEditable={(params) => params.row.rating === 0}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <CustomDataGrid
            rows={claims.map((claim) => {
              return dataGridRow(
                claim.employeeName,
                claim.claimPerson,
                claim.date,
                claim.claimDepartment,
                claim.message,
                claim.rating,
                claim.id,
                claim
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuesta de reclamación"
            isCellEditable={(params) => params.row.rating === 0}
          />
        </TabPanel>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewResponse);
