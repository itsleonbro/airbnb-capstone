import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarUser from "../../components/NavbarUser/NavbarUser";
import axios from "axios";
import styles from "./ListingDetailsPage.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ListingDetailsPage = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/accommodations/${id}`
        );
        setListing(response.data);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/edit-listing/${id}`);
  };

  const getImageUrl = image => {
    if (!image || !image.path) return "/assets/listingimg.png";

    const cleanPath = image.path.replace(/^uploads\//, "");
    return `${API_BASE_URL}/uploads/${cleanPath}`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <NavbarUser />
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <NavbarUser />
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className={styles.container}>
        <NavbarUser />
        <div className={styles.errorContainer}>
          <h2>Listing Not Found</h2>
          <p>
            The listing you're looking for doesn't exist or has been removed.
          </p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const mainImage =
    listing.images && listing.images.length > 0
      ? getImageUrl(listing.images[0])
      : "/assets/listingimg.png";

  const additionalImages =
    listing.images && listing.images.length > 1
      ? listing.images.slice(1, 5).map(img => getImageUrl(img))
      : Array(4).fill("/assets/listingimg.png");

  return (
    <div className={styles.container}>
      <NavbarUser />

      <div className={styles.backLink}>
        <button onClick={() => navigate(-1)}>&larr; Back to listings</button>
      </div>

      <div className={styles.listingHeader}>
        <h1>{listing.title}</h1>
        <div className={styles.subheader}>
          <div className={styles.rating}>
            <span className={styles.stars}>★ {listing.rating.toFixed(1)}</span>
            <span className={styles.reviews}>({listing.reviews} reviews)</span>
          </div>
          <div className={styles.location}>{listing.location}</div>
        </div>
      </div>

      <div className={styles.imageGallery}>
        <div className={styles.mainImage}>
          <img src={mainImage} alt={listing.title} />
        </div>
        <div className={styles.thumbnails}>
          {additionalImages.map((src, index) => (
            <div key={index} className={styles.thumbnail}>
              <img src={src} alt={`${listing.title} - view ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <section className={styles.hostSection}>
            <h2>
              {listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}{" "}
              hosted by {listing.host}
            </h2>
            <p>
              {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
              {listing.bathrooms} bathrooms
            </p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.featuresSection}>
            {listing.enhancedCleaning && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div>
                  <h3>Enhanced Cleaning</h3>
                  <p>
                    This host has committed to our enhanced cleaning protocol.
                  </p>
                </div>
              </div>
            )}

            {listing.selfCheckIn && (
              <div className={styles.feature}>
                <div className={styles.featureIcon}>🔑</div>
                <div>
                  <h3>Self Check-In</h3>
                  <p>Check yourself in with the key lockbox.</p>
                </div>
              </div>
            )}
          </section>

          <hr className={styles.divider} />

          <section className={styles.descriptionSection}>
            <h2>About this place</h2>
            <p>{listing.description}</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.amenitiesSection}>
            <h2>What this place offers</h2>
            <div className={styles.amenitiesList}>
              {listing.amenities.map(amenity => (
                <div key={amenity} className={styles.amenity}>
                  <span className={styles.amenityIcon}>✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={styles.specificRatingsSection}>
            <h2>What guests say about this place</h2>
            {Object.entries(listing.specificRatings).map(([key, value]) => (
              <div key={key} className={styles.specificRating}>
                <div className={styles.ratingLabel}>{key}</div>
                <div className={styles.ratingBar}>
                  <div
                    className={styles.ratingFill}
                    style={{ width: `${(value / 5) * 100}%` }}
                  ></div>
                </div>
                <div className={styles.ratingValue}>{value.toFixed(1)}</div>
              </div>
            ))}
          </section>
        </div>

        <div className={styles.sidebarContent}>
          <div className={styles.pricingCard}>
            <div className={styles.priceHeader}>
              <h3>
                <span className={styles.price}>R{listing.price}</span> / night
              </h3>
              <div className={styles.miniRating}>
                ★ {listing.rating.toFixed(1)} · {listing.reviews} reviews
              </div>
            </div>

            {isAuthenticated && role === "host" ? (
              <div className={styles.adminActions}>
                <button onClick={handleEdit} className={styles.editButton}>
                  Edit Listing
                </button>
              </div>
            ) : isAuthenticated && role === "user" ? (
              <div className={styles.userActions}>
                <button
                  onClick={() => navigate(`/reserve/${id}`)}
                  className={styles.bookButton}
                >
                  Book Now
                </button>
              </div>
            ) : null}

            <div className={styles.pricingDetails}>
              <div className={styles.pricingRow}>
                <span>Weekly discount</span>
                <span>{listing.weeklyDiscount}%</span>
              </div>
              <div className={styles.pricingRow}>
                <span>Cleaning fee</span>
                <span>R{listing.cleaningFee}</span>
              </div>
              <div className={styles.pricingRow}>
                <span>Service fee</span>
                <span>R{listing.serviceFee}</span>
              </div>
              <div className={styles.pricingRow}>
                <span>Occupancy taxes</span>
                <span>R{listing.occupancyTaxes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
