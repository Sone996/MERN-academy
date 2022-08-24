const Courses = require("../models/course");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

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
    // const {} = req.body;

    console.log('ovaj poziv')
    console.log(req.headers)
    console.log(req.headers.authorization)
    console.log(req.user)
    if (req.headers && req.headers.authorization) {
        console.log('prosao sam if')
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
            console.log(authorization);
        try {
            decoded = jwt.verify(authorization, secret.secretToken);
        } catch (e) {
            console.log('error je')
            return res.sendStatus(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
        User.findOne({_id: userId}).then(function(user){
            // Do something with the user
            return res.sendStatus(200);
        });
    }
    console.log('nisam prosao if')
    return res.sendStatus(500);

    res.status(StatusCodes.OK).json({ x: res.body, y:req.user });
};

const getSingleCourse = async (req, res) => {};

const updateCourse = async (req, res) => {};

const deleteCourse = async (req, res) => {};

// sad napravi kurs
const getTeacherCourses = async (req, res) => {
  console.log('kursevi')
  const teacherCourses = await Courses.find({});
  console.log('posle filtera')
  console.log(teacherCourses)
  res.status(StatusCodes.OK).json({ teacherCourses });
  //   console.log('kursevi!!!!!!!!!!!!!!!')
  //   // console.log(res)
  //   console.log(req.user.userId)
  // res.status(StatusCodes.OK).json([]);
};

module.exports = {
  getCourses,
  createCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
};
