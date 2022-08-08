// class StudentCourseRequest(db.Model, BaseModel):
//     __tablename__ = 'tbl_student_course_request'

//     course_id = db.Column(db.Integer, db.ForeignKey('tbl_course.id'))
//     student_id = db.Column(db.Integer)
//     teacher_id = db.Column(db.Integer, db.ForeignKey('tbl_user.id'))
//     comment = db.Column(db.Text)
//     accepted = db.Column(db.Boolean, default=False, server_default=db.false())

//     course = db.relationship('Course')
//     user = db.relationship('User')

//     @classmethod
//     def get_all_requested_for_teacher(cls, teacher_id):
//         return cls.query.filter(cls.teacher_id == teacher_id, ~cls.deleted).all()

//     @classmethod
//     def accept_or_reject_request(cls, course_id):
//         return cls.query.filter(cls.course_id == course_id, ~cls.deleted).first()

//     @classmethod
//     def get_accepted_for_student(cls, student_id, course_id):
//         return cls.query.filter(cls.student_id == student_id, cls.course_id == course_id, cls.accepted).first()