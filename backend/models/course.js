// class Course(db.Model, BaseModel):
//     __tablename__ = 'tbl_course'

//     teacher_id = db.Column(db.Integer, db.ForeignKey('tbl_user.id'))
//     name = db.Column(db.String(120), nullable=False)
//     price = db.Column(db.Integer, nullable=False)
//     average_mark = db.Column(db.Numeric(1, 2), default=0)
//     description = db.Column(db.Text)

//     user = db.relationship('User')

//     @classmethod
//     def get_for_student_filter(cls, course_name, teacher_name):
//         courses = cls.query.join(User, cls.teacher_id == User.id).filter(~cls.deleted)

//         if course_name:
//             courses = courses.filter(cls.name.ilike(f'%{course_name}%'))

//         if teacher_name:
//             courses = courses.filter(db.or_(User.name.ilike(f'%{teacher_name}%'), User.surname.ilike(f'%{teacher_name}%')))

//         return courses.all()

//     @classmethod
//     def get_by_id(cls, course_id):
//         return cls.query.filter(cls.id == course_id, ~cls.deleted).first()