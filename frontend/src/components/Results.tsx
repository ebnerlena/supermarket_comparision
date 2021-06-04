import React from "react"
import styles from "../assets/Results.module.scss"
import Product from "./Product"
import { RootStateOrAny, useSelector } from "react-redux"
import { IResponseDoc } from "../types/query-types"

const Results: React.FC = () => {
  const resultData =
    useSelector((state: RootStateOrAny) => state.response) || {}

  console.log(resultData)

  return (
    <div className={styles.resultsWrapper}>
      {resultData.numFound ? (
        <>
          <section className={styles.resultsMenu}>
            <span>{`${resultData.numFound} results`} </span>
            <div className={styles.sortWrapper}>SORT BY</div>
          </section>
          <section className={styles.productsWrapper}>
            {resultData.docs.map((prod: IResponseDoc) => (
              <Product
                title={prod.title_t_sort}
                price={prod.price_f}
                quantity={prod.quantity_txt_de}
                image={prod.image_url_t}
                key={prod.id}
              />
            ))}
          </section>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Results
