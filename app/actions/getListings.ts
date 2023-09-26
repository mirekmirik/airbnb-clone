import { Listing } from "@prisma/client";
import prisma from "../libs/prismadb";
import { start } from "repl";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams): Promise<Listing[]> {
  try {
    const { userId, category, endDate, guestCount, locationValue, roomCount, startDate, bathroomCount } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { startDate: { lte: endDate }, endDate: { gte: endDate } },
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
            ],
          },
        },
      };
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
