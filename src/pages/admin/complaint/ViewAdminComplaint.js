import React from "react";
import { connect } from "react-redux";
import { getComplains } from "../../../common/store/actions/complain/complain.actions";
import {
  getAllComplains,
  getError,
} from "../../../common/store/selectors/complains.selector";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import CustomDataGrid from "../../../common/components/CustomDataGrid";

function mapDispatchToProps(dispatch) {
  return {
    getComplains: (data) => {
      dispatch(getComplains(data));
    },
  };
}

function mapStateToProps(state) {
  return {
    complaints: getAllComplains(state),
    complainsError: getError(state),
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

class ViewAdminComplaint extends React.Component {
  constructor(props) {
    super(props);

    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getComplains("WHERE ID_ESTADO != 6");
  }

  renderColumns() {
    return [
      {
        field: "createdBy",
        headerName: "Creado por",
        width: 200,
      },
      {
        field: "createdAt",
        headerName: "Fecha de creación",
        width: 200,
      },
      {
        field: "department",
        headerName: "Departamento",
        width: 200,
      },
      {
        field: "type",
        headerName: "Tipo de queja",
        width: 200,
      },
      {
        field: "description",
        headerName: "Descripción",
        width: 400,
      },
      {
        field: "action",
        headerName: "Acciones",
        width: 200,
        renderCell: (row) => (
          <Button
            style={{
              backgroundColor: "rgba(94, 222, 78, 0.7)",
              marginRight: 40,
              padding: "3px 35px",
            }}
            variant="contained"
            color="primary"
            component={Link}
            to={`/admin/complaint/response/${row.id}`}
            startIcon={<CreateIcon />}
          >
            Responder
          </Button>
        ),
        disableExport: true,
      },
    ];
  }

  render() {
    const { complaints } = this.props;

    return (
      <Box p={3}>
        <CustomDataGrid
          rows={complaints.map((complaint) => {
            return dataGridRow(
              complaint.personName,
              complaint.date,
              complaint.departmentName,
              complaint.complainTypeName,
              complaint.description,
              complaint.id
            );
          })}
          columns={this.renderColumns()}
          fileName="Reporte de quejas de todos los usuarios"
        />
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdminComplaint);
