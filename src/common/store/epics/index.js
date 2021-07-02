import { combineEpics } from 'redux-observable';
import * as userEpics from './user.epic';
import * as complainsEpic from './complains.epic';
import * as departmentEpics from './department.epic';
import * as claimsEpics from './claim.epic';
import * as answerEpics from './answer.epic';
import * as productEpics from './products.epic';

export const rootEpic = combineEpics(
    userEpics.authUserEpic,
    userEpics.createUserEpic,
    userEpics.getAllEmployeesEpic,
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
    claimsEpics.createEpicClaimEpic,
    departmentEpics.getDepartmentsEpic,
    departmentEpics.createDepartmentEpic,
    departmentEpics.deleteDepartmentEpic,
    departmentEpics.updateDepartmentRequest,
    departmentEpics.getDepartmentByIdRequest,
    answerEpics.answerClaimComplaintEpic,
    productEpics.createProductEpic,
    productEpics.deleteProductEpic,
    productEpics.getProductsEpic,
    productEpics.updateProductEpic
);