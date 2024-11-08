import React from "react";
import styles from "./ExperiencesCard.module.css";

const ExperiencesCard = ({ title, type }) => {
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.imageWrapper}>
        <img src="src/assets/Airbnb-Homes-Cottage.webp" alt="" />
        <div className={styles.overlay}>
          <h2>{title}</h2>
          <button>{type}</button>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesCard;


// import React from "react";
// import styles from "./ExperiencesCard.module.css";

// const ExperiencesCard = () => {
//   return (
//     <div className={styles.cardContainer}>
//       <img src="../../src/assets/ExperiencesCard/sandtoncity.jpeg" alt="" />
//       <div className={styles.cardInfo}>
//         <h2> Sandton City Hotel</h2>
//         <p>53km away</p>
//       </div>
//     </div>
//   );
// };

// export default ExperiencesCard;
