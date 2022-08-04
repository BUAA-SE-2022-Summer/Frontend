<template>
  <div id="app">

    <v-app id="inspire">
      <v-navigation-drawer app width="10%">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item class="home" @click="">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>墨书</v-list-item-title>
            </v-list-item>
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>新建</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <router-link to="/dashboard/demo">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-folder-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>项目</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/dashboard/team">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>管理</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
        <template v-slot:append>
          <div>
            <v-menu allow-overflow top :offset-x="true" :close-on-click="true">
              <template v-slot:activator="{ on, attrs }">
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
    </v-app>
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

  }),
  methods: {
    test() {
      alert('You clicked next!')
    }
  }
}
</script>
