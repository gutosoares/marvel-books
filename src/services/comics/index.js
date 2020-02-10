import api from '../api'
import { PUBLIC_KEY, timestamp, hash } from '../../credentials'

const fetchComics = async ({limit = 20, offset = 0}) => {
  const { data } = await api.get(`/comics?ts=${timestamp}&limit=${limit}&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash}`)
  return data
}

const fetchComicById = async ({ id }) => {
  const { data } = await api.get(`/comics/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`)
  return data
}

export {
  fetchComics,
  fetchComicById
}
