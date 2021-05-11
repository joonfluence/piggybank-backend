import express from "express";
import {
  editUserInfo,
  getUserInfo,
  postJoin,
  postLogin,
  getLogOut,
  getAuth,
} from "../controllers/UserController.js";
import {
  getPayingInfo,
  postPayingInfo,
  getPayingDetail,
  editPayingInfo,
  deletePayingInfo,
  getPayingMonth,
} from "../controllers/PayController.js";
import {
  postSavingInfo,
  getSavingDetail,
  getSavingInfo,
  editSavingInfo,
  deleteSavingInfo,
  getSavingMonth,
} from "../controllers/SaveController.js";
import {
  getPayingCategory,
  getSavingCategory,
} from "../controllers/CategoryController.js";
import {
  getBudgetInfo,
  postBudgetInfo,
  editBudgetInfo,
  getBudgetDetail,
  getBudgetMonth,
  deleteBudgetInfo,
} from "../controllers/BudgetController.js";
import {
  getGoalInfo,
  postGoalInfo,
  editGoalInfo,
  getGoalDetail,
  getGoalMonth,
  deleteGoalInfo,
} from "../controllers/SavingGoalController.js";
import routes from "../routes.js";
import { Auth } from "../middlewares.js";

const apiRouter = express.Router();

// 1) 회원가입 및 로그인, 로그아웃
apiRouter.post(routes.join, postJoin);
apiRouter.post(routes.login, postLogin);
apiRouter.get(routes.logout, Auth, getLogOut);

// 2) 인증체크
apiRouter.get(routes.auth, getAuth);

// 3) 사용자 정보
apiRouter.get(routes.mypage, Auth, getUserInfo);
apiRouter.put(routes.mypage, Auth, editUserInfo);

// 4) 소비정보 CRUD
apiRouter.get(routes.paying, Auth, getPayingInfo);
apiRouter.post(routes.paying, Auth, postPayingInfo);
apiRouter.put(routes.payings(), Auth, editPayingInfo);
apiRouter.delete(routes.payings(), Auth, deletePayingInfo);

// 5) 저축정보 CRUD
apiRouter.get(routes.saving, Auth, getSavingInfo);
apiRouter.post(routes.saving, Auth, postSavingInfo);
apiRouter.put(routes.savings(), Auth, editSavingInfo);
apiRouter.delete(routes.savings(), Auth, deleteSavingInfo);

// 6) 디테일 정보
apiRouter.post(routes.payingMonth, Auth, getPayingMonth);
apiRouter.post(routes.savingMonth, Auth, getSavingMonth);
apiRouter.get(routes.payings(), Auth, getPayingDetail);
apiRouter.get(routes.savings(), Auth, getSavingDetail);

// 7) 소비 & 저축 카테고리별 정보
apiRouter.post(routes.categoryPaying, Auth, getPayingCategory);
apiRouter.post(routes.categorySaving, Auth, getSavingCategory);

// 8) 예산 정보
apiRouter.get(routes.budget, Auth, getBudgetInfo);
apiRouter.post(routes.budget, Auth, postBudgetInfo);
apiRouter.put(routes.budgets(), Auth, editBudgetInfo);
apiRouter.delete(routes.budgets(), Auth, deleteBudgetInfo);
apiRouter.get(routes.budgets(), Auth, getBudgetDetail);
apiRouter.post(routes.budgetMonth, Auth, getBudgetMonth);

// 9) 저축 목표 정보
apiRouter.get(routes.savingGoal, getGoalInfo);
apiRouter.post(routes.savingGoal, postGoalInfo);
apiRouter.put(routes.savingGoals(), editGoalInfo);
apiRouter.get(routes.savingGoals(), getGoalDetail);
apiRouter.delete(routes.savingGoals(), deleteGoalInfo);
apiRouter.post(routes.savingGoalMonth, getGoalMonth);

export default apiRouter;
