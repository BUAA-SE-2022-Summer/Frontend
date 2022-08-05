<template>
    <v-expansion-panels focusable inset>
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
            let projectID = sessionStorage.getItem('ProjectID');
            this.$axios.post(
                'prototype/change_page',
                this.$qs.stringify({
                    teamID: teamID,
                    prototypeID: projectID,
                    pageID: pageID
                })
            ).then(response => {
                if (response.errno === 0) {
                    this.$message.success(response.msg);
                    this.$store.commit('setComponentData', response.data.data.componentData);
                    this.$store.commit('setCanvasStyle', response.data.data.componentStyle)
                } else {
                    this.$message.error(response.msg);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>