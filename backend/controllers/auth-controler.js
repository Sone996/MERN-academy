const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser, createJWT } = require("../utils");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, name, surname, password, role } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const user = await User.create({ name, surname, email, password, role });
  const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });

  

  res.status(StatusCodes.CREATED).json({ token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email and password' });
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    // attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    const token = createJWT({ payload: tokenUser });
    res.status(StatusCodes.OK).json({ token: token, user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  // attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  const token = createJWT({ payload: tokenUser });

  console.log(token)

  res.status(StatusCodes.OK).json({ token });

  // res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  logout,
};
