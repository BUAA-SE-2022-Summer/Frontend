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
                            <tr v-for="item in this.$store.state.pageList " :key="item.pageID"
                                @click="changePageInPrototype(item.pageID)">
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
    methods: {
        changePageInPrototype(pageID) {
            this.save();
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
                    this.$store.commit('setComponentData', JSON.parse(response.data.first_component));
                    this.$store.commit('setCanvasStyle', JSON.parse(response.data.first_canvasStyle));
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(err => {
                console.error(err);
            })
        },
        save() {
            let teamID = JSON.parse(sessionStorage.getItem('TeamID'));
            let prototypeID = JSON.parse(sessionStorage.getItem('prototypeID'));
            let pageID = JSON.parse(sessionStorage.getItem('pageID'));
            let pageComponentData = this.componentData;
            let pageCanvasStyleData = this.canvasStyleData;
            console.log("打印保存页面请求的参数");
            console.log("teamID: " + teamID);
            console.log("prototypeID: " + prototypeID);
            console.log("pageID: " + pageID);
            console.log("pageComponentData: ");
            console.log(pageComponentData);
            console.log("pageCanvasStyleData: ");
            console.log(pageCanvasStyleData);
            console.log("JSON格式的pageComponentData: ");
            console.log(JSON.stringify(pageComponentData));
            console.log("JSON格式的pageCanvasStyleData: ");
            console.log(JSON.stringify(pageCanvasStyleData));
            this.$axios.post(
                '/api/prototype/update_page',
                this.$qs.stringify({
                    teamID: teamID,
                    prototypeID: prototypeID,
                    pageID: pageID,
                    pageComponentData: JSON.stringify(pageComponentData),
                    pageCanvasStyle: JSON.stringify(pageCanvasStyleData)
                })
            ).then(response => {
                console.log("debug: 打印更改页面后的后端返回数据");
                console.log(response.data);
                if (response.data.errno === 0) {
                    this.$message.success(response.data.msg)
                } else {
                    this.$message.error(response.data.msg)
                }
            }).catch(err => {
                console.error(err);
            })
            //localStorage.setItem('canvasData', JSON.stringify(this.componentData))
            //localStorage.setItem('canvasStyle', JSON.stringify(this.canvasStyleData))
            // console.log("在保存时打印当前的组件数据");
            // console.log(JSON.stringify(this.componentData));
            // console.log(this.$qs.stringify({
            //     componentData: this.componentData
            // }));
            // console.log("在保存时打印当前的画布样式数据");
            // console.log(this.canvasStyleData);
            // console.log(this.$qs.stringify({
            //     canvasStyle: this.canvasStyleData
            // }));
            this.$message.success('保存成功')
        },
    }
}
</script>