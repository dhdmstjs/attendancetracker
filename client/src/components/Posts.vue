 <template>
  <div class="posts">
    <h1>Roster</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Student</router-link>
      </div>
      <div>
        <router-link v-bind:to="{ name: 'Attendance' }" class="">Take Attendance</router-link>
      </div>
        <table align="center">
          <tr>
            <td>Name</td>
              <td v-for = "day in dateDisplay"> {{day.date}}</td>
            <td align="center">Action</td>
          </tr>
          <tr v-for="post in posts">
            <td>{{ post.name }}</td>
            <td v-for = "day in post.date">{{day.attend}}</td>
            <td align="center">
              <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link> |
              <a href="#" @click="deletePost(post._id)">Delete</a>
            </td>
          </tr>
        </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>


<script>
import PostsService from '@/services/PostsService'
import { Swipe, SwipeItem } from 'vue-swipe'
export default {
  name: 'posts',
  components: {
      swipe: Swipe,
      swipeItem: SwipeItem
    },
  data () {
    return {
      posts: [],
      dates : [],
    }
  },
  mounted () {
    this.getPosts()
  },
  computed: {
    dateDisplay: function(){
      console.log("this.posts[0].date", this.posts[0].date);
      return this.posts[0].date
    }
    // attendDisplay: function() {
    //   let item = []
    //   for (let items in this.posts){
    //     for (let stuff in this.posts[items].date) {
    //       item.push(this.posts[items].date[stuff])
    //     }
    //   }
    //   console.log("item",item);
    //   return item
    // }
  },
  methods: {
    getDate(text) {
      let dates = []
      for (let object in text) {
        for (let items in text[object].date){
          var contains = (dates.indexOf(text[object].date[items].date) > -1)
          if (!contains) {
            dates.push(text[object].date[items].date)
          }
        }
      }
      console.log("dates",dates);
    },
    async getPosts () {
      const response = await PostsService.fetchPosts()
      console.log("response", response.data);
      this.posts = response.data.posts
      console.log('posts', this.posts)
      this.dates = this.getDate(this.posts)
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
      this.$router.push({ name: 'Posts' })
    },
    changeSwipe(newIndex, oldIndex) {
     console.log(`swipe from ${oldIndex} to ${newIndex}`)
    }
  }
}
</script>

<style type="text/css">
.table-wrap {
  width: 100%;
  margin: 0px auto;
  text-align: center;
  overflow-x: scroll;
}

table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 9px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}


</style>
