import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListingsCard.module.css";

const ListingsCard = ({ listing, onDelete, onEdit }) => {
  const navigate = useNavigate();

  // use the first image from the listing or a placeholder IF no imgs
  const mainImage =
    listing?.images?.length > 0
      ? `http://localhost:5001/${listing.images[0].path}`
      : "/assets/listingimg.png";

  const handleCardClick = e => {
    // Prevent click if user clicked on buttons
    if (e.target.tagName === "BUTTON") {
      return;
    }
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div>
      <div className={styles.cardContainer} onClick={handleCardClick}>
        <div className={styles.leftSide}>
          <img src={mainImage} alt={listing?.title || "Accommodation"} />
          <button
            className={styles.updateBtn}
            onClick={e => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Update
          </button>
          <button
            className={styles.deleteBtn}
            onClick={e => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>

        <div className={styles.rightSide}>
          <p>{listing?.type || "Hotel"}</p>
          <h2>{listing?.title || "Accommodation Title"}</h2>
          <p>
            {listing?.guests || 4}-{listing?.guests + 2 || 6} guests · Entire
            Home · {listing?.bedrooms || 5} beds · {listing?.bathrooms || 3}
            bath
          </p>
          <p>{(listing?.amenities || []).join(" · ")}</p>
          <div className={styles.viewDetailsLink}>View Details &rarr;</div>
        </div>
      </div>
    </div>
  );
};

export default ListingsCard;
