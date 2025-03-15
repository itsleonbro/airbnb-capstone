import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./BrowseListings.module.css";

const API_BASE_URL = "http://localhost:5001";

const BrowseListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    guests: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(
        `${API_BASE_URL}/api/accommodations?${queryParams}`
      );
      setListings(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch listings. Please try again later.");
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitFilters = e => {
    e.preventDefault();
    fetchListings();
  };

  const handleListingClick = listingId => {
    navigate(`/listing/${listingId}`);
  };

  const formatPrice = price => {
    return `R${price.toLocaleString()}`;
  };

  if (loading) {
    return <div className={styles.container}>Loading Listings...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Browse All Listings</h1>

      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleSubmitFilters} className={styles.filterForm}>
        <div className={styles.filterGroup}>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Location"
            className={styles.filterInput}
          />

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className={styles.filterInput}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Private Room</option>
            <option value="hotel">Hotel Room</option>
          </select>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className={styles.filterInput}
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className={styles.filterInput}
          />

          <input
            type="number"
            name="guests"
            value={filters.guests}
            onChange={handleFilterChange}
            placeholder="Guests"
            min="1"
            className={styles.filterInput}
          />

          <button type="submit" className={styles.filterButton}>
            Apply Filters
          </button>
        </div>
      </form>

      <div className={styles.listingsGrid}>
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listings.map(listing => (
            <div
              key={listing._id}
              className={styles.listingCard}
              onClick={() => handleListingClick(listing._id)}
            >
              <div className={styles.imageContainer}>
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={`${API_BASE_URL}/${listing.images[0].path}`}
                    alt={listing.title}
                    className={styles.listingImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    No Image Available
                  </div>
                )}
              </div>

              <div className={styles.listingDetails}>
                <h2 className={styles.listingTitle}>{listing.title}</h2>
                <p className={styles.listingType}>{listing.type}</p>
                <p className={styles.listingLocation}>{listing.location}</p>
                <p className={styles.listingAmenities}>
                  {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
                  {listing.bathrooms} bathrooms
                </p>
                {listing.amenities && listing.amenities.length > 0 && (
                  <p className={styles.amenities}>
                    {listing.amenities.slice(0, 3).join(" · ")}
                    {listing.amenities.length > 3 && " · ..."}
                  </p>
                )}
                <p className={styles.listingPrice}>
                  <span className={styles.price}>
                    {formatPrice(listing.price)}
                  </span>{" "}
                  / night
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseListings;
