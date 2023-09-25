import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
interface IParams {
  listingId: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  if (!listingId) return NextResponse.error();

  const deleteListing = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(deleteListing);
}
