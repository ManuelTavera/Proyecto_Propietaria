import { combineEpics } from "redux-observable";
import * as userEpics from "./user.epic";
import * as complainsEpic from "./complains.epic";
import * as departmentEpics from "./department.epic";
import * as claimsEpics from "./claim.epic";
import * as answerEpics from "./answer.epic";
import * as productEpics from "./products.epic";

export const rootEpic = combineEpics(
  userEpics.authUserEpic,
  userEpics.createUserEpic,
  userEpics.getAllEmployeesEpic,
  userEpics.redirectUserFromLoginEpic,
  userEpics.logOutUserEpic,
  complainsEpic.getComplainsEpic,
  complainsEpic.deleteComplainEpic,
  complainsEpic.getComplainsTitleEpic,
  complainsEpic.getByComplainId,
  complainsEpic.updateComplainsEpic,
  complainsEpic.createComplainEpic,
  complainsEpic.createComplainsTypeEpic,
  complainsEpic.updateComplainsTypeEpic,
  complainsEpic.deleteComplainsTypeEpic,
  claimsEpics.getClaimsEpic,
  claimsEpics.deleteClaimEpic,
  claimsEpics.getClaimsTitleEpic,
  claimsEpics.getByClaimIdEpic,
  claimsEpics.updateClaimsEpic,
  claimsEpics.createClaimTypeEpic,
  claimsEpics.updateClaimTypeEpic,
  claimsEpics.deleteClaimTypeEpic,
  claimsEpics.createEpicClaimEpic,
  departmentEpics.getDepartmentsEpic,
  departmentEpics.createDepartmentEpic,
  departmentEpics.deleteDepartmentEpic,
  departmentEpics.updateDepartmentRequest,
  departmentEpics.getDepartmentByIdRequest,
  answerEpics.answerClaimComplaintEpic,
  answerEpics.getAnswersEpic,
  answerEpics.getClaimsAnswerEpic,
  answerEpics.getComplaintsAnswerEpic,
  answerEpics.updateAnswerEpic,
  productEpics.createProductEpic,
  productEpics.deleteProductEpic,
  productEpics.getProductsEpic,
  productEpics.updateProductEpic
);
