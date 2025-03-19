import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ListingsPage.module.css";
import ListingsCard from "../../components/ListingsCard/ListingsCard";
import NavbarUser from "../../components/NavbarUser/NavbarUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    if (!token || role !== "host") {
      navigate("/login");
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/accommodations/host`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setListings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [token, navigate, role]);

  const handleDeleteListing = async id => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/accommodations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // remove the deleted listing from state
        setListings(listings.filter(listing => listing._id !== id));
      } catch (err) {
        console.error("Error deleting listing:", err);
        alert(err.response?.data?.message || "Failed to delete listing");
      }
    }
  };

  return (
    <div>
      <div className={styles.navbar}>
        <NavbarUser />
      </div>
      <div className={styles.listing}>
        <div className={styles.options}>
          <button onClick={() => navigate("/admin/reservations")}>
            View Reservations
          </button>
          <button onClick={() => navigate("/admin/view-listings")}>
            View Listings
          </button>
          <button onClick={() => navigate("/admin/create-listing")}>
            Create Listing
          </button>
        </div>

        <h2 className={styles.title}>My Hotel Listings</h2>

        {loading && <p>Loading listings...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.eachListing}>
          {listings.length > 0
            ? listings.map(listing => (
                <ListingsCard
                  key={listing._id}
                  listing={listing}
                  onDelete={() => handleDeleteListing(listing._id)}
                  onEdit={() => navigate(`/admin/edit-listing/${listing._id}`)}
                />
              ))
            : !loading && <p>No listings found. Create your first listing!</p>}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
