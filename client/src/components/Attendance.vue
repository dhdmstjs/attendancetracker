<template>
  <div class = "attendance">
    <h1>Attendance for {{fullday}}</h1>
    <vue-swing
    @throwout="onThrowout"
    :config="config"
    ref="vueswing">
      <div v-for = "post in posts" :key=post.name class= "name" id="name">
        <span>{{post.name}}</span>
      </div>
  </vue-swing>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
import VueSwing from 'vue-swing'

export default {
  name: 'Attendance',
  components: {
    VueSwing
  },
  data () {
    return {
      stacksize: '', //to calculate whether stack empty or not
      posts: [],
      dates : [],
      today : '',
      fullday: '',
      config: {
        allowedDirections: [
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 300,
        maxThrowOutDistance: 400
      }
    }
  },
  mounted () {
    this.getPosts()
    this.getDay()
    this.convertDay()
  },
  computed: {
    dateDisplay: function(){
      console.log("this.posts[0].date", this.posts[0].date);
      return this.posts[0].date
    }

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
    getDay() {
      let today = new Date()
      let yy = today.getFullYear().toString().substr(-2)
      let mm = today.getMonth()+1
      let dd = today.getDate()
      if (dd<10) {
        dd = '0' + dd
      }
      if (mm<19) {
        mm = '0' + mm
      }
      today = yy+mm+dd
      this.today = today
      return today
    },
    async convertDay () {
      let today = this.getDay()
      let fullYear = '20'
      let fulldate = fullYear + today
      this.fullday = fulldate
    },
    async getPosts () {
      const response = await PostsService.fetchPosts({
      })
      console.log("response", response.data);
      this.posts = response.data.posts
      console.log('posts', this.posts)
      this.dates = this.getDate(this.posts)
    },
    swing () {
      const cards = this.$refs.vueswing.cards
      cards[cards.length - 1].throwOut(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      )
    },
    changeValue (date, attend, array) {
      for (var i in array) {
        if (array[i].date == date) {
          array[i].attend = attend
          break
        }
      }
    },
    async updatePost (target, direction) {
      let day = this.today
      for (let student in this.posts) {
        if (this.posts[student].name == target && direction == 'left') {
          let dateupdate = {date: day, attend: "present"}
          let datearr = this.posts[student].date
          for (let days in this.posts[student].date){
            console.log("testingdaniels", day.indexOf(this.posts[student].date[days].date))
            if (day.indexOf(this.posts[student].date[days].date) > -1) { //if date is there
              this.posts[student].date[days].attend = 'present' //only update type of attendance
            } else {
              this.posts[student].date.push(dateupdate)
            }
          }
          // await PostsService.updatePost({
          //   id: this.posts[student]._id,
          //   netid: this.posts[student].netid,
          //   name: this.posts[student].name,
          //   date: this.posts[student].date
          // })
        }
        if (this.posts[student].name == target && direction == 'right') {
          let dateupdate = {date: day, attend: "absent"}
          let datearr = this.posts[student].date
          for (let days in this.posts[student].date){
            console.log("testingdaniels", day.indexOf(this.posts[student].date[days].date))
            if (day.indexOf(this.posts[student].date[days].date) > -1) { //if date is there
              this.posts[student].date[days].attend = 'absent' //only update type of attendance
            } else {
              this.posts[student].date.push(dateupdate)
            }
          }
          // await PostsService.updatePost({
          //   id: this.posts[student]._id,
          //   netid: this.posts[student].netid,
          //   name: this.posts[student].name,
          //   date: this.posts[student].date
          // })
        }
      }
        // this.$router.push({ name: 'Posts' })
    },
    async onThrowout ({ target, throwDirection }) {
      console.log(`Threw out ${target.textContent}!`)
      console.log("direc", throwDirection);
      if (throwDirection == VueSwing.Direction.LEFT) {
        //present -> update database
        this.stacksize ++
        this.updatePost(target.textContent, "left")
        console.log("yis");
      }
      if (throwDirection == VueSwing.Direction.RIGHT) {
        //absent
        this.stacksize ++
        console.log("no?");
      }
      if (this.stacksize == this.posts.length) { //stack emtpy = done
        window.location.replace('http://localhost:8080/posts')
      }
    }
  }
}
</script>

<style>
body {
  background-color: #D2D2D2;
  margin: 0;
}
.name {
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  font-size: 68px;
  height: 450px;
  justify-content: center;
  left: 20%;
  position: absolute;
  top: 30%;
  width: 70%;
}
</style>
