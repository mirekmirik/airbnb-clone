import React from "react";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";



export default async function getProperties() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const properties = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return properties;
  } catch (err: any) {
    throw new Error(err);
  }
}
