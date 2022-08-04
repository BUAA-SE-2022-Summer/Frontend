<template>
  <div id="app">
    <v-navigation-drawer>
      <v-list style="float: left" width="90%">
        <v-text-field v-model="search" label="搜索项目" hide-details solo prepend-inner-icon="mdi-magnify"
          @keyup.enter="search" style=" lightcoral;"></v-text-field>

        <hr style="color:#000;">
        <v-list-item-group color="primary">
          <router-link to="/dashboard/demo/projectlist">
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon large style="color: #720AB8;">mdi-table</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>项目列表</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/dashboard/demo/console">
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon large style="color: #3a0ca3;"> mdi-console</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>工作台</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/dashboard/demo/create">
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon large style="color: #4460EE;">mdi-folder-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>我创建的</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/dashboard/demo/star">
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon large style="color: #4ccaf0;">mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>星标</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <hr style="color:#000;">

          <router-link to="/dashboard/demo/trash">
            <v-list-item @click="">
              <v-list-item-icon>
                <v-icon large style="color: #e81d35;">mdi-delete-empty</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>回收站</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>

  </div>
</template>

<style>
a {
  text-decoration: none;
}

#app {
  width: 60%;
  height: 100%;
  position: fixed;
  top: 2%;
  left: 11%;
}
</style>

<script>
import DemoConsole from "@/components/demo/DemoConsole";
import DemoJoin from "@/components/demo/DemoJoin";
import DemoStar from "@/components/demo/DemoStar";
import DemoTrash from "@/components/demo/DemoTrash";
export default {
  components: { DemoConsole, DemoJoin, DemoStar, DemoTrash },
  data: () => ({
    search: ""
  }),
  methods: {
    test() {
      alert('You clicked next!')
    }
  }
}
</script>
