<template>
    <v-container class="grey lighten-5">

    <v-card
    class="mx-auto"
    width="300px"
    style="float:left"
    height="100vh"
    >
        <v-list dense>
        <v-subheader>成员管理</v-subheader>
          <v-list-item-group
              color="primary"
          >
            <v-list-item>
                <v-list-item-icon>
                <v-icon >mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title >全部成员</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item>
                <v-list-item-icon>
                <v-icon >mdi-account-tie</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title >管理员</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
    </v-card>
    <v-card
    class="mx-auto"
    width="600px"
    style="float:left; height: 100vh;"
    >
    <MemberTables></MemberTables>
    <!-- <v-card-title >全部成员</v-card-title>
        <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        style="margin:0%;height:auto"
        ></v-data-table> -->
  </v-card>
  </v-container>
</template>
<script>
import MemberTables from './MemberTables.vue'
  export default {
    data() {
        return {
            headers: [
                {
                    text: "昵称",
                    align: "start",
                    sortable: false,
                    value: "nickname",
                },
                { text: "姓名", value: "name", sortable: false, },
                { text: "邮箱", value: "email", sortable: false, },
                { text: "身份", value: "identity", sortable: false, },
            ],
            desserts: [
                {
                    nickname: "Frozen Yogurt",
                    name: "a",
                    email: 6,
                    identity: 24,
                },
                {
                    nickname: "Ice cream sandwich",
                    name: "b",
                    email: 9,
                    identity: 37,
                },
                {
                    nickname: "Eclair",
                    name: 262,
                    email: 16,
                    identity: 23,
                },
                {
                    nickname: "Frozen Yogurt",
                    name: 159,
                    email: 6,
                    identity: 24,
                },
                {
                    nickname: "Ice cream sandwich",
                    name: 237,
                    email: 9,
                    identity: 37,
                },
                {
                    nickname: "Eclair",
                    name: 262,
                    email: 16,
                    identity: 23,
                },
            ],
        };
    },
    components: { MemberTables }
}
</script>
<style>
</style>

