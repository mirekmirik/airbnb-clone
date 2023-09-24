"use client";

import { Reservation, User } from "@prisma/client";
import axios from "axios";
import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/Listings/ListingCard";
import { useRouter } from "next/navigation";
import { ReservationAndListing } from "../types";

interface ReversationsClientProps {
  reservations: ReservationAndListing[];
  currentUser?: User | null;
}

const ReservationsClient: React.FC<ReversationsClientProps> = ({ reservations, currentUser }) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success(`Reservation cancelled`);
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            reservation={reservation}
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
