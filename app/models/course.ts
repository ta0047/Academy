import { model, models, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique:true
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

const Course = models.Course || model("Course", CourseSchema);
export default Course;
