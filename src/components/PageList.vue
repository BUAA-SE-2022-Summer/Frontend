<template>
    <v-expansion-panels focusable>
        <v-expansion-panel>
            <v-expansion-panel-header>
                Pages
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-simple-table fixed-header height="300px">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Page Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in nameList" :key="item.pageID" @click="changePageInPrototype(item.pageID)">
                                <td>{{ item.pageName }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props: {
        nameList: []
    },
    methods: {
        changePageInPrototype(pageID) {
            let teamID = sessionStorage.getItem('TeamID');
            let prototypeID = sessionStorage.getItem('prototypeID');
            sessionStorage.setItem('pageID', pageID);
            this.$axios.post(
                'prototype/change_page',
                this.$qs.stringify({
                    teamID: teamID,
                    prototypeID: prototypeID,
                    pageID: pageID
                })
            ).then(response => {
                console.log("打印change_page的response: ");
                console.log(response);
                if (response.data.errno === 0) {
                    this.$message.success(response.data.msg);
                    this.$store.commit('setComponentData', response.data.componentData);
                    this.$store.commit('setCanvasStyle', response.data.canvasStyle)
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>