import React from 'react';
import { connect } from 'react-redux';
import { getByClaimId } from '../../../common/store/actions/claim/claim.action';
import { getAllClaims, getClaimsError } from '../../../common/store/selectors/claim.selector';
import ResponseBody from '../../../common/components/ResponseBody';
import { answerClaimComplaint } from '../../../common/store/actions/answer/answer.actions';
import { getAnswerError } from '../../../common/store/selectors/answer.selector';
import { getAuthUser } from '../../../common/store/selectors/user.selector';

function mapDispatchToProps(dispatch){
    return {
        getByClaimId: (id) => {
            dispatch(getByClaimId(id))
        },
        answerClaimComplaint: (data) => {
            dispatch(answerClaimComplaint(data))
        }
    }
}

function mapStateToProps(state){
    return {
        claim: getAllClaims(state),
        claimError: getClaimsError(state),
        answerError: getAnswerError(state),
        user: getAuthUser(state),
    }
}

class ResponseClaim extends React.Component {
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
        const { user, claim: [ claimInfo ], answerClaimComplaint } = this.props
        const { answer } = this.state;

        const date = new Date().toISOString();

        const data = {
            id: null,
            employee: user.id,
            complain: null,
            claim: claimInfo.id,
            message: answer,
            date: date.replace('-', '').replace('-', '').slice(0, 8)
        }

        answerClaimComplaint(data);
    }

    componentDidMount(){
        const id = parseInt(this.props.match.params.claimId);
        this.props.getByClaimId(id);
    }

    render(){
        const { claim: [ claimInfo ] } = this.props;
        const { answer } = this.state;

        return(
            <React.Fragment>
                {claimInfo &&
                    <ResponseBody
                        redirect="/admin/claim"
                        pageTitle="Responder reclamación"
                        titleType={claimInfo.complainTypeName}
                        department={claimInfo.departmentName}
                        description={claimInfo.description}
                        onChange={this.onChange}
                        answer={answer}
                        person={claimInfo.personName}
                        onSubmit={this.onSubmit}
                        canSubmit={this.canSubmit}
                    />
                }
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseClaim);