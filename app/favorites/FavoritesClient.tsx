"use client";

import { Listing, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import ListingCard from "../components/Listings/ListingCard";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import useFavorite from "../hooks/useFavorite";

interface FavoritesClientProps {
  currentUser?: User | null;
  listings: Listing[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/favorites/${id}`)
        .then(() => {
          toast.success(`Succesfully`);
          router.refresh();
        })
        .catch((err) => {
          toast.error(`Something went wrong`);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Favorites" subtitle="Your favorites properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            actionId={listing.id}
            actionLabel="Delete from favorites"
            onAction={onCancel}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
