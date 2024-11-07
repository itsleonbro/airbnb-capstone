import React from "react";
import styles from "./Home.module.css";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

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
      <div className={styles.hero}>
        <div className={styles.imageContainer}>
          <img
            src="../../src/assets/Airbnb-Homes-Cottage.webp"
            alt="Image"
            className={styles.heroImg}
          />
          <div className={styles.overlay}>
            <h2>Not sure where to go? Perfect.</h2>
            <button>I’m flexible</button>
          </div>
        </div>
      </div>

      <main></main>
      <footer></footer>
    </>
  );
};

export default Home;
