// used for hitting the posts api endpoint in API.js
import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost (params) {
    return Api().post('posts', params)
  },

  updatePost (params) {
    console.log('Api.get', Api().get('post/' + params.id))
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  },


}
