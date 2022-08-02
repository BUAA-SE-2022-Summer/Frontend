<template>
    <div id="app">
        <v-app id="inspire">
            <v-navigation-drawer dark permanent color="grey lighten-3" mini-variant mini-variant-width="87px">
                <v-col>
                    <router-link to="/dashboard/manage">
                        <v-icon large @click="test">
                            mdi-chevron-right
                        </v-icon>
                    </router-link>
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
                </v-col>
            </v-navigation-drawer>
            <v-main>
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
