import { combineEpics } from 'redux-observable';
import * as userEpics from './user.epic';
import * as complainsEpic from './complains.epic';
import * as departmentEpics from './department.epic';
import * as claimsEpics from './claim.epic';

export const rootEpic = combineEpics(
    userEpics.authUserEpic,
    userEpics.createUserEpic,
    userEpics.redirectUserFromLoginEpic,
    complainsEpic.getComplainsEpic,
    complainsEpic.deleteComplainEpic,
    complainsEpic.getComplainsTitleEpic,
    complainsEpic.updateComplainsEpic,
    complainsEpic.createComplainEpic,
    claimsEpics.getClaimsEpic,
    claimsEpics.deleteClaimEpic,
    claimsEpics.getClaimsTitleEpic,
    claimsEpics.updateClaimsEpic,
    departmentEpics.getDepartmentsEpic,
);