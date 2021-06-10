import React, { useState } from "react"
import styles from "../assets/Results.module.scss"
import Product from "./Product"
import { RootStateOrAny, useSelector, useDispatch } from "react-redux"
import { IProduct, ISuggestionDoc } from "../types/query-types"
import { queryActionCreator } from "../redux/action-creators/query-actioncreator"
import { QueryDataType } from "../types/query-types"
import { setFormDataActionCreator } from "../redux/action-creators/form-actioncreator"
import InfiniteScroll from "react-infinite-scroll-component"

const Results = (): JSX.Element => {
  const resultProducts =
    useSelector((state: RootStateOrAny) => state.products) || []

  const queryData = useSelector((state: RootStateOrAny) => state.query) || {}

  const formData = useSelector((state: RootStateOrAny) => state.formData)

  const dispatch = useDispatch()

  const handleSuggestionClicked = (searchText: string) => {
    const queryData: QueryDataType = {
      ...formData,
      searchText: searchText,
      startIndex: 0,
    }
    dispatch(setFormDataActionCreator(queryData))
    dispatch(queryActionCreator(queryData))
  }

  const handleRefetch = () => {
    dispatch(
      setFormDataActionCreator({
        ...formData,
        startIndex: formData.startIndex + 15,
      })
    )
    dispatch(
      queryActionCreator({
        ...formData,
        startIndex: formData.startIndex + 15,
      })
    )
  }

  return (
    <div className={styles.resultsWrapper}>
      {resultProducts.length > 0 ? (
        <>
          <section className={styles.resultsMenu}>
            <span>{`${queryData.response.numFound} results`} </span>
            <div className={styles.sortWrapper}>SORT BY</div>
          </section>
          <section className={styles.productsWrapper}>
            <InfiniteScroll
              dataLength={resultProducts.length}
              className={styles.infinite_scroll_component}
              next={() => handleRefetch()}
              hasMore={
                queryData.response.numFound >= formData.startIndex &&
                queryData.response.numFound > 15
              }
              loader={<h4>Loading...</h4>}
              endMessage={
                <div className={styles.scrollingText}>
                  <b>Yay! You have seen it all</b>
                </div>
              }
            >
              {resultProducts.map((prod: IProduct) => (
                <Product
                  title={prod.title_t_sort}
                  price={prod.price_f}
                  quantity={prod.quantity_txt_de}
                  image={prod.image_url_t}
                  supermarket={prod.supermarket_t_sort}
                  highlightString={prod.highlightString}
                  key={prod.id}
                />
              ))}
            </InfiniteScroll>
          </section>
        </>
      ) : (
        <div className={styles.suggestionsWrapper}>
          <h3>
            Unfortunately there are no results according your search for{" "}
            <span>{formData.searchText}</span>...
          </h3>
          <h4>Maybe you want to try: </h4>
          <ul className={styles.suggestionsList}>
            {queryData.spellcheck?.suggestions?.map(
              (sug: ISuggestionDoc, index: number) =>
                sug.suggestion ? (
                  sug?.suggestion?.map((s, i) => (
                    <li key={`suggestion${index + i}`}>
                      <div
                        onClick={() => handleSuggestionClicked(s.word)}
                        className={styles.suggestionLink}
                      >
                        {s.word}
                      </div>
                    </li>
                  ))
                ) : (
                  <> </>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Results
