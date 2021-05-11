const HOME = "/";
const API = "/api";

// Users

const USER_JOIN = "/join";
const USER_LOGIN = "/login";
const USER_LOGOUT = "/logout";
const USER_AUTH = "/auth";
const MYPAGE = "/mypage";

// Payings

const PAYING = "/payings";
const PAYING_DETAIL = "/payings/:id";
const PAYING_LIST = "/payings/list";
const CATEGORY_PAYING = "/payings/category";

// Savings

const SAVING = "/savings";
const SAVING_DETAIL = "/savings/:id";
const SAVING_LIST = "/savings/list";
const CATEGORY_SAVING = "/savings/category";

// 예산 카테고리

const BUDGET = "/budgets";
const BUDGET_DETAIL = "/budgets/:id";
const BUDGET_MONTH = "/budgets/date";

// 저축 목표 카테고리

const SAVING_GOAL = "/savingsGoal";
const SAVING_GOAL_DETAIL = "/savingsGoal/:id";
const SAVING_GOAL_MONTH = "/savingsGoal/date";

const routes = {
  home: HOME,
  api: API,
  saving: SAVING,
  savings: (id) => {
    if (id) {
      return `/savings/${id}`;
    } else {
      return SAVING_DETAIL;
    }
  },
  payingMonth: PAYING_LIST,
  savingMonth: SAVING_LIST,
  paying: PAYING,
  payings: (id) => {
    if (id) {
      return `/payings/${id}`;
    } else {
      return PAYING_DETAIL;
    }
  },
  join: USER_JOIN,
  login: USER_LOGIN,
  logout: USER_LOGOUT,
  auth: USER_AUTH,
  mypage: MYPAGE,
  categoryPaying: CATEGORY_PAYING,
  categorySaving: CATEGORY_SAVING,
  budget: BUDGET,
  budgets: (id) => {
    if (id) {
      return `budgets/:id`;
    } else {
      return BUDGET_DETAIL;
    }
  },
  budgetMonth: BUDGET_MONTH,
  savingGoal: SAVING_GOAL,
  savingGoals: (id) => {
    if (id) {
      return `/savingsGoal/:id`;
    } else {
      return SAVING_GOAL_DETAIL;
    }
  },
  savingGoalMonth: SAVING_GOAL_MONTH,
};
export default routes;
