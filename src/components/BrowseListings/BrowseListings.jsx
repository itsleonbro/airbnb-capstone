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
      <h1>{listings.length}+ stays in South Africa</h1>

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

              <div className={styles.listingContent}>
                <div className={styles.listingDetails}>
                  <p
                    className={styles.propertyType}
                  >{`Entire ${listing.type} in ${listing.location}`}</p>
                  <h2 className={styles.listingTitle}>{listing.title}</h2>

                  <div className={styles.amenitiesRow}>
                    <span>{`${listing.guests} guests`}</span>
                    <span className={styles.bullet}>·</span>
                    <span>{`Entire ${listing.type}`}</span>
                    <span className={styles.bullet}>·</span>
                    <span>{`${listing.bedrooms} beds`}</span>
                    <span className={styles.bullet}>·</span>
                    <span>{`${listing.bathrooms} bath`}</span>
                  </div>

                  <div className={styles.amenitiesRow}>
                    {listing.amenities &&
                      listing.amenities.length > 0 &&
                      listing.amenities.slice(0, 3).map((amenity, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && (
                            <span className={styles.bullet}>·</span>
                          )}
                          <span className={styles.amenity}>{amenity}</span>
                        </React.Fragment>
                      ))}
                  </div>
                </div>

                <div className={styles.listingMeta}>
                  <div className={styles.rating}>
                    <span className={styles.stars}>
                      ★ {listing.rating || 5.0}
                    </span>
                    <span>({listing.reviews || 0} reviews)</span>
                  </div>

                  <div className={styles.listingPrice}>
                    <span className={styles.price}>
                      {formatPrice(listing.price)}
                    </span>
                    <span className={styles.perNight}>/night</span>
                  </div>
                </div>
              </div>

              <button className={styles.favoriteButton}>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    height: "24px",
                    width: "24px",
                    fill: "currentcolor",
                  }}
                >
                  <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseListings;
