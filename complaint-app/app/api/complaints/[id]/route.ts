import { connectToDB } from "@/lib/db";
import Complaint from "@/models/complaint";
import { NextRequest, NextResponse } from "next/server";
import { sendStatusUpdateEmail } from "@/lib/mail";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const { id } = params;
    const { status } = await req.json();

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return NextResponse.json({ message: "Complaint not found" }, { status: 404 });
    }

    // Optional: Send email to admin about status update
    await sendStatusUpdateEmail(complaint);

    return NextResponse.json({ message: "Status updated", complaint });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error updating complaint" }, { status: 500 });
  }
}
