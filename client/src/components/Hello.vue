<template>
  <div class="hello">
    <h1>Main Page for Professors</h1>
    <br>
    <div>
      <router-link v-bind:to="{ name: 'Posts' }" class="">Roster</router-link>
    </div>
    <br>
    <div>
      <router-link v-bind:to="{ name: 'Attendance' }" class="">Take Attendance</router-link>
    </div>
    <br>
    <div>
      <router-link v-bind:to="{ name: 'Import' }" class="">Import Class</router-link>
    </div>
    <br>
    <div> click on date to take attendance for that day </div>
    <br>
    <datepicker :inline="true" v-model="daychosen" class="calendar"></datepicker>

</div>

</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'hello',
  components: {
      Datepicker
  },
  data () {
    return {
      daychosen: new Date(), //delay don't use this
      correctday: new Date() //use this value
    }
  },
  watch: {
    daychosen: function(val) {
      this.correctday = val
      console.log("day", this.correctday);
    }
  }
}
</script>

<style>
.calendar {
  left: 10%;
}

</style>
