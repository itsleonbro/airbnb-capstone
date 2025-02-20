import React from "react";
import styles from "./ListingsCard.module.css";

const ListingsCard = ({ listing, onDelete, onEdit }) => {
  // use the first image from the listing or a placeholder IF no imgs
  const mainImage =
    listing?.images?.length > 0
      ? `http://localhost:5001/${listing.images[0].path}`
      : "/assets/listingimg.png";

  return (
    <div>
      <div className={styles.cardContainer}>
        <div className={styles.leftSide}>
          <img src={mainImage} alt={listing?.title || "Accommodation"} />
          <button className={styles.updateBtn} onClick={onEdit}>
            Update
          </button>
          <button className={styles.deleteBtn} onClick={onDelete}>
            Delete
          </button>
        </div>

        <div className={styles.rightSide}>
          <p>{listing?.type || "Hotel"}</p>
          <h2>{listing?.title || "Accommodation Title"}</h2>
          <p>
            {listing?.guests || 4}-{listing?.guests + 2 || 6} guests · Entire
            Home · {listing?.bedrooms || 5} beds ·{listing?.bathrooms || 3} bath
          </p>
          <p>{(listing?.amenities || []).join(" · ")}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingsCard;
