import { model, models, Schema, Types } from "mongoose";

type CourseEnrollmentRecord = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const CourseEnrollmentSchema = new Schema<CourseEnrollmentRecord>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

CourseEnrollmentSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true },
);

const CourseEnrollment =
  models.CourseEnrollment ||
  model<CourseEnrollmentRecord>("CourseEnrollment", CourseEnrollmentSchema);

export default CourseEnrollment;
