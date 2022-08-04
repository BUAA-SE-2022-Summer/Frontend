<template>
  <v-card max-height="28.7vh" min-height="28.7vh" min-width="45vh" max-width="45vh" class="mx-auto" tile>
    <v-list v-if="items.length !== 0">
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item two-line v-for="(item, i) in items" :key="i">
          <v-list-item-icon>
            <v-img :src="'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/default.jpg'" class="mr-4" max-width="48"
              min-width="48"></v-img>
          </v-list-item-icon>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle>{{ item.member_num }} 名成员</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div v-else style="text-align: center; left: 50%;	top: 50%;">
      <div style="padding-top:20px;text-align:center;font-size: 16px">
        还没有团队噢
      </div>
      <img src="../../assets/empty-star.svg" alt="" style="display:center">
      <div style="left: 50%;	top: 50%;text-align:center;font-size: 16px">
        在“新建”创建属于你的团队吧
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { name: 'HR007', member_num: '10' },
    ],
  }),
  created() {
    this.$axios.post(
      'team/show_my_team_list',
    ).then(response => {
      console.log(response);
      this.items = response.data.team_list;
    }).catch(error => {
      console.log(error)
    })
  },
  method: {

  }
}
</script>

<style>
.btn {
  left: 30%;
  top: 10%;
}
</style>