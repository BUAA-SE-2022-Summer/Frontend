<template>
    <div id="app">
        <v-app id="inspire">
            <v-row>
                <v-navigation-drawer dark permanent color="grey lighten-3" mini-variant mini-variant-width="87px">
                    <v-col>
                        <router-link to="/dashboard/manage">
                            <v-icon large @click="test">
                                mdi-chevron-right
                            </v-icon>
                        </router-link>
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
                    </v-col>
                </v-navigation-drawer>
                <v-main>
                    <MemberManage />
                </v-main>
            </v-row>
        </v-app>
    </div>
</template>

<style>
</style>

<script>
import MemberManage from '@/components/team/MemberManage.vue'
export default {
    data: () => ({}),
    methods: {
        test() {
            alert("You clicked next!");
        }
    },
    components: { MemberManage }
}
</script>
