import React from "react";
import styles from "../assets/Results.module.scss";
import Product from "./Product";

const Results: React.FC = () => {
  return (
    <section className={styles.resultsWrapper}>
      <Product />
      <Product />
      <Product />
    </section>
  );
};

export default Results;
