import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
