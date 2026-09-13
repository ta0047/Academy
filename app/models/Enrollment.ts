import { model, models, Schema } from "mongoose";

const EnrollmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    course:{
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

const Enrollment = models.Enrollment || model("Enrollment", EnrollmentSchema);
export default Enrollment;
