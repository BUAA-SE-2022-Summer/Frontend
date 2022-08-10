<template>
    <v-expansion-panels focusable>
        <v-expansion-panel>
            <v-expansion-panel-header @click="updatePageList">
                页面列表
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
                            <tr v-for="item in namelist" :key="item.pageID" @click="changePageInPrototype(item.pageID)">
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
            namelist: [],
        }
    },
    created() {
        this.namelist = this.$store.state.pageList
    },
    methods: {
        changePageInPrototype(pageID) {
            let teamID = JSON.parse(sessionStorage.getItem('TeamID'));
            let prototypeID = JSON.parse(sessionStorage.getItem('prototypeID'));
            sessionStorage.setItem('pageID', JSON.stringify(pageID));
            this.$axios.post(
                '/api/prototype/change_page',
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
                    this.$store.commit('setComponentData', JSON.parse(response.data.componentData));
                    this.$store.commit('setCanvasStyle', JSON.parse(response.data.canvasStyle));
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(err => {
                console.error(err);
            })
        },
        updatePageList() {
            let teamID = JSON.parse(sessionStorage.getItem('TeamID'));
            let projectID = JSON.parse(sessionStorage.getItem('ProjectID'));
            let prototypeID = JSON.parse(sessionStorage.getItem('prototypeID'));
            let fatherID = JSON.parse(sessionStorage.getItem('project_root_fileID'));
            this.$axios.post(
                '/api/prototype/open_prototype',
                this.$qs.stringify({
                    teamID: teamID,
                    projectID: projectID,
                    fatherID: fatherID,
                    prototypeID: prototypeID,
                })
            ).then(response => {
                console.log("打开原型图的后端反馈 ", response.data);
                this.$store.commit('updatePageList', response.data.namelist);
                console.log("存储pageList到Vuex");
                console.log(this.$store.state.pageList);
            }).catch(err => {
                console.error(err);
            })
            this.namelist = this.$store.state.pageList
            console.log("打印更新页面列表后的页面列表", this.namelist);
        }
    }
}
</script>