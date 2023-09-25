import React from "react";
import FavoritesClient from "./FavoritesClient";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { getFavoriteListings } from "../actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!listings.length) return <EmptyState title="No favorites found" subtitle="Looks like you haven't added anything" />;
  if (!currentUser) return <EmptyState title="Unathorized" subtitle="Please login" />;


  return <FavoritesClient listings={listings} currentUser={currentUser} />
};

export default FavoritesPage;
