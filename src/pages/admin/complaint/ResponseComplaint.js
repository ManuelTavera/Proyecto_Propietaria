import React from 'react';
import { connect } from 'react-redux';
import { getByComplainsId } from '../../../common/store/actions/complain/complain.actions';
import { getAllComplains, getError } from '../../../common/store/selectors/complains.selector';
import ResponseBody from '../../../common/components/ResponseBody';
import { answerClaimComplaint } from '../../../common/store/actions/answer/answer.actions';
import { getAnswerError } from '../../../common/store/selectors/answer.selector';
import { getAuthUser } from '../../../common/store/selectors/user.selector';

function mapDispatchToProps(dispatch){
    return {
        getByComplainsId: (id) => {
            dispatch(getByComplainsId(id))
        },
        answerClaimComplaint: (data) => {
            dispatch(answerClaimComplaint(data))
        }
    }
}

function mapStateToProps(state){
    return {
        complain: getAllComplains(state),
        complainError: getError(state),
        answerError: getAnswerError(state),
        user: getAuthUser(state),
    }
}

class ResponseComplaint extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            answer: '',
        }

        this.onChange = this.onChange.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(value){
        this.setState({ answer: value })
    }

    canSubmit(){
        return this.state.answer !== ''
    }

    onSubmit(){
        const { user, complain: [ complainInfo ], answerClaimComplaint } = this.props
        const { answer } = this.state;

        const date = new Date().toISOString();

        const data = {
            id: null,
            employee: user.id,
            complain: complainInfo.id,
            claim: null,
            message: answer,
            date: date.replace('-', '').replace('-', '').slice(0, 8)
        }

        answerClaimComplaint(data);
    }

    componentDidMount(){
        const id = parseInt(this.props.match.params.complaintId);
        this.props.getByComplainsId(id);
    }

    render(){
        const { complain: [complainInfo] } = this.props;
        const { answer } = this.state;

        return(
            <React.Fragment>
                {complainInfo &&
                    <ResponseBody
                        redirect="/admin/claim"
                        pageTitle="Responder queja"
                        titleType={complainInfo.complainTypeName}
                        department={complainInfo.departmentName}
                        description={complainInfo.description}
                        onChange={this.onChange}
                        answer={answer}
                        person={complainInfo.personName}
                        onSubmit={this.onSubmit}
                        canSubmit={this.canSubmit}
                    />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseComplaint)