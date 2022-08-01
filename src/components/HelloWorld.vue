<template>
  <div class="main">
    <v-navigation-drawer class="left">
      <v-container fluid style="height: 90px">
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar>
                  <img src="../assets/logo.png" alt="">
                </v-avatar>
                <v-content>
                  <v-list-item-title>
                    {{user.username}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{user.identity}}
                  </v-list-item-subtitle>
                </v-content>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar>
                    <img src="../assets/logo.png" alt="">
                  </v-avatar>
                  <h3>{{ user.exactname }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>
                    Edit Account
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>
                    Disconnect
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>
      <v-divider />
      <v-list>
          <v-list-item class="home" @click="">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>首页</v-list-item-title>
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
          <v-list-item @click="">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>管理</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>关于</v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content class="middle-1">
      <v-text-field
          v-model="search"
          label="搜索项目"
          hide-details
          solo
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="search"
      ></v-text-field>
      <v-list flat>
        <v-list-item @click="">
          <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>已加入的企业</v-list-item-title>
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
      </v-list>
    </v-content>
    <v-content class="middle-2">
      <v-list flat>
        <v-list-item @click="">
          <v-list-item-icon>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>成员管理</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click>
          <v-list-item-icon>
            <v-icon>mdi-book-open-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>操作日志</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "FeatureHome",
  data:() => ({
    search: "",
    user: {
      username: "avavav",
      exactname: "管理员",
      email: "",
      identity: "admin",
    }
  }),
  methods: {
  }
}
</script>

<style scoped>
.main {
  display: block;
  height: 100%;
}
.left {
  width: 200px;
  height: 100%;
  background: #fafafa;
}
.middle-1 {
  width: 200px;
  height: 100%;
  background: #fafafa;
}
.middle-2 {
  width: 200px;
  height: 100%;
  background: #fafafa;
}
</style>