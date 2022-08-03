<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer>
        <v-list style="float: left" width="80%">
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
            <router-link to="/dashboard/demo/console">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-console</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>工作台</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/dashboard/demo/create">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-folder-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>我创建的项目</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/dashboard/demo/star">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-star</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>星标项目</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <v-divider />
            <router-link to="/dashboard/demo/trash">
              <v-list-item @click="">
                <v-list-item-icon>
                  <v-icon>mdi-delete-empty</v-icon>
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
    </v-app>
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
import DemoConsole  from "@/components/demo/DemoConsole";
import DemoJoin from "@/components/demo/DemoJoin";
import DemoStar from "@/components/demo/DemoStar";
import DemoTrash from "@/components/demo/DemoTrash";
export default {
  components: { DemoConsole, DemoJoin, DemoStar, DemoTrash },
  data: () => ({

  }),
  methods: {
    test() {
      alert('You clicked next!')
    }
  }
}
</script>