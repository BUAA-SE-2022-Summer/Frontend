<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="700">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Click Me
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    上帝说要有光
                </v-card-title>
                <v-card class="mx-auto" max-width="700">

                    <v-container fluid>
                        <v-row dense>
                            <v-col :cols="6">
                                <v-card>
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                        <v-card-title>新建团队</v-card-title>
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="ma-2" color="primary" dark>
                                            Create Team
                                            <v-icon dark right>
                                                mdi-checkbox-marked-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col :cols="6">
                                <v-card>
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                        <v-card-title>新建项目</v-card-title>
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="ma-2" color="primary" dark>
                                            Create Project
                                            <v-icon dark right>
                                                mdi-checkbox-marked-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col :cols="4">
                                <v-card>
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                        <v-card-title>新建原型图</v-card-title>
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="ma-2" color="primary" dark>
                                            Prototype
                                            <v-icon dark right>
                                                mdi-checkbox-marked-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col :cols="4">
                                <v-card>
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                        <v-card-title>新建UML类图</v-card-title>
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="ma-2" color="primary" dark>
                                            UML
                                            <v-icon dark right>
                                                mdi-checkbox-marked-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col :cols="4">
                                <v-card>
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                                        <v-card-title>新建文档</v-card-title>
                                    </v-img>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="ma-2" color="primary" dark>
                                            Docs
                                            <v-icon dark right>
                                                mdi-checkbox-marked-circle
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: '',
    }),
}
</script>   