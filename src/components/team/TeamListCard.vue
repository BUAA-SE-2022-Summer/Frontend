<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list>
      <v-subheader>团队列表</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item two-line v-for="(item, i) in items" :key="i">

          <v-list-item-icon>
            <v-img :src="item.image" class="mr-4" max-width="64" min-width="64"></v-img>
          </v-list-item-icon>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.introduce"></v-list-item-subtitle>

          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-btn class='btn' outlined>
        创建我的企业
      </v-btn>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { name: 'HR007', icon: 'mdi-home', introduce: 'llo', image: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/default.jpg' },
      { name: 'HR996', icon: 'mdi-github', introduce: 'hi', image: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/default.jpg' },

    ],
  }),
  method: {
    updateEnterpriseList() {
      this.$axios.post(
        'user/enterprise',
        this.$qs.stringify({
          userid: 'userid',
        })
      ).then(response => {
        console.log(response),
          this.items = response.data.enterpriseList
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.btn {
  left: 30%;
  top: 10%;
}
</style>