import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { getReservations } from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <EmptyState title="Unauhtorized" subtitle="Please login" />;

  const reservations = await getReservations({ userId: currentUser.id });
  if (!reservations.length) return <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips" />;

  return (
    <div>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
};

export default TripsPage;
