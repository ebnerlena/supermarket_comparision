import React from "react"
import { IResponseDoc } from "../types/query-types"
import styles from "../assets/Product.module.scss"
import { JsxElement } from "typescript"

type ProductPropsType = {
  title: string
  price: number
  quantity: string
  image: string
}

const Product = ({
  title,
  price,
  quantity,
  image,
}: ProductPropsType): JSX.Element => {
  return (
    <div className={styles.productBox}>
      <span className={styles.title}>{title}</span>
      <div className={styles.imageWrapper}>
        <img src={image} alt="" />
      </div>
      <span className={styles.quantity}>{quantity}</span>
      <span className={styles.price}>{price} €</span>
    </div>
  )
}

export default Product
