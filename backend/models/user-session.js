const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      maxlength: 150,
      required: [true, "Session id is required"],
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

// UserSessionSchema.methods.getBySessionId = async function () {}

module.exports = mongoose.model("UserSession", UserSessionSchema);

// class UserSession(db.Model, BaseModel):
//     """
//     Model for User session
//     """
//     __tablename__ = 'tbl_user_session'

//     user_id = db.Column(db.Integer, db.ForeignKey('tbl_user.id'), nullable=False)
//     session_id = db.Column(db.String(150), nullable=False)
//     session_date = db.Column(db.Date, default=date.today())

//     user = db.relationship('User')

//     @classmethod
//     def get_by_session_id(cls, session_id):
//         return cls.query.filter(
//             cls.session_id == session_id,
//             db.cast(cls.date_of_creation, db.Date) == date.today(),
//             ~cls.deleted,
//         ).first()
