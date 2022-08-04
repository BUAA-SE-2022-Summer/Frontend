<template>
  <div>
    <v-navigation-drawer permanent expand-on-hover mini-variant-width="8.5vh" height="100vh">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>My Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
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
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>
<script>
import CreateCard from "../components/CreateCard.vue";
export default {
  components: { CreateCard }
}
</script>