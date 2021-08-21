import React from "react";
import { connect } from "react-redux";
import {
  getDepartments,
  deleteDepartment,
} from "../../../common/store/actions/department/department.action";
import {
  getAllDepartments,
  getErrorDepartment,
  getDepartmentDeleted,
} from "../../../common/store/selectors/department.selector";
import Box from "@material-ui/core/Box";
import CustomDataGrid from "../../../common/components/CustomDataGrid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

function mapDispatchToProps(dispatch) {
  return {
    getDepartments: () => {
      dispatch(getDepartments());
    },
    deleteDepartment: (id) => {
      dispatch(deleteDepartment(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    departments: getAllDepartments(state),
    error: getErrorDepartment(state),
    departmentDeleted: getDepartmentDeleted(state),
  };
}

function dataGridRow(departmentName, managerName, id) {
  return {
    departmentName,
    managerName,
    id,
  };
}

class ViewDepartment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allDepartments: [],
    };

    this.deleteDepartment = this.deleteDepartment.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
  }

  componentDidMount() {
    this.props.getDepartments();
  }

  renderColumns() {
    return [
      {
        field: "departmentName",
        headerName: "Nombre del departamento",
        width: 400,
      },
      {
        field: "managerName",
        headerName: "Nombre del encargado",
        width: 400,
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
              to={`/admin/edit/department/${row.id}`}
              startIcon={<CreateIcon />}
            >
              Editar
            </Button>

            <Button
              style={{
                backgroundColor: "#e8605d",
                padding: "3px 35px",
              }}
              onClick={() => this.deleteDepartment(row.id)}
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

  componentDidUpdate(prevProps) {
    if (prevProps.departments !== this.props.departments) {
      this.setState({ allDepartments: this.props.departments });
    }
    if (
      prevProps.departmentDeleted !== this.props.departmentDeleted &&
      this.props.departmentDeleted
    ) {
      window.alert("Se ha eliminado exitosamente el departamento");
    } else if (
      prevProps.error !== this.props.error &&
      !this.props.departmentDeleted &&
      this.props.error
    ) {
      window.alert(this.props.error);
    }
  }

  deleteDepartment(id) {
    if (window.confirm("Estas seguro de que desea eliminar el departamento?")) {
      this.props.deleteDepartment(id);
    }
  }

  render() {
    const { allDepartments } = this.state;

    return (
      <Box p={3}>
        <CustomDataGrid
          rows={allDepartments.map((department) => {
            return dataGridRow(
              department.departmentName,
              department.managerName,
              department.id
            );
          })}
          createRoute="/admin/create/department"
          createLabel="Crear departamento"
          createButton={true}
          fileName="Reporte de departamentos"
          columns={this.renderColumns()}
        />
      </Box>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDepartment);
