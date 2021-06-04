import React, { FormEvent } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Switch from "react-switch"
import styles from "../assets/Form.module.scss"
import { queryActionCreator } from "../redux/action-creators/query-actioncreator"
import { QueryDataType } from "../types/query-types"

const Form: React.FC = () => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [supermarket, setSupermarket] = useState("")
  const [switchStatus, setSwitchStatus] = useState(false)

  useEffect(() => {
    const queryData: QueryDataType = {
      searchText: "Karotten",
      priceRange: "",
      supermarket: "",
    }
    dispatch(queryActionCreator(queryData))
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const queryData: QueryDataType = {
      searchText: searchText,
      priceRange: priceRange,
      supermarket: supermarket,
    }
    dispatch(queryActionCreator(queryData))

    console.log(searchText)
    console.log(priceRange)
    console.log(supermarket)
  }

  const handleSwitch = (checked: boolean) => {
    setSwitchStatus(checked)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.normalWrapper}>
        <input
          type="text"
          name="searchfield"
          value={searchText}
          placeholder="Enter search query..."
          onChange={(e) => setSearchText(e.target.value)}
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
            <option value="billa">Billa</option>
            <option value="interspar">Interspar</option>
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
