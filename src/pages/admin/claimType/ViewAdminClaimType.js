import React from "react";
import { connect } from "react-redux";
import * as claimsActions from "../../../common/store/actions/claim/claim.action";
import * as claimsSelector from "../../../common/store/selectors/claim.selector";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

function mapDispatchToProps(dispatch) {
  return {
    getClaimsTitle: () => {
      dispatch(claimsActions.getClaimsTitle());
    },
    deleteTypeClaim: (id) => {
      dispatch(claimsActions.deleteTypeClaim(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    error: claimsSelector.getClaimsError(state),
    claimsType: claimsSelector.getClaimsTitle(state),
  };
}

function dataGridRow(title, description, status, id) {
  return {
    title,
    description,
    status,
    id,
  };
}

class ViewAdminClaimType extends React.Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getClaimsTitle();
  }

  renderColumns() {
    return [
      {
        field: "title",
        headerName: "Titulo",
        width: 300,
      },
      {
        field: "description",
        headerName: "Descripción",
        width: 300,
      },
      {
        field: "status",
        headerName: "Estado",
        width: 300,
      },
      {
        field: "action",
        headerName: "Acciones",
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
              to={`/admin/claimType/edit/${row.id}`}
              startIcon={<CreateIcon />}
            >
              Editar
            </Button>

            <Button
              style={{
                backgroundColor: "#e8605d",
                padding: "3px 35px",
              }}
              onClick={() => this.onDelete(row.id)}
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
            >
              Borrar
            </Button>
          </React.Fragment>
        ),
        disableExport: true,
      },
    ];
  }

  onDelete(id) {
    if (
      window.confirm(
        "Esta seguro de que quiere eliminar este tipo de reclamación"
      )
    ) {
      this.props.deleteTypeClaim(id);
    }
  }

  render() {
    const { claimsType } = this.props;

    return (
      <Box p={3}>
        <CustomDataGrid
          rows={claimsType.map((claimType) => {
            return dataGridRow(
              claimType.tittle,
              claimType.description,
              claimType.stateName,
              claimType.id
            );
          })}
          columns={this.renderColumns()}
          createRoute="/admin/claimType/create"
          createLabel="Crear tipo de reclamación"
          createButton={true}
          fileName="Reporte de tipo de reclamación"
        />
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminClaimType);
