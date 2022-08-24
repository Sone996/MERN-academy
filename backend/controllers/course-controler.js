const Courses = require("../models/course");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getCourses = async (req, res) => {
  res.status(StatusCodes.OK).json([]);
  // const reviews = await Review.find({}).populate({
  //     path: 'product',
  //     select: 'name company price',
  //   });

  //   res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

// TODO :: nadji usera u pozivu
const createCourse = async (req, res) => {
  req.body.teacher_id = req.user.userId;
  const course = await Courses.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};

const getSingleCourse = async (req, res) => {};

const updateCourse = async (req, res) => {};

const deleteCourse = async (req, res) => {};

// sad napravi kurs
const getTeacherCourses = async (req, res) => {
  const id = req.user.userId;
  const teacherCourses = await Courses.find({ teacher_id: id });
  res.status(StatusCodes.OK).json(teacherCourses);
};

module.exports = {
  getCourses,
  createCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
};
