import { API_ML, LIMIT } from './settings-ml'
import { IProduct } from '../src/types'
import { IFilter } from '../src/models/filter'

interface IGetProductsProps {
  keyword: string
  filters?: IFilter
  page?: number
}

let products: Array<IProduct> = []

const buildSearchUrl = ({ keyword, filters, page = 0 }: IGetProductsProps): string => {
  let sarchUrl = `/sites/MLA/search?q=${keyword}&since=today&condition=used&sort=price_asc&limit=${LIMIT}&offset=${
    page * LIMIT
  }`

  if (filters?.minPrice && filters?.maxPrice) {
    sarchUrl += `&price=${filters.minPrice}-${filters.maxPrice}`
  }
  return sarchUrl
}

export const getProducts = async ({ keyword = '', filters, page = 0 }: IGetProductsProps) => {
  const searchUrl = buildSearchUrl({ keyword, filters, page })
  const { data } = await API_ML.get(searchUrl)
  const { results } : {results: Array<IProduct>} = data
  const totalResults = data.paging.total

  products = [...products, ...results]

 // Si hay mas resultados queremos seguir buscando resultados y guardandolos en products
  if (products.length < totalResults) {
    await getProducts({ keyword, filters, page: page + 1 })
  }

  return {
    products: products.sort((productA, productB) => (productA.price > productB.price ? 1 : -1)),
    totalResults: totalResults,
  }
}
