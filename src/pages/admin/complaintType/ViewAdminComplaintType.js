import React from "react";
import { connect } from "react-redux";
import * as complainsActions from "../../../common/store/actions/complain/complain.actions";
import * as complainsSelector from "../../../common/store/selectors/complains.selector";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

function mapDispatchToProps(dispatch) {
  return {
    getComplainsTitle: () => {
      dispatch(complainsActions.getComplainsTitle());
    },
    deleteTypeComplaint: (id) => {
      dispatch(complainsActions.deleteTypeComplaint(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    error: complainsSelector.getError(state),
    complaintsType: complainsSelector.getComplainsTitle(state),
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

class ViewAdminComplaintType extends React.Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getComplainsTitle();
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
              to={`/admin/complaintType/edit${row.id}`}
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
      },
    ];
  }

  onDelete(id) {
    if (
      window.confirm(
        "Esta seguro de que quiere eliminar este tipo de reclamación"
      )
    ) {
      this.props.deleteTypeComplaint(id);
    }
  }

  render() {
    const { complaintsType } = this.props;

    return (
      <Box p={3}>
        <CustomDataGrid
          rows={complaintsType.map((complaintType) => {
            return dataGridRow(
              complaintType.tittle,
              complaintType.description,
              complaintType.stateName,
              complaintType.id
            );
          })}
          columns={this.renderColumns()}
          createRoute="/admin/complaintType/create"
          createLabel="Crear tipo de queja"
          createButton={true}
          fileName="Reporte de tipo de queja"
        />
      </Box>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAdminComplaintType);
