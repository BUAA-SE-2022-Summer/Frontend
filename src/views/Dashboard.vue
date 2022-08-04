<template>
  <div id="app">
    <v-navigation-drawer app expand-on-hover height="100vh" mini-variant-width="8.5vh">
      <!-- <v-list>
        <v-list-item-group color="primary">
          <v-list-item class="home" @click="">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>墨书</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-btn class="mx-2" fab dark color="indigo">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-list-item>
          <router-link to="/dashboard/demo">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-folder-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>项目</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/dashboard/team">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>管理</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list> -->
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img v-if="user_info.img !== null" v-bind:src=user_info.img></v-img>
            <Avatar v-else :username="user_info.username" :backgroundcolor="user_info.username" color="#fff"
              style="vertical-align: middle;" :inline="true" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user_info.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user_info.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
        <router-link to="/dashboard/demo">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>项目</v-list-item-title>
        </v-list-item>
           </router-link>
        <router-link to="/dashboard/team">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>管理</v-list-item-title>
        </v-list-item>
        </router-link>
      </v-list>
      <template v-slot:append>
        <div>
          <v-menu allow-overflow top :offset-x="true" :close-on-click="true">
            <template v-slot:activator="{ on }">
              <v-btn class="butt" v-on="on">
                <v-avatar>
                  <img src="../assets/logo.svg" alt="">
                </v-avatar>
              </v-btn>
            </template>
            <TeamListCard />
          </v-menu>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main style="padding:0%">
      <router-view />
    </v-main>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}

.butt {
  display: block;
  margin: 0 auto;
  width: 20px;
  height: 170px;
  border-radius: 60px;
}
</style>


<script>
import TeamListCard from "../components/team/TeamListCard.vue"
export default {
  components: {
    TeamListCard,
  },
  data: () => ({
    user_info: JSON.parse(sessionStorage.getItem("user_info")),
  }),
  created() {
    console.log(this.user_info)
  },
  methods: {
  }
}
</script>
