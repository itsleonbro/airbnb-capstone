import React from "react";
import styles from "./InspirationCard.module.css";

const InspirationCard = ({ title, distance }) => {
  return (
    <div className={styles.cardContainer}>
      <img src="/assets/inspirationCard/sandtoncity.jpeg" alt="" />
      <div className={styles.cardInfo}>
        <h2>{title}</h2>
        <p>{distance}km away</p>
      </div>
    </div>
  );
};

export default InspirationCard;

// import React from "react";
// import styles from "./InspirationCard.module.css";

// const InspirationCard = () => {
//   return (
//     <div className={styles.cardContainer}>
//       <img src="/assets/inspirationCard/sandtoncity.jpeg" alt="" />
//       <div className={styles.cardInfo}>
//         <h2> Sandton City Hotel</h2>
//         <p>53km away</p>
//       </div>
//     </div>
//   );
// };

// export default InspirationCard;
