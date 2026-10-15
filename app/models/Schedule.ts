import { model, models, Schema, Types } from "mongoose";

type ScheduleRecord = {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  courseName: string;
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
};

const ScheduleSchema = new Schema<ScheduleRecord>(
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
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

ScheduleSchema.index({ userId: 1, date: 1, time: 1 });

const Schedule =
  models.Schedule || model<ScheduleRecord>("Schedule", ScheduleSchema);

export default Schedule;
