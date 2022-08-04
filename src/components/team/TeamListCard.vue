<template>
  <v-card max-height="28.7vh" min-height="28.7vh" min-width="45vh" max-width="45vh" class="mx-auto" tile>
    <v-list v-if="items.length() !== 0">
      <v-list-item two-line v-for="(item, i) in items" :key="i" @click="changeCurrentTeamID(item)">
        <v-list-item-icon>
          <Avatar :username="items.username" :backgroundcolor="items.team_name" color="#fff"
            style="vertical-align: middle;" :inline="true" />
        </v-list-item-icon>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-list-item-content>
          <v-list-item-title v-text="item.team_name"></v-list-item-title>
          <v-list-item-subtitle>{{ item.member_num }} 名成员</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  data: () => ({
    items: [],
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
  methods: {
    changeCurrentTeamID(item) {
      sessionStorage.setItem('Team', item)
      sessionStorage.setItem('ProjectID', JSON.stringify(0));
      window.location.reload();
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
