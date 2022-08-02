<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer app width="10%">
        <v-list style="float: left" width="100%">
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
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon>mdi-folder-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>项目</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <router-link to="/dashboard">
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
        <v-col>
            <v-list style="float: left" width="15%">
              <v-text-field
                  v-model="search"
                  label="搜索项目"
                  hide-details
                  solo
                  prepend-inner-icon="mdi-magnify"
                  @keyup.enter="search"
              ></v-text-field>
              <v-list-item-group
                  color="primary"
              >
                <v-list-item @click="">
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>已加入的团队</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-list-item @click="">
                  <v-list-item-icon>
                    <v-icon>mdi-console</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>工作台</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="">
                  <v-list-item-icon>
                    <v-icon>mdi-folder-plus</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>我创建的项目</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="">
                  <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>我加入的项目</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-list-item @click="">
                  <v-list-item-icon>
                    <v-icon>mdi-delete-empty</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>回收站</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
        </v-col>
      </v-main>
    </v-app>
  </div>
</template>

<style>
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