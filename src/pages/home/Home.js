import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getComplains } from '../../common/store/actions/complain/complain.actions';
import { getAllComplains, getError } from '../../common/store/selectors/complains.selector';

function mapDispatchToProps(dispatch){
    return {
        getComplains: () => {
            dispatch(getComplains());
        }
    }
}

function mapStateToProps(state) {
    return {
        allComplains: getAllComplains(state),
        error: getError(state),
    }
}

class Home extends React.Component {
    componentDidMount(){
        console.log('Pol khe')
        this.props.getComplains();
    }

    render(){
        return (
            <div>
                HOME
            </div>
        )
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);