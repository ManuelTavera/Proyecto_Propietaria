import { combineEpics } from 'redux-observable';
import * as userEpics from './user.epic';

export const rootEpic = combineEpics(
    userEpics.authUserEpic,
);