<template>
  <div class="app">
    <h3>Import Students</h3>
    <br>
    <xls-csv-parser :columns="columns" @on-validate="onValidate" :help="help" lang="en"></xls-csv-parser>
    <br><br>
    <!-- <div class="results" v-if="results">
      <h3>Results:</h3>
      <pre>{{ JSON.stringify(results, null, 2) }}</pre>
    </div> -->
  </div>
</template>

<script>
  import XlsCsvParser from 'vue-xls-csv-parser'
  import PostsService from '@/services/PostsService'
  // import '../../static/boostrap.min.css'
  export default {
    name: 'App',
    components: {
      XlsCsvParser,
    },
    data() {
      return {
        columns: [
          { name: 'Campus ID', value: 'ID', isOptional: true  },
          { name: 'Net ID', value: 'netid' },
          { name: 'Student Name', value: 'name', isOptional: true },
          { name: 'Grade Basis', value: 'basis', isOptional: true  },
          { name: 'Units', value: 'units', isOptional: true  },
          { name: 'Program and Plan', value: 'program', isOptional: true  },
          { name: 'Level/Grade', value: 'grade', isOptional: true  },
          { name: 'Subject', value: 'subject', isOptional: true },
          { name: 'Catalog', value: 'catalog', isOptional: true },
          { name: 'Section', value: 'section', isOptional: true }        ],
        results: null,
        help: 'Necessary columns are: Campus ID (N00000000), NetID, Name',
      };
    },
    methods: {
      onValidate(results) {
        this.results = results;
        this.parseJSON(results)
      },
      parseName(name) {
        let temp = name.split(',')
        let newname = temp[0] + ', ' + temp [1]
        return newname
      },
      parseJSON(results) {
        let test = results
        let newJson = []
        let testLength = test.length
        let dataLength = test[0].data.length
        console.log("test, data", testLength, " ", dataLength)
        console.log('hi',test)
        for (let i = 0; i < dataLength; i++){ //number of students
          let temp = {}
          for (let y = 0; y < testLength; y++) { //how many columns
            let columnName = test[y].column
            if (columnName == 'ID') {
              temp.ID = test[y].data[i]
            }
            if (columnName == 'netid') {
              temp.netid = test[y].data[i]
            }
            if (columnName == 'name') {
              temp.name = this.parseName(test[y].data[i])
            }
            if (columnName == 'basis') {
              temp.basis = test[y].data[i]
            }
            if (columnName == 'units') {
              temp.units = test[y].data[i]
            }
            if (columnName == 'program') {
              temp.program = test[y].data[i]
            }
            if (columnName == 'grade') {
              temp.grade = test[y].data[i]
            }
            if (columnName == 'subject') {
              temp.subject = test[y].data[i]
            }
            if (columnName == 'catalog') {
              temp.catalog = test[y].data[i]
            }
            if (columnName == 'section') {
              temp.section = test[y].data[i]
            }
          }
          newJson.push(temp)
        }
        console.log("temp??",newJson)
        this.addPost(newJson)
      },
      //add students from csv
      async addPost(newJson) {
        console.log("newson",newJson);
        for (let i = 0; i <newJson.length; i++) {
          await PostsService.addPost({
              ID: newJson[i].ID,
              netid: newJson[i].netid,
              name: newJson[i].name
          })
        }
        this.$router.push({name:'Posts'})
        window.location.replace('http://localhost:8080/posts')
      }
    },
  }
</script>

<!-- <style src="../../static/bootstrap.min.css" charset="utf-8"></style> -->
