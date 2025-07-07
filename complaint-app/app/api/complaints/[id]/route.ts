
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Complaint from "@/models/complaint";
import { sendStatusUpdateEmail } from "@/lib/mail";

export async function PUT(req: NextRequest, context: any) {
  try {
    const { id } = context.params as { id: string };
    const { status } = await req.json();

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    await connectToDB();

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return NextResponse.json({ message: "Complaint not found" }, { status: 404 });
    }

    await sendStatusUpdateEmail(complaint);

    return NextResponse.json({ message: "Status updated", complaint });
  } catch (error) {
    console.error("PUT /complaints/:id failed:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}