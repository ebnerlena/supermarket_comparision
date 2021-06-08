import React from "react"
import styles from "../assets/Product.module.scss"

type ProductPropsType = {
  title: string
  price: number
  quantity: string
  image: string
  supermarket: string
}

const Product = ({
  title,
  price,
  quantity,
  image,
  supermarket,
}: ProductPropsType): JSX.Element => {
  return (
    <div className={styles.productBox}>
      <span className={styles.title}>{title}</span>
      <div className={styles.imageWrapper}>
        <img src={image} alt="" />
      </div>
      <span className={styles.supermarket}>{supermarket}</span>
      <span className={styles.quantity}>{quantity}</span>
      <span className={styles.price}>{price} €</span>
    </div>
  )
}

export default Product
