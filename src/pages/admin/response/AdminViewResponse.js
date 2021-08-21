import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  getClaimsAnswer,
  getComplainsAnswer,
} from "../../../common/store/actions/answer/answer.actions";
import {
  getClaimAnswer,
  getComplaintAnswer,
  getAnswerError,
} from "../../../common/store/selectors/answer.selector";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import CustomTable from "../../../common/components/CustomTable";
import CustomDataGrid from "../../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import CustomRating from "../../../common/components/CustomRating";

function mapDispatchToProps(dispatch) {
  return {
    getClaimsAnswer: () => {
      dispatch(getClaimsAnswer());
    },
    getComplainsAnswer: () => {
      dispatch(getComplainsAnswer());
    },
  };
}

function mapStateToProps(state) {
  return {
    claims: getClaimAnswer(state),
    complaints: getComplaintAnswer(state),
    answerError: getAnswerError(state),
  };
}

const styles = () => ({
  secondaryBar: {
    zIndex: 0,
  },
});

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

const columns = [
  "Respondido por",
  "Creado por",
  "Fecha de creación",
  "Departamento",
  "Respuesta",
];

function dataGridRow(employee, user, date, department, response, id, rating) {
  return {
    answerBy: employee,
    createdBy: user,
    createdAt: date,
    department,
    response,
    id,
    rating,
  };
}

class AdminViewResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };

    this.changeTab = this.changeTab.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getClaimsAnswer();
    // This gets launched but in the epic
    // this.props.getComplainsAnswer();
  }

  renderColumns() {
    return [
      {
        field: "answerBy",
        headerName: "Respondido por",
        width: 250,
      },
      {
        field: "createdBy",
        headerName: "Creado por",
        width: 250,
      },
      {
        field: "createdAt",
        headerName: "Fecha de creación",
        width: 250,
      },
      {
        field: "department",
        headerName: "Departamento",
        width: 250,
      },
      {
        field: "response",
        headerName: "Respuesta",
        width: 250,
      },
      {
        field: "rating",
        headerName: "Valoración",
        renderCell: (params) => {
          return <CustomRating readOnly {...params} />;
        },
        disableExport: false,
        width: 300,
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
          className={classes.secondaryBar}
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
                complaint.id,
                complaint.rating
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuestas de queja"
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
                claim.id,
                claim.rating
              );
            })}
            columns={this.renderColumns()}
            fileName="Reporte de respuestas de reclamación"
          />
        </TabPanel>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AdminViewResponse);
