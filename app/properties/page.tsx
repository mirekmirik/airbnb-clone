import React from "react";
import PropertiesClient from "./PropertiesClient";
import getProperties from "../actions/getProperties";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return <EmptyState title="Unathorized" subtitle="Please login" />;
  }

  const listings = await getListings({userId: currentUser.id});

  if (!listings.length) {
    return <EmptyState title="There are no properties" subtitle="Seems like you haven't added your own properties yet" />;
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
