import React from "react";
import BrowseListings from "../../components/BrowseListings/BrowseListings";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

const BrowseListingsPage = () => {
  return (
    <div>
      <div>
        <NavbarUser />
      </div>
      <div>
        <BrowseListings />
      </div>
    </div>
  );
};

export default BrowseListingsPage;
