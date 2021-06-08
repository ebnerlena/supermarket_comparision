import React from "react"
import styles from "../assets/Results.module.scss"
import Product from "./Product"
import { RootStateOrAny, useSelector, useDispatch } from "react-redux"
import { IResponseDoc, ISuggestionDoc } from "../types/query-types"
import { queryActionCreator } from "../redux/action-creators/query-actioncreator"
import { QueryDataType } from "../types/query-types"

type ResultsPropsType = {
  searchQuery: string,
  setSearchQuery: (query: string) => void
}

const Results = ({ searchQuery, setSearchQuery } : ResultsPropsType) : JSX.Element => {
  const resultData =
    useSelector((state: RootStateOrAny) => state.response) || {}

  const spellCheckData =
    useSelector((state: RootStateOrAny) => state.spellcheck) || {}

  const dispatch = useDispatch()

  console.log(spellCheckData)
  console.log(resultData)

  const handleSuggestionClicked = (searchText: string)  => {
    
    const queryData: QueryDataType = {
      searchText: searchText,
      priceRange: "",
      supermarket: "",
    }
    setSearchQuery(searchText)
    dispatch(queryActionCreator(queryData))
  }

  return (
    <div className={styles.resultsWrapper}>
      {resultData.numFound > 0 ? (
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
                supermarket={prod.supermarket_t_sort}
                key={prod.id}
              />
            ))}
          </section>
        </>
      ) : (
        <div className={styles.suggestionsWrapper}>
          <h3>Unfortunately there are no results according your search for <span>{searchQuery}</span>...</h3>
          <h4>Maybe you want to try: </h4>
          <ul className={styles.suggestionsList}>{spellCheckData.suggestions?.map((sug: ISuggestionDoc, index: number) => (
            sug.suggestion ? sug?.suggestion?.map((s,i) => (
              <li key={`suggestion${index+i}`}>
                <div onClick={() => handleSuggestionClicked(s.word)} className={styles.suggestionLink}>
                  {s.word}
                </div>
              </li> ))
              : <> </>
            ))} 
          </ul>
        </div>
      )}
    </div>
  )
}

export default Results
