import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return new Response("Email is already in use", {
      status: 409,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, name, hashedPassword },
  });
  return NextResponse.json(user);
}
