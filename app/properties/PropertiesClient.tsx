"use client";

import React, { useState, useCallback } from "react";
import Container from "../components/Container";
import { Listing, User } from "@prisma/client";
import ListingCard from "../components/Listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ currentUser, listings }) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success(`Success`);
          router.refresh();
        })
        .catch((err) => {
          toast(`Something went wrong`);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            actionId={listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            key={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
