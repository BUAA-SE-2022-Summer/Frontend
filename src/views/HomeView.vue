<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Test CICD" />
    <div>
      <button @click="testregister"> testregister </button>
      <button @click="testlogin"> testlogin </button>
      <button @click="testfindall"> testfindall </button>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    testregister() {
      console.log('testregister')
      this.$axios.post(
        'user/register',
        this.$qs.stringify({
          username: 'testAxios',
          password: 'test'
        })
      ).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    testlogin() {
      console.log('ttestloginest')
      this.$axios.post(
        'user/login',
        this.$qs.stringify({
          username: 'testAxios',
          password: 'test'
        })
      ).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    testfindall() {
      console.log('test')
      this.$axios.get(
        'user/find_all',
      ).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}


</script>
