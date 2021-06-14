import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getComplains, deleteComplain } from '../../common/store/actions/complain/complain.actions';
import { getAllComplains, getError, complainDeleted } from '../../common/store/selectors/complains.selector';
import { getAuthUser } from '../../common/store/selectors/user.selector';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import CustomTable from '../../common/components/CustomTable';
import { Restaurant } from '@material-ui/icons';

function mapDispatchToProps(dispatch){
    return {
        getComplains: (id) => {
            dispatch(getComplains(id));
        },
        deleteComplain: (data) => {
            dispatch(deleteComplain(data));
        },
    }
}

function mapStateToProps(state) {
    return {
        allComplains: getAllComplains(state),
        error: getError(state),
        user: getAuthUser(state),
        complainDeleted: complainDeleted(state),
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

function createData({
    personName: userName, 
    departmentName: department,
    description, 
    complainTypeName: complaintType, 
    date, 
    stateTittle: state,
    ...rest
}) 
{
    return { userName, department, description, complaintType, date, state, rest };
}
  
const complaintColumns = [
    "Creado Por",
    "Departamento",
    "Descripción",
    "Tipo de Queja",
    "Creado en",
    "Estado",
];

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 0,
            allComplains: [],
        }

        this.changeTab = this.changeTab.bind(this);
        this.deleteComplain = this.deleteComplain.bind(this);
    }

    componentDidMount(){
        this.props.getComplains(this.props.user.id);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.allComplains !== this.props.allComplains){
            this.setState({ allComplains: this.props.allComplains });
        }
    }

    changeTab(event, newValue){
        this.setState({ selectedTab: newValue });
    }

    deleteComplain(complain){
        
        const {
            rest: { id, idComplainType, idDepartment, idPerson, idState},
            description,
            date
        } = complain;

        const data = {
            id,
            idComplainType,
            idDepartment,
            idPerson,
            idState,
            description,
            date
        }

        console.log('Data: ', data);
        this.props.deleteComplain(data);
    }

    render(){
        const { classes } = this.props;
        const { selectedTab, allComplains } = this.state;

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
                            return createData(complain);
                        })}
                        deleteComplain={this.deleteComplain}
                    />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    Reclamaciones
                </TabPanel>
            </div>
        )
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Home);