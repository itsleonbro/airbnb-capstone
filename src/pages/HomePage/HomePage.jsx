import React from "react";
import styles from "./HomePage.module.css";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import InspirationCard from "../../components/InspirationCard/InspirationCard";
import ExperiencesCard from "../../components/ExperiencesCard/ExperiencesCard";

const Home = () => {
  return (
    <>
      <header>
        <div className={styles.navbar}>
          <NavbarDefault />
        </div>
        <div className={styles.search}>
          <SearchFilter />
        </div>
      </header>

      {/* hero section */}
      <div className={styles.hero}>
        <div className={styles.imageContainer}>
          <img
            src="/assets/Airbnb-Homes-Cottage.webp"
            alt="Image"
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay}>
            <h2>Not sure where to go? Perfect.</h2>
            <button>I’m flexible</button>
          </div>
        </div>
      </div>

      <main>
        <div className={styles.tripInspirations}>
          <h2>Inspiration for your next trip</h2>
          {/* inspiration cards that use props to display info */}
          <div className={styles.inspirationHotelCards}>
            <InspirationCard title="Sandton City Hotel" distance="53" />
            <InspirationCard title="Joburg City" distance="129" />
            <InspirationCard title="Woodmead Hotel" distance="23" />
            <InspirationCard title="Sandton City Hotel" distance="8" />
          </div>
        </div>

        <div className={styles.experiences}>
          <h2>Discover Airbnb Experiences</h2>
          {/* experience cards that use props to display info */}
          <div className={styles.experiencesCards}>
            <ExperiencesCard
              title="Things to do on your trip"
              type="Experiences"
            />
            <ExperiencesCard
              title="Things to do from home"
              type="Online Experiences"
            />
          </div>
        </div>

        {/* gift cards sections */}
        <div>
          <div className={styles.giftCardsContainer}>
            <div className={styles.giftCardText}>
              <h2>
                Shop Airbnb <br />
                gift cards
              </h2>
              <button>Learn more</button>
            </div>
            <div className={styles.giftCards}>
              <img src="/assets/giftcards.webp" alt="" />
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
