import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Complaint from "@/models/complaint";
import { sendNewComplaintEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, priority } = body;

    if (!title || !description || !category || !priority) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectToDB();

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
    });

    return NextResponse.json({ message: "Complaint submitted successfully", complaint }, { status: 201 });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}