// used for hitting the posts api endpoint in API.js
import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost (params) {
    return Api().post('posts', params)
  }
}
