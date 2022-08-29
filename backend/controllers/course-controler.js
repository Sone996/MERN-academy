const Courses = require("../models/course");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getCourses = async (req, res) => {
  const courses = await Courses.find({});
  res.status(StatusCodes.OK).json(courses);
};

const createCourse = async (req, res) => {
  req.body.teacher_id = req.user.userId;
  const course = await Courses.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};

const getSingleCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Courses.findOne({ _id: courseId });
  if (!course) {
    throw new CustomError.NotFoundError(`No course with id : ${courseId}`);
  }
  res.status(StatusCodes.OK).json(course);
};

const updateCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Courses.findOneAndUpdate({ _id: courseId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new CustomError.NotFoundError(`No course with id : ${courseId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};

const deleteCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Courses.findOne({ _id: courseId });
  if (!course) {
    throw new CustomError.NotFoundError(`No course with id : ${courseId}`);
  }
  await course.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Course removed." });
};

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
