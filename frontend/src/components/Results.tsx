import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import styles from "../assets/Results.module.scss"
import { clearProductsActionCreator } from "../redux/action-creators/clear-actioncreator"
import { setFormDataActionCreator } from "../redux/action-creators/form-actioncreator"
import { queryActionCreator } from "../redux/action-creators/query-actioncreator"
import { IProduct, ISuggestionDoc, QueryDataType } from "../types/query-types"
import Product from "./Product"

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

  const handleSortTypeChange = (sortType: string) => {
    dispatch(clearProductsActionCreator())

    const queryData = {
      ...formData,
      startIndex: 0,
      sorting: {
        ...formData.sorting,
        sortType: sortType,
      },
    }

    dispatch(setFormDataActionCreator(queryData))
    dispatch(queryActionCreator(queryData))
  }

  const handleSortOrderChange = (sortOrder: string) => {
    dispatch(clearProductsActionCreator())

    const queryData = {
      ...formData,
      startIndex: 0,
      sorting: {
        ...formData.sorting,
        sortOrder: sortOrder,
      },
    }

    dispatch(setFormDataActionCreator(queryData))
    dispatch(queryActionCreator(queryData))
  }

  return (
    <div className={styles.resultsWrapper}>
      {resultProducts.length > 0 ? (
        <>
          <section className={styles.resultsMenu}>
            <span>{`${queryData.response.numFound} results`} </span>
            <div className={styles.sortWrapper}>
              <select
                id="sortType"
                name="sortType"
                value={formData.sorting.sortType}
                onChange={(e) => handleSortTypeChange(e.target.value)}
              >
                <option value="score">score</option>
                <option value="title_t_sort">alphabetical</option>
                <option value="price_f">price</option>
              </select>
              <select
                id="sortOrder"
                name="sortOrder"
                value={formData.sorting.sortOrder}
                onChange={(e) => handleSortOrderChange(e.target.value)}
              >
                <option value="desc">desc</option>
                <option value="asc">asc</option>
              </select>
            </div>
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
