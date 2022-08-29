const express = require("express");
const router = express.Router();

const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const {
  getCourses,
  createCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
} = require("../controllers/course-controler");

router.route("/courses").get(authenticateUser, getCourses).post(authenticateUser, createCourse)

// router.get("/courses", getCourses);
// router.post("/courses", createCourse);

router.route("/courses/:id").get(authenticateUser, getSingleCourse).patch(updateCourse).delete(deleteCourse)
// router.get("/course/:id", getSingleCourse);
// router.patch("/course/:id", updateCourse);
// router.delete("/course/:id", deleteCourse);

router.route("/teacher/:id/courses").get(authenticateUser, getTeacherCourses)
// router.get("/teacher/:id/courses", getTeacherCourses)

module.exports = router;