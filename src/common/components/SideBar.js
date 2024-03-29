import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import BallotIcon from '@material-ui/icons/Ballot';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import { getAuthUser } from '../store/selectors/user.selector';

function mapStateToProps(state) {
  return {
    authUser: getAuthUser(state),
  }
}

const adminCategories = [
  {
    id: 'Administrar',
    children: [
      { id: 'Departamento', icon: <BusinessIcon/>, route: '/admin/department' },
      { id: 'Quejas', icon: <PriorityHighIcon/>, route: '/admin/complaint' },
      { id: 'Reclamación', icon: <BallotIcon/>, route: '/admin/claim' },
      { id: 'Respuestas', icon: <RateReviewIcon/>, route: '/admin/response' },
      { id: 'Tipos de reclamaciones', icon: <DescriptionIcon/>, route: '/admin/claimType' },
      { id: 'Tipo de quejas', icon: <DescriptionIcon/>, route: '/admin/complaintType' }
    ]
  }
];

const userRoutes = [
  {
    id: 'Solicitudes',
    children: [
      { id: 'Respuestas', icon: <ChatIcon />, route: '/response' },
    ]
  }
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function SideBar(props) {
  const { classes, authUser, location, ...other } = props;

  const categories = authUser.user.userType === 3 ? adminCategories: userRoutes;
  const homeRoute = authUser.user.userType === 3 ? '/admin/home': '/home';

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Application
        </ListItem>
        <ListItem 
          className={clsx(classes.item, classes.itemCategory)}
          component={Link} 
          to={homeRoute}
        >
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Home
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, route }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, location.pathname == route && classes.itemActiveItem)}
                component={Link}
                to={route}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withRouter, connect(mapStateToProps), withStyles(styles))(SideBar);