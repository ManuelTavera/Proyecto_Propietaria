import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getClaimsAnswer, getComplainsAnswer } from '../../../common/store/actions/answer/answer.actions';
import { getClaimAnswer, getComplaintAnswer, getAnswerError } from '../../../common/store/selectors/answer.selector';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import CustomTable from '../../../common/components/CustomTable';

function mapDispatchToProps(dispatch){
    return {
        getClaimsAnswer: () => {
            dispatch(getClaimsAnswer())
        },
        getComplainsAnswer: () => {
            dispatch(getComplainsAnswer())
        }
    }
}

function mapStateToProps(state){
    return {
        claims: getClaimAnswer(state),
        complaints: getComplaintAnswer(state),
        answerError: getAnswerError(state)
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

const columns = [
    "Respondido por",
    "Creado por",
    "Fecha de creación",
    "Departamento",
    "Respuesta"
];

function createData(employee, user, date, department, response, id){
    let dataRow = new Map();
    dataRow.set(columns[0], employee);
    dataRow.set(columns[1], user);
    dataRow.set(columns[2], date);
    dataRow.set(columns[3], department);
    dataRow.set(columns[4], response);
    dataRow.set('id', id);

    return dataRow;
}

class AdminViewResponse extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab: 0,
        }

        this.changeTab = this.changeTab.bind(this);
    }

    componentDidMount(){
        this.props.getClaimsAnswer();
        // This gets launched but in the epic
        // this.props.getComplainsAnswer();
    }

    changeTab(event, newValue){
        this.setState({ selectedTab: newValue });
    }

    render(){
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
                    <Tabs value={selectedTab} onChange={this.changeTab} textColor="inherit">
                        <Tab textColor="inherit" label="Quejas" />
                        <Tab textColor="inherit" label="Reclamaciones" />
                    </Tabs>
                </AppBar>
                <TabPanel value={selectedTab} index={0}>
                    <CustomTable 
                        columns={columns}
                        showButton={false}
                        rows={complaints.map((complaint) => {
                            return createData(
                                complaint.employeeName,
                                complaint.complainPerson,
                                complaint.date,
                                complaint.departmentName,
                                complaint.message,
                                complaint.id
                            )
                        })}
                        response
                        editRedirect="/admin/response/claim"
                        NotFoundMessage="No se han registrado respuestas de queja"
                    />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <CustomTable 
                        columns={columns}
                        showButton={false}
                        rows={claims.map((claim) => {
                            return createData(
                                claim.employeeName,
                                claim.claimPerson,
                                claim.date,
                                claim.departmentName,
                                claim.message,
                                claim.id
                            )
                        })}
                        response
                        editRedirect="/admin/response/complaint"
                        NotFoundMessage="No se han registrado respuestas de reclamación"
                    />
                </TabPanel>
            </div>
        )
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AdminViewResponse)