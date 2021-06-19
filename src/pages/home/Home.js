import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// Complain redux stuff
import { getComplains, deleteComplain } from '../../common/store/actions/complain/complain.actions';
import { getAllComplains, getError, complainDeleted } from '../../common/store/selectors/complains.selector';
// User redux stuff
import { getAuthUser } from '../../common/store/selectors/user.selector';
// Claim redux stuff
import { getClaims, deleteClaim } from '../../common/store/actions/claim/claim.action';
import { getAllClaims, getClaimsError } from '../../common/store/selectors/claim.selector';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import CustomTable from '../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
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
        }
    }
}

function mapStateToProps(state) {
    return {
        allComplains: getAllComplains(state),
        complainError: getError(state),
        user: getAuthUser(state),
        complainDeleted: complainDeleted(state),
        allClaims: getAllClaims(state),
        claimError: getClaimsError(state)
    }
}

const styles = () => ({
    secondaryBar: {
      zIndex: 0,
    }
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
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function createData(userName, department,description, complaintType, date, state, id){
    return { userName, department, description, complaintType, date, state, id };
}
  
const complaintColumns = [
    "Creado Por",
    "Departamento",
    "Descripción",
    "Tipo de Queja",
    "Creado en",
    "Estado",
];

const claimColumns = [
    "Creado Por",
    "Departamento",
    "Descripción",
    "Tipo de Reclamación",
    "Creado en",
    "Estado",
];

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 0,
            allComplains: [],
            allClaims: []
        }

        this.changeTab = this.changeTab.bind(this);
        this.deleteComplain = this.deleteComplain.bind(this);
        this.deleteClaim = this.deleteClaim.bind(this);
    }

    componentDidMount(){
        this.props.getComplains(this.props.user.id);
        this.props.getClaims(this.props.user.id);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.allComplains !== this.props.allComplains){
            this.setState({ allComplains: this.props.allComplains });
        }
        if(prevProps.allClaims !== this.props.allClaims){
            this.setState({ allClaims: this.props.allClaims });
        }
    }

    changeTab(event, newValue){
        this.setState({ selectedTab: newValue });
    }

    deleteComplain(id){
        if(window.confirm("Esta seguro de que quiere eliminar esta queja?")){
            this.props.deleteComplain(id);
        }
    }

    deleteClaim(id){
        if(window.confirm("Esta seguro de que quiere eliminar esta queja?")){
            this.props.deleteClaim(id)
        }
    }

    render(){
        const { classes, complainError, claimError } = this.props;
        const { selectedTab, allComplains, allClaims } = this.state;

        return (
            <div>
                <AppBar
                    component="div"
                    className={classes.secondaryBar}
                    color="primary"
                    position="static"
                    elevation={0}
                >
                    <Tabs value={selectedTab} onChange={this.changeTab} textColor="inherit">
                        <Tab textColor="inherit" label="Quejas" />
                        <Tab textColor="inherit" label="Reclamaciones" />
                    </Tabs>
                </AppBar>
                <TabPanel value={selectedTab} index={0}>
                    <CustomTable 
                        columns={complaintColumns}
                        rows={allComplains.map((complain) => {
                            return createData(
                                complain.personName,
                                complain.departmentName,
                                complain.description,
                                complain.complainTypeName,
                                complain.date,
                                complain.stateTittle,
                                complain.id,
                            );
                        })}
                        deleteRequest={this.deleteComplain}
                        addButtonText={'Crear queja'}
                        redirect={'/create/complaint'}
                        editRedirect={'/edit/complaint'}
                        NotFoundMessage={'No se han creado ninguna queja'}
                    />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                <CustomTable 
                        columns={claimColumns}
                        rows={allClaims.map((claim) => {
                            return createData(
                                claim.personName,
                                claim.departmentName,
                                claim.description,
                                claim.complainTypeName,
                                claim.date,
                                claim.stateTittle,
                                claim.id,
                            );
                        })}
                        deleteRequest={this.deleteClaim}
                        addButtonText={'Crear reclamación'}
                        redirect={'/create/claim'}
                        editRedirect={'/edit/claim'}
                        NotFoundMessage={'No se han creado ninguna reclamación'}
                    />
                </TabPanel>
            </div>
        )
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);