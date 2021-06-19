import { combineEpics } from 'redux-observable';
import * as userEpics from './user.epic';
import * as complainsEpic from './complains.epic';
import * as departmentEpics from './department.epic';

export const rootEpic = combineEpics(
    userEpics.authUserEpic,
    userEpics.createUserEpic,
    userEpics.redirectUserFromLoginEpic,
    complainsEpic.getComplainsEpic,
    complainsEpic.deleteComplainEpic,
    complainsEpic.getComplainsTitleEpic,
    departmentEpics.getDepartmentsEpic,
);