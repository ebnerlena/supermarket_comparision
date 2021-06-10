import React, { FormEvent } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Switch from "react-switch"
import styles from "../assets/Form.module.scss"
import { clearProductsActionCreator } from "../redux/action-creators/clear-actioncreator"
import { setFormDataActionCreator } from "../redux/action-creators/form-actioncreator"
import { queryActionCreator } from "../redux/action-creators/query-actioncreator"
import { QueryDataType } from "../types/query-types"

const Form = (): JSX.Element => {
  const dispatch = useDispatch()
  const [priceRange, setPriceRange] = useState("")
  const [supermarket, setSupermarket] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sorting, setSorting] = useState("relevance")
  const [switchStatus, setSwitchStatus] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const queryData: QueryDataType = {
      searchText: searchQuery,
      priceRange: priceRange,
      supermarket: supermarket,
      sorting: sorting,
      startIndex: 0,
    }
    dispatch(clearProductsActionCreator())
    dispatch(setFormDataActionCreator(queryData))
    dispatch(queryActionCreator(queryData))
  }

  const handleSwitch = (checked: boolean) => {
    setSwitchStatus(checked)
    setSupermarket("")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.normalWrapper}>
        <input
          type="text"
          name="searchfield"
          value={searchQuery}
          placeholder="Enter search query..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input type="submit" name="submit" value="SEARCH" />
        <label>
          <span>Advanced Options</span>
          <Switch onChange={handleSwitch} checked={switchStatus} />
        </label>
      </div>
      {switchStatus ? (
        <div className={styles.advancedWrapper}>
          <select
            name="supermarket"
            onChange={(e) => setSupermarket(e.target.value)}
          >
            <option value="lidl">Lidl</option>
            <option value="hofer">Hofer</option>
            <option value="penny">Penny</option>
            <option value="spar">Interspar</option>
          </select>
          <input
            type="range"
            name="pricerange"
            min="1"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
      ) : (
        <></>
      )}
    </form>
  )
}

export default Form
