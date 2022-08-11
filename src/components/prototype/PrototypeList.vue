<template>
    <div class="home">
        <div style="width:300px;">
            <v-data-table height="200px" :headers="headers" :items="desserts" sort-by="projectUser" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat color=" ">
                        <v-toolbar-title>全部页面</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog2" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">删除页面</span>
                                </v-card-title>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                                    <v-btn color="blue darken-1" text @click="OK">删除页面</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="toItem(item)" color="primary">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteItem(item)" color="#DF2A23">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <ComponentList />
            <RealTimeComponentList />
        </div>
    </div>
</template>

<script>
import qs from "qs";
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import RealTimeComponentList from '@/components/RealTimeComponentList'
export default {
    projectName: 'Home',
    components: { ComponentList, RealTimeComponentList },
    data() {
        return {
            teamname: '',
            numproject: 0,
            projectlist: [],
            teamid: 0,
            projectID: 0,
            dialog: false,
            dialog2: false,
            headers: [
                {
                    text: '页面名称',
                    align: 'start',
                    sortable: false,
                    value: 'file_name',
                },
                //{ text: '文档编号', value: 'fileID' },
                //{ text: '最后修改时间 ', value: 'last_modify_time' },
                //{ text: '文档类型 ', value: 'file_type'},
                { text: '操作', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                projectName: '',
                projectUser: 0,
                projectID: 0,
                projectTime: 0,
                is_star: 0,
            },
            defaultItem: {
                projectName: '',
                projectUser: 0,
                projectID: 0,
                projectTime: 0,
                is_star: 0,
            },
            projectname: JSON.parse(sessionStorage.getItem('ProjectName'))
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    created() {
        this.teamid = JSON.parse(sessionStorage.getItem('TeamID'));
        this.projectID = JSON.parse(sessionStorage.getItem('ProjectID'));
        this.teamname = JSON.parse(sessionStorage.getItem('TeamName'));
        this.$axios({
            method: 'post',
            url: '/api/file/project_root_pro_list',
            data: qs.stringify({
                projectID: this.projectID,
            })
        }).then(res => {
            console.log(res.data)
            if (res.data.errno === 0) {
                // this.$message.success("获取文件列表成功");
                this.desserts = res.data.filelist
                console.log(this.desserts)
            } else {
                alert(res.data.msg);
                this.$message.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },
    methods: {
        initialize() {
            this.$axios({
                method: 'post',
                url: '/api/file/project_root_pro_list',
                data: qs.stringify({
                    projectID: this.projectID,
                })
            }).then(res => {
                console.log(res.data)
                if (res.data.errno === 0) {
                    // this.$message.success("获取文件列表成功");
                    this.desserts = res.data.filelist
                    console.log(this.desserts)
                } else {
                    alert(res.data.msg);
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                console.log(err);         /* 若出现异常则在终端输出相关信息 */
            });
        },
        sharePro(item) {
            this.$axios.post(
                '/api/prototype/share_prototype',
                this.$qs.stringify({
                    prototypeID: item.fileID,
                })).then(res => {
                    if (res.data.errno === 0) {
                        console.log("share prototype success, the encode string is: " + res.data.code);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                });
        },
        deleteItem(item) {
            this.editedItem = Object.assign({}, item)
            this.dialog2 = true
            // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },
        OK() {
            // this.desserts.splice(index, 1)
            console.log("删除", this.editedItem)
            this.delete_pro(this.editedItem.fileID)
            this.close()
        },
        delete_pro(ID) {
            this.$axios({
                method: 'post',
                url: '/api/prototype/delete_prototype',
                data: qs.stringify({
                    teamID: JSON.parse(sessionStorage.getItem('TeamID')),
                    prototypeID: ID,
                })
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.errno === 0) {
                        this.$message.success("删除成功");
                        this.initialize()
                    } else {
                        alert(res.data.msg);
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })

        },
        close() {
            this.dialog = false
            this.dialog2 = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        rename_project(ID, Name) {
            console.log("修改项目名称", ID, Name)
            this.$axios({
                method: 'post',
                url: '/api/project/rename_project',
                data: qs.stringify({
                    projectID: ID,
                    teamID: this.teamid,
                    project_name: Name

                })
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.errno === 0) {
                        this.$message.success("成功");
                    } else {
                        alert(res.data.msg);
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
                this.rename_project(this.editedItem.projectID, this.editedItem.projectName)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        toItem(item) {
            this.editedItem = Object.assign({}, item)
            sessionStorage.setItem('now_file_name', JSON.stringify(this.editedItem.file_name));
            console.log('即将打开原型图,其id为: ' + this.editedItem.fileID);
            sessionStorage.setItem('prototypeID', JSON.stringify(this.editedItem.fileID));
            this.$axios.post(
                '/api/prototype/open_prototype',
                this.$qs.stringify({
                    teamID: JSON.parse(sessionStorage.getItem('TeamID')),
                    projectID: JSON.parse(sessionStorage.getItem('ProjectID')),
                    fatherID: JSON.parse(sessionStorage.getItem('project_root_fileID')),
                    prototypeID: JSON.parse(sessionStorage.getItem('prototypeID')),
                })
            ).then(response => {
                if (response.data.errno === 0) {
                    console.log("打开原型图成功,返回数据为");
                    console.log(response.data);
                    this.$message.success(response.data.msg);
                    this.$store.commit('updatePageList', response.data.namelist);
                    let firstItem = this.$store.state.pageList[0];
                    sessionStorage.setItem('pageID', JSON.stringify(firstItem.pageID));
                    console.log(response.data.first_component);
                    console.log(response.data.first_canvasStyle);
                    let first_component = response.data.first_component;
                    let first_canvasStyle = response.data.first_canvasStyle;
                    // 把first_component和first_canvasStyle中的所有单引号换为双引号
                    // for (let i = 0; i < first_component.length; i++) {
                    //     first_component[i] = first_component[i].replace(/'/g, '"');
                    // }
                    // for (let i = 0; i < first_canvasStyle.length; i++) {
                    //     first_canvasStyle[i] = first_canvasStyle[i].replace(/'/g, '"');
                    // }

                    // console.log(JSON.parse(first_component));
                    // console.log(JSON.parse(first_canvasStyle));
                    this.$store.commit('setComponentData', JSON.parse(first_component));
                    this.$store.commit('setCanvasStyle', JSON.parse(first_canvasStyle));
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

