import { Listing } from "@prisma/client";
import prisma from "../libs/prismadb";

export interface IListingParams {
  userId?: string;
}

export default async function getListings(params: IListingParams): Promise<Listing[]> {
  try {
    const { userId } = params;
    let query: IListingParams = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (err: any) {
    throw new Error(err);
  }
}
