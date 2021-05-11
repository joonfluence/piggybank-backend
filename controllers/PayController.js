import Paying from "../models/Paying.js";

// 3) 소비정보 CRUD Controller

export const postPayingInfo = async (req, res) => {
  const { user, category, title, price } = req.body;
  try {
    const newPaying = await Paying.create({
      user,
      title,
      date,
      price,
      category,
    });
    return res.status(201).json({ newPaying, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const getPayingInfo = async (req, res) => {
  const { _id } = req.user;
  try {
    const payingList = await Paying.find(
      { user: [_id] },
      { title: 1, price: 1, date: 1, category: 1 }
    ).populate("category");

    return res.status(200).json({ success: true, payingList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const editPayingInfo = async (req, res) => {
  // id를 통해 해당 소비내역 정보가 전달되어야 할 것임.
  const {
    params: { id },
  } = req;
  try {
    const payingInfo = await Paying.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      },
      (err, info) => {
        if (err) return res.status(404).json({ error: "Not Found" });
      }
    );
    return res.status(200).json(payingInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

export const deletePayingInfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Paying.findByIdAndRemove({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const getPayingDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const payInfo = await Paying.findById({ _id: id });
    return res.status(200).json(payInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ sucess: false, error });
  }
};

// 사용자가 입력한 숫자가 02와 같은 형식이 아닐 경우, 예외처리가 필요할 것임.

export const getPayingMonth = async (req, res) => {
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

    const monthlyPaying = await Paying.find({
      user: [_id],
      date: {
        $gt: new Date(`${year}-${newMonth}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${nextMonth}-01T00:00:00.000Z`),
      },
    });

    let temp = 0;
    let payingSum = 0;
    // 나중에는 사용자의 input value를 바탕으로 값을 받아줄 것임.

    for (let i = 0; i < monthlyPaying.length; i++) {
      temp = monthlyPaying[i].price;
      payingSum += temp;
    }

    return res
      .status(200)
      .json({ monthlyPaying, monthSucess: true, payingSum });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
