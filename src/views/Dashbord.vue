<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer app width="10%">
        <v-list>
          <v-list-item-group
              color="primary">
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
            <router-link to="/dashboard/main">
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
          <v-btn @click="" class="butt">
            <v-avatar>
              <img src="../assets/logo.png" alt="">
            </v-avatar>
          </v-btn>
        </template>
      </v-navigation-drawer>
      <v-main>
          <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
a{
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
import  MemberManage  from '../components/team/MemberManage.vue';
import TeamMainVue from '@/components/team/TeamMain.vue';
export default {
  components: { MemberManage ,TeamMainVue},
  data: () => ({

  }),
  methods: {
    test() {
      alert('You clicked next!')
    }
  }
}
</script>
<!-- <template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer app width="300">
                <v-row class="fill-height" no-gutters>
                    <v-navigation-drawer dark permanent color="grey lighten-3" mini-variant mini-variant-width="87px">
                        <v-icon large @click="test">
                            mdi-chevron-right
                        </v-icon>
                        <v-icon large color="orange darken-2" @click="test">
                            mdi-arrow-up-bold-box-outline
                        </v-icon>
                        <v-icon large color="blue-grey darken-2" @click="test">
                            mdi-call-split
                        </v-icon>
                        <v-divider class="mx-3 my-5"></v-divider>
                        <template v-slot:append>
                            <div class="pa-2">
                                <v-btn block>
                                    Logout
                                </v-btn>
                            </div>
                        </template>

                    </v-navigation-drawer>


                    <v-list class="grow" width="187px">
                        <v-list-item v-for="n in 5" :key="n" link>
                            <v-list-item-content>
                                <v-list-item-title>Item {{ n }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-row>
            </v-navigation-drawer>
            <v-main>
                <v-icon large @click="test">
                    mdi-chevron-right
                </v-icon>
                <router-view />
            </v-main>
        </v-app>
    </div>
</template>

<style>
</style>

<script>
export default {
    data: () => ({

    }),
    methods: {
        test() {
            alert('You clicked next!')
        }
    }
}
</script> -->