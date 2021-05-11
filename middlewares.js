import User from "./models/User.js";

export const Auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (!user) return res.json({ isAuth: false, error: err });

    req.token = token;
    req.user = user;
    next();
  });
};
