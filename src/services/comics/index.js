import api from '../api'
import { PUBLIC_KEY, timestamp, hash } from '../../credentials'

const fetchComics = async (limit = 6) => {
  const { data } = await api.get(`/comics?ts=${timestamp}&orderBy=title&limit=${limit}&apikey=${PUBLIC_KEY}&hash=${hash}`)
  return data
}

const fetchComicById = async (id) => {
  const { data } = await api.get(`/comics/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`)
  return data
}

export { 
  fetchComics,
  fetchComicById
}