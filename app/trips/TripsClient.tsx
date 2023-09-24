"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useState, useCallback } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import ListingCard from "../components/Listings/ListingCard";
import { ReservationAndListing } from "../types";

interface TripsClientProps {
  reservations: ReservationAndListing[];
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      console.log("id before", id);
      setDeletingId(id);
      console.log("id after", id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been and where you're going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
