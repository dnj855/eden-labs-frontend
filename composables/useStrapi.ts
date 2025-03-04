interface StrapiResponse<T> {
  data: {
    id: number
    attributes: T
  }[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiSingleResponse<T> {
  data: {
    id: number
    attributes: T
  }
}

export const useStrapi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  const get = async <T>(
    endpoint: string,
    query: Record<string, any> = {}
  ): Promise<StrapiResponse<T>> => {
    const queryString = new URLSearchParams(query).toString()
    const url = `${baseURL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`

    return useFetch<StrapiResponse<T>>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.data.value as StrapiResponse<T>)
  }

  const getOne = async <T>(
    endpoint: string,
    id: string | number,
    query: Record<string, any> = {}
  ): Promise<StrapiSingleResponse<T>> => {
    const queryString = new URLSearchParams(query).toString()
    const url = `${baseURL}/api/${endpoint}/${id}${queryString ? `?${queryString}` : ''}`

    return useFetch<StrapiSingleResponse<T>>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.data.value as StrapiSingleResponse<T>)
  }

  const getBySlug = async <T>(
    endpoint: string,
    slug: string,
    query: Record<string, any> = {}
  ): Promise<StrapiSingleResponse<T>> => {
    const filters = { slug: { $eq: slug } }
    const queryWithFilters = { ...query, filters }
    const queryString = new URLSearchParams({
      ...queryWithFilters,
      filters: JSON.stringify(filters),
    }).toString()
    
    const url = `${baseURL}/api/${endpoint}?${queryString}`

    const response = await useFetch<StrapiResponse<T>>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.data.value?.data?.[0]) {
      throw new Error('Not found')
    }

    return {
      data: response.data.value.data[0],
    }
  }

  return {
    get,
    getOne,
    getBySlug,
  }
} 