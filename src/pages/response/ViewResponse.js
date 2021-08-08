import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  getClaimsAnswer,
  getComplainsAnswer,
} from "../../common/store/actions/answer/answer.actions";
import {
  getClaimAnswer,
  getComplaintAnswer,
  getAnswerError,
} from "../../common/store/selectors/answer.selector";
import { getAuthUser } from "../../common/store/selectors/user.selector";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../common/components/CustomDataGrid";

function mapDispatchToProps(dispatch) {
  return {
    getClaimsAnswer: (data) => {
      dispatch(getClaimsAnswer(data));
    },
    getComplainsAnswer: (data) => {
      dispatch(getComplainsAnswer(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    claims: getClaimAnswer(state),
    complaints: getComplaintAnswer(state),
    answerError: getAnswerError(state),
    user: getAuthUser(state),
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

function dataGridRow(employee, user, date, department, response, id) {
  return {
    answerBy: employee,
    createdBy: user,
    createdAt: date,
    department: department,
    answer: response,
    id,
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
  }

  componentDidMount() {
    this.props.getClaimsAnswer(this.props.user.id);
    // This gets launched but in the epic
    // this.props.getComplainsAnswer();
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
    ];
  }

  changeTab(event, newValue) {
    this.setState({ selectedTab: newValue });
  }

  render() {
    const { classes, claims, complaints } = this.props;
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
                complaint.id
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuesta de queja"
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
                claim.id
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuesta de reclamación"
          />
        </TabPanel>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewResponse);
