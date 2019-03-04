import http from '@/utils/request'

export default {
  index: (params) => http.get("/index", params),
}