import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

export default {
  list: () => http.get('/posts').then((r) => r.data),
  get: (id) => http.get(`/posts/${id}`).then((r) => r.data),
  create: (payload) => http.post('/posts', payload).then((r) => r.data),
  update: (id, payload) => http.put(`/posts/${id}`, payload).then((r) => r.data),
  remove: (id) => http.delete(`/posts/${id}`).then((r) => r.data),
}