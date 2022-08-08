// class StudentCourse(db.Model, BaseModel):
//     __tablename__ = 'tbl_student_course'

//     course_id = db.Column(db.Integer, db.ForeignKey('tbl_course.id'))
//     student_id = db.Column(db.Integer, db.ForeignKey('tbl_user.id'))
//     complete = db.Column(db.Boolean, default=False, server_default=db.false())
//     comment = db.Column(db.Text)
//     mark = db.Column(db.Integer, default=0)
//     active = db.Column(db.Boolean, default=True, server_default=db.true())

//     course = db.relationship('Course')
//     user = db.relationship('User')

//     @classmethod
//     def get_all_for_user_incomplete(cls, student_id):
//         return cls.query.filter(cls.student_id == student_id, ~cls.complete, ~cls.deleted).all()

//     @classmethod
//     def get_all_for_user_complete(cls, student_id):
//         return cls.query.filter(cls.student_id == student_id, cls.complete, ~cls.deleted).all()

//     @classmethod
//     def get_all_for_user(cls, student_id):
//         return cls.query.filter(cls.student_id == student_id, ~cls.deleted).all()

//     @classmethod
//     def get_course_for_user(cls, student_id, course_id):
//         return cls.query.filter(cls.student_id == student_id, cls.course_id == course_id, ~cls.deleted).first()

//     @classmethod
//     def get_course_for_teacher(cls, teacher_id, student_id, course_id):
//         return cls.query.join(Course, cls.course_id == Course.id) \
//             .filter(Course.teacher_id == teacher_id,
//                     cls.student_id == student_id,
//                     cls.course_id == course_id,
//                     ~cls.deleted).first()

//     @classmethod
//     def student_filter(cls, course_id, start_date, complete):
//         return cls.query \
//             .filter(cast(cls.date_of_creation, Date) <= start_date,
//                     cls.course_id == course_id,
//                     cls.complete == complete,
//                     ~cls.deleted) \
//             .all()

//     @classmethod
//     def get_unmarked_course(cls, student_id):
//         return cls.query \
//             .filter(cls.student_id == student_id,
//                     cls.mark == 0,
//                     ~cls.deleted) \
//             .order_by(db.desc(cls.date_of_creation)).first()