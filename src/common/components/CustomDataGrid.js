import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@material-ui/data-grid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{ fileName: props.fileName, utf8WithBom: true }}
      />
      {props.createButton && (
        <Button
          component={Link}
          to={props.redirect}
          style={{ marginLeft: "auto" }}
        >
          {props.buttonName}
        </Button>
      )}
    </GridToolbarContainer>
  );
}

const styles = () => ({
  root: {
    backgroundColor: "#FFF",
  },
});

class CustomDataGrid extends React.PureComponent {
  render() {
    const {
      rows,
      columns,
      pageSize,
      createRoute,
      createLabel,
      fileName,
      createButton,
      classes,
    } = this.props;

    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize ? pageSize : 5}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              redirect: createRoute,
              buttonName: createLabel,
              fileName: fileName,
              createButton: createButton,
            },
          }}
          rowsPerPageOptions={[5, 10, 15, 20]}
          classes={{
            root: classes.root,
          }}
          onCellEditCommit={this.props.onCellEditCommit}
          onCellEditStop={this.props.onCellEditStop}
          isCellEditable={this.props.isCellEditable}
          onEditCellPropsChange={this.props.onEditCellPropsChange}
        />
      </div>
    );
  }
}

CustomDataGrid.defaultProps = {
  createButton: false,
};

export default withStyles(styles)(CustomDataGrid);
