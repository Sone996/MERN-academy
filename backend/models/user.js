const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 120,
  },
  surname: {
    type: String,
    required: [true, "Please provide surename"],
    minlength: 3,
    maxlength: 120,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "user",
  },
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

// class User(db.Model, BaseModel):
//     __tablename__ = 'tbl_user'

//     email = db.Column(db.String(120), unique=True, nullable=False)
//     password = db.deferred(db.Column(db.Text))
//     name = db.Column(db.String(120), nullable=False)
//     surname = db.Column(db.String(120), nullable=False)
//     role = db.Column(db.Enum(RoleEnum), nullable=False)

//     course = db.relationship('Course', secondary=user_course_association, lazy='dynamic')

//     @classmethod
//     def get_by_id(cls, user_id):
//         return cls.query.filter(cls.id == user_id, ~cls.deleted).first()

//     @classmethod
//     def get_by_role(cls, user_id, role):
//         return cls.query.filter(cls.role == role, cls.id == user_id, ~cls.deleted).first()

//     @classmethod
//     def get_all_by_role(cls, role):
//         return cls.query.filter(cls.role == role, ~cls.deleted).all()

//     @classmethod
//     def get_by_email_and_password(cls, email, password):
//         return cls.query.filter(cls.email == email, cls.password == password, ~cls.deleted).first()

//     @classmethod
//     def get_course_for_teacher(cls, teacher_id):
//         return cls.query \
//             .join(user_course_association, cls.id == user_course_association.c.user_id) \
//             .join(Course, user_course_association.c.course_id == Course.id) \
//             .filter(cls.id == teacher_id, ~cls.deleted).all()
