import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Complain redux stuff
import {
  getComplains,
  deleteComplain,
} from "../../common/store/actions/complain/complain.actions";
import {
  getAllComplains,
  getError,
  complainDeleted,
} from "../../common/store/selectors/complains.selector";
// User redux stuff
import { getAuthUser } from "../../common/store/selectors/user.selector";
// Claim redux stuff
import {
  getClaims,
  deleteClaim,
} from "../../common/store/actions/claim/claim.action";
import {
  getAllClaims,
  getClaimsError,
} from "../../common/store/selectors/claim.selector";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function mapDispatchToProps(dispatch) {
  return {
    getComplains: (id) => {
      dispatch(getComplains(id));
    },
    deleteComplain: (data) => {
      dispatch(deleteComplain(data));
    },
    getClaims: (data) => {
      dispatch(getClaims(data));
    },
    deleteClaim: (id) => {
      dispatch(deleteClaim(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    allComplains: getAllComplains(state),
    complainError: getError(state),
    user: getAuthUser(state),
    complainDeleted: complainDeleted(state),
    allClaims: getAllClaims(state),
    claimError: getClaimsError(state),
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

function dataGridRow(userName, department, description, type, date, state, id) {
  return {
    createdBy: userName,
    department,
    description,
    type,
    createdAt: date,
    status: state,
    id,
  };
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
      allComplains: [],
      allClaims: [],
    };

    this.changeTab = this.changeTab.bind(this);
    this.deleteComplain = this.deleteComplain.bind(this);
    this.deleteClaim = this.deleteClaim.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getComplains(this.props.user.id);
    this.props.getClaims(this.props.user.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allComplains !== this.props.allComplains) {
      this.setState({ allComplains: this.props.allComplains });
    }
    if (prevProps.allClaims !== this.props.allClaims) {
      this.setState({ allClaims: this.props.allClaims });
    }
  }

  renderColumns(claimType = false) {
    return [
      {
        field: "createdBy",
        headerName: "Creado Por",
        width: 150,
      },
      {
        field: "department",
        headerName: "Departamento",
        width: 200,
      },
      {
        field: "description",
        headerName: "Descripción",
        width: 300,
      },
      {
        field: "type",
        headerName: claimType ? "Tipo de reclamación" : "Tipo de queja",
        width: 200,
      },
      {
        field: "createdAt",
        headerName: "Creado en",
        width: 150,
      },
      {
        field: "status",
        headerName: "Estado",
        width: 150,
      },
      {
        field: "action",
        headerName: "Borrar",
        width: 411,
        renderCell: (row) => (
          <React.Fragment>
            <Button
              style={{
                backgroundColor: "rgba(94, 222, 78, 0.7)",
                marginRight: 40,
                padding: "3px 35px",
              }}
              variant="contained"
              color="primary"
              component={Link}
              to={
                claimType
                  ? `/edit/claim/${row.id}`
                  : `/edit/complaint/${row.id}`
              }
            >
              Edit
            </Button>

            <Button
              style={{
                backgroundColor: "#e8605d",
                padding: "3px 35px",
              }}
              onClick={() =>
                claimType
                  ? this.deleteClaim(row.id)
                  : this.deleteComplain(row.id)
              }
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
          </React.Fragment>
        ),
        disableExport: true,
      },
    ];
  }

  changeTab(event, newValue) {
    this.setState({ selectedTab: newValue });
  }

  deleteComplain(id) {
    if (window.confirm("Esta seguro de que quiere eliminar esta queja?")) {
      this.props.deleteComplain(id);
    }
  }

  deleteClaim(id) {
    if (window.confirm("Esta seguro de que quiere eliminar esta queja?")) {
      this.props.deleteClaim(id);
    }
  }

  render() {
    const { selectedTab, allComplains, allClaims } = this.state;

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
            rows={allComplains.map((complain) =>
              dataGridRow(
                complain.personName,
                complain.departmentName,
                complain.description,
                complain.complainTypeName,
                complain.date,
                complain.stateTittle,
                complain.id
              )
            )}
            columns={this.renderColumns(false)}
            createRoute={"/create/complaint"}
            createLabel="Crear queja"
            fileName="Reporte de queja"
            createButton={true}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <CustomDataGrid
            rows={allClaims.map((claim) =>
              dataGridRow(
                claim.personName,
                claim.departmentName,
                claim.description,
                claim.claimTypeName,
                claim.date,
                claim.stateTittle,
                claim.id
              )
            )}
            columns={this.renderColumns(true)}
            createRoute={"/create/claim"}
            createLabel="Crear reclamación"
            fileName="Reporte de reclamación"
            createButton={true}
          />
        </TabPanel>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
