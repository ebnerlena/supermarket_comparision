import React from "react"
import styles from "../assets/Product.module.scss"
import parse from "html-react-parser"

type ProductPropsType = {
  title: string
  price: number
  quantity: string
  image: string
  supermarket: string
  highlightString: string
}

const Product = ({
  title,
  price,
  quantity,
  image,
  supermarket,
  highlightString,
}: ProductPropsType): JSX.Element => {
  return (
    <div className={styles.productBox}>
      <span className={styles.title}>{title}</span>
      <div className={styles.imageWrapper}>
        <img
          src={
            !!image
              ? image
              : "https://cdn3.iconfinder.com/data/icons/e-face/128/_Face_Savoring_Food-256.png"
          }
          alt={title}
        />
      </div>
      <span className={styles.supermarket}>{supermarket}</span>
      <span className={styles.quantity}>{quantity}</span>
      <span className={styles.price}>{price} €</span>
      <span className={styles.highlighting}>
        {parse(highlightString, { trim: false })}
      </span>
    </div>
  )
}

export default Product
