<template>
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
</template>