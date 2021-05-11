import Budget from "../models/Budget.js";
import Paying from "../models/Paying.js";

export const postBudgetInfo = async (req, res) => {
  const { title, date, price } = req.body;
  const { _id } = req.user;
  try {
    // monthlyBudget은 삭제하고 항목별 budget의 합으로 값을 저장해주자.
    console.log(date);
    const newBudget = await Budget.create({
      user: [_id],
      date,
      title,
      price,
    });
    return res.status(201).json({ newBudget, CreateSuccess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ CreateSuccess: false });
  }
};

// 아래 요소를 바꿔주어야 할 것이다.

export const getBudgetInfo = async (req, res) => {
  const { _id } = req.user;
  try {
    const budgetInfo = await Budget.find(
      { user: [_id] },
      { title: 1, budget: 1 },
      (err, budget) => {
        if (err) return res.status(404).json({ ReadSuccess: false });
      }
    );

    return res.status(200).json({ budgetInfo, ReadSuccess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const editBudgetInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const newInfo = await Budget.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      },
      (err, info) => {
        if (err) return res.status(404).json({ error: "Not Found" });
      }
    );
    return res.status(200).json({ UpdateSuccess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ UpdateSuccess: false, error });
  }
};

export const deleteBudgetInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Budget.findByIdAndRemove({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

export const getBudgetDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const BudgetInfo = await Budget.findById({ _id: id });
    return res.status(200).json({ DetailSuccess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ DetailSuccess: false, error });
  }
};

export const getBudgetMonth = async (req, res) => {
  const { year, month } = req.body;
  const { _id } = req.user;

  try {
    const newMonth =
      month.toString().length < 2 ? 0 + month.toString() : month.toString();
    const nextMonthInt = Number(month) + 1;
    const nextMonth =
      nextMonthInt.toString().length < 2
        ? 0 + nextMonthInt.toString()
        : nextMonthInt.toString();

    // monthInfo < 데이터 < monthInfo + 1와 같은 방식으로 월별 데이터를 가져올 수 있을 것.

    const monthlyBudget = await Budget.find(
      {
        user: [_id],
        date: {
          $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
          $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
        },
      },
      { title: 1, price: 1, categorySum: 1 }
    );

    let budgetSum = 0;
    let categoryPrice = 0;
    let categorySum = 0;
    let categoryPaying = 0;

    for (let i = 0; i < monthlyBudget.length; i++) {
      let temp = 0;
      temp = monthlyBudget[i].price;
      budgetSum += temp;

      categoryPaying = await Paying.find({
        user: [_id],
        category: [monthlyBudget[i]._id],
        date: {
          $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
          $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
        },
      }).populate("category", "title price");

      for (let i = 0; i < categoryPaying.length; i++) {
        temp = categoryPaying[i].price;
        categoryPrice += temp;
        categorySum += temp;
      }
      monthlyBudget[i].categoryPrice = categoryPrice;
      categoryPrice = 0;
    }

    return res
      .status(200)
      .json({ monthlyBudget, categorySum, budgetSum, monthSuccess: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

export const categoryMonth = async (req, res) => {
  const { title, year, month } = req.body;

  try {
    const newMonth = month.length < 2 ? 0 + month : month;
    const nextMonthInt = Number(month) + 1;
    const nextMonth =
      nextMonthInt.toString().length < 2
        ? 0 + nextMonthInt.toString()
        : nextMonthInt.toString();

    // monthInfo < 데이터 < monthInfo + 1와 같은 방식으로 월별 데이터를 가져올 수 있을 것.

    const categoryBudget = await Budget.find({
      title: `${title}`,
      date: {
        $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
      },
    });

    return res.status(200).json({ categoryBudget, monthSuccess: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};
