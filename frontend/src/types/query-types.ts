export type QueryDataType = {
  searchText: string
  supermarket: string
  sorting: ISortingType
  startIndex: number
}

export type ISortingType = {
  sortType: string
  sortOrder: string
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

export type IProduct = {
  title_t_sort: string
  supermarket_t_sort: string
  quantity_txt_de: string
  price_f: number
  image_url_t: string
  id: string
  _version_: number
  highlighting: IHighlighting
  highlightString: string
}

export type IHighlighting = {
  [key: string]: {
    [key: string]: string[]
  }
}

export type ISuggestionDoc = {
  numFound: number
  startOffset: number
  origFreq: number
  suggestion: ISuggestion[]
  correctlySpelled: boolean
}

export type ISuggestion = {
  freq: number
  word: string
}
