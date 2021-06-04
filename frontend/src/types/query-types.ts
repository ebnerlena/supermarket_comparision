export type QueryDataType = {
  searchText: string
  priceRange: string
  supermarket: string
}

export type IResponseDoc = {
  title_t_sort: string
  supermarket_t_sort: string
  quantity_txt_de: string
  price_f: number
  image_url_t: string
  id: string
  _version_: number
}
