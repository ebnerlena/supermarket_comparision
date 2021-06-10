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
  const [startIndex, setStartIndex] = useState(0)

  const resultProducts =
    useSelector((state: RootStateOrAny) => state.products) || []

  const queryData = useSelector((state: RootStateOrAny) => state.query) || {}

  const formData = useSelector((state: RootStateOrAny) => state.formData)

  const dispatch = useDispatch()

  const handleSuggestionClicked = (searchText: string) => {
    setStartIndex(0)
    const queryData: QueryDataType = {
      searchText: searchText,
      priceRange: formData.priceRange,
      supermarket: formData.supermarket,
      sorting: formData.sorting,
      startIndex: startIndex,
    }
    dispatch(setFormDataActionCreator(queryData))
    dispatch(queryActionCreator(queryData))
  }

  const handleRefetch = () => {
    setStartIndex(startIndex + 15)
    dispatch(
      queryActionCreator({
        ...formData,
        startIndex: startIndex,
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
              dataLength={resultProducts.length} //This is important field to render the next data
              className={styles.infinite_scroll_component}
              next={() => handleRefetch()}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
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
            <span>{formData.searchQuery}</span>...
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
