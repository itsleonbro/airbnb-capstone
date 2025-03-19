import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./BrowseListings.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    checkIn: "",
    checkOut: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // extract search params from url when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const updatedFilters = {
      location: queryParams.get("location") || "",
      type: queryParams.get("type") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      guests: queryParams.get("guests") || "",
      checkIn: queryParams.get("checkIn") || "",
      checkOut: queryParams.get("checkOut") || "",
    };

    setFilters(updatedFilters);
  }, [location.search]);

  //  fetch listings based on current filters
  useEffect(() => {
    fetchListings();
  }, [filters]);

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

        // update url with current filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    navigate(`/browse-listings?${queryParams.toString()}`, { replace: true });
    fetchListings();
  };

  const handleListingClick = listingId => {
    navigate(`/listing/${listingId}`);
  };

  const formatPrice = price => {
    return `R${price.toLocaleString()}`;
  };

  const getImageUrl = listing => {
    if (listing.images && listing.images.length > 0) {
      const imagePath = listing.images[0].path;

      const cleanPath = imagePath.replace(/^uploads\//, "");
      return `${API_BASE_URL}/uploads/${cleanPath}`;
    }
    return "/assets/listingimg.png";
  };

  const formatDateRange = () => {
    if (!filters.checkIn || !filters.checkOut) return null;

    try {
      const checkIn = new Date(filters.checkIn);
      const checkOut = new Date(filters.checkOut);

      const options = { day: "numeric", month: "short" };
      return `${checkIn.toLocaleDateString(
        "en-ZA",
        options
      )} - ${checkOut.toLocaleDateString("en-ZA", options)}`;
    } catch (error) {
      return null;
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading Listings...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{listings.length}+ stays in South Africa</h1>

      {formatDateRange() && (
        <div className={styles.dateRange}>
          <span>{formatDateRange()}</span>
          {filters.guests && (
            <span>
              {" "}
              · {filters.guests} guest{filters.guests > 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

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
                    src={getImageUrl(listing)}
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
