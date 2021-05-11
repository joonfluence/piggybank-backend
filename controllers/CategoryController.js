import Paying from "../models/Paying.js";
import Saving from "../models/Saving.js";

export const getPayingCategory = async (req, res) => {
  const {
    body: { year, month, category },
    user: { _id },
  } = req;
  try {
    const newMonth =
      month.toString().length < 2 ? 0 + month.toString() : month.toString();
    const nextMonthInt = Number(month) + 1;
    const nextMonth =
      nextMonthInt.toString().length < 2
        ? 0 + nextMonthInt.toString()
        : nextMonthInt.toString();

    let temp = 0;
    let categorySum = 0;

    // category의 title을 바탕으로 데이터를 aggregate 해줘야 한다.

    const categoryPaying = await Paying.find({
      user: [_id],
      category: [`${category}`],
      date: {
        $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
      },
    }).populate("category", "title price");

    for (let i = 0; i < categoryPaying.length; i++) {
      temp = categoryPaying[i].price;
      categorySum += temp;
    }

    return res.status(200).json({
      categorySuccess: true,
      categoryPaying,
      categorySum,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSavingCategory = async (req, res) => {
  const {
    body: { year, month, category },
    user: { _id },
  } = req;
  try {
    const newMonth =
      month.toString().length < 2 ? 0 + month.toString() : month.toString();
    const nextMonthInt = Number(month) + 1;
    const nextMonth =
      nextMonthInt.toString().length < 2
        ? 0 + nextMonthInt.toString()
        : nextMonthInt.toString();

    let temp = 0;
    let categorySum = 0;

    // category의 title을 바탕으로 데이터를 aggregate 해줘야 한다.

    const categorySaving = await Saving.find({
      user: [_id],
      category: [`${category}`],
      date: {
        $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
      },
    }).populate("category", "title price");

    for (let i = 0; i < categorySaving.length; i++) {
      temp = categorySaving[i].price;
      categorySum += temp;
    }

    return res.status(200).json({
      categorySuccess: true,
      categorySaving,
      categorySum,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
