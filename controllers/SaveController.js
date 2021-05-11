import Saving from "../models/Saving.js";

// 4) 저축정보 CRUD Controller

export const postSavingInfo = async (req, res) => {
  const { category, title, date, price } = req.body;
  const { _id: userID } = req.user;
  try {
    const newSaving = await Saving.create({
      user: [userID],
      category,
      date,
      title,
      price,
      category: { _id: category },
    });
    return res.status(201).json({ newSaving, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const getSavingInfo = async (req, res) => {
  const { _id } = req.user;
  try {
    const savingList = await Saving.find(
      { user: [_id] },
      {
        title: 1,
        price: 1,
        date: 1,
        category: 1,
      }
    ).populate("category");

    return res.status(200).json({ savingList, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

export const editSavingInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const savingInfo = await Saving.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      },
      (err, info) => {
        if (err) return res.status(404).json({ error: "Not Found" });
      }
    );
    return res.status(200).json(savingInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

export const deleteSavingInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Saving.findByIdAndRemove({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const getSavingDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const savingInfo = await Saving.findById({ _id: id });
    return res.status(200).json(savingInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

// 테스트가 요구됨.

export const getSavingMonth = async (req, res) => {
  const { year, month } = req.body;
  const { _id } = req.user;

  try {
    const newMonth =
      month.toString().length < 2 ? 0 + month.toString() : month.toString();
    const nextMonthInt = Number(month) + 1;
    const nextMonth =
      nextMonthInt.toString() < 10
        ? 0 + nextMonthInt.toString()
        : nextMonthInt.toString();

    const monthlySaving = await Saving.find(
      {
        user: [_id],
        date: {
          $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
          $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
        },
      },
      { title: 1, price: 1 }
    );

    let savingSum = 0;
    let temp = 0;

    for (let i = 0; i < monthlySaving.length; i++) {
      temp = monthlySaving[i].price;
      savingSum += temp;
    }

    return res
      .status(200)
      .json({ monthlySaving, savingSum, monthSuccess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
