import React from "react";
import { connect } from "react-redux";
import { getClaims } from "../../../common/store/actions/claim/claim.action";
import {
  getAllClaims,
  getClaimsError,
} from "../../../common/store/selectors/claim.selector";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function mapDispatchToProps(dispatch) {
  return {
    getClaims: (data) => {
      dispatch(getClaims(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    claims: getAllClaims(state),
    claimsError: getClaimsError(state),
  };
}

function dataGridRow(person, date, department, type, description, id) {
  return {
    createdBy: person,
    createdAt: date,
    department,
    type,
    description,
    id,
  };
}

class ViewAdminClaim extends React.Component {
  constructor(props) {
    super(props);

    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getClaims("WHERE ID_ESTADO != 6");
  }

  renderColumns() {
    return [
      {
        field: "createdBy",
        headerName: "Creado Por",
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
        field: "type",
        headerName: "Tipo de reclamación",
        width: 250,
      },
      {
        field: "description",
        headerName: "Descripción",
        width: 250,
      },
      {
        field: "action",
        headerName: "",
        width: 150,
        renderCell: (row) => (
          <Button
            style={{
              backgroundColor: "rgba(94, 222, 78, 0.7)",
              padding: "3px 35px",
            }}
            variant="contained"
            color="primary"
            component={Link}
            to={`/admin/claim/response/${row.id}`}
          >
            Responder
          </Button>
        ),
        disableExport: true,
        disableColumnMenu: true,
      },
    ];
  }

  render() {
    const { claims } = this.props;

    return (
      <Box p={3}>
        <CustomDataGrid
          rows={claims.map((claim) => {
            return dataGridRow(
              claim.personName,
              claim.date,
              claim.departmentName,
              claim.claimTypeName,
              claim.description,
              claim.id
            );
          })}
          columns={this.renderColumns()}
          fileName="Reporte de reclamación de todos los usuarios"
        />
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminClaim);
