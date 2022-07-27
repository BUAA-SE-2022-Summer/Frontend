<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Test CICD" />
    <div>
      <button @click="test"> test </button>
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
    test() {
      console.log('test')
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
    }
  }
}


</script>
