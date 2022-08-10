<template>
    <div>
        <div>
            <projectlevelbanner></projectlevelbanner>
        </div>

        <div style="width:1100px;height: 600px;margin: auto;margin-top: 150px;">
            <v-toolbar flat>
                <v-icon color="pink" x-large>mdi-heart</v-icon>
                <v-toolbar-title style="font-size: 30px;font-weight: 500;">成员管理</v-toolbar-title>
                <v-spacer></v-spacer>

            </v-toolbar>


            <MemberTables v-show="this.memTable == 1"></MemberTables>

        </div>

    </div>
</template>
<script>
import qs from 'qs'
import MemberTables from './MemberTables.vue'
import projectlevelbanner from "../../views/Projectlevelbanner";
import Projectlevelbanner from '../../views/Projectlevelbanner.vue';
export default {
    data() {
        return {
            memTable: 1,
            user_list: [],
        };
    },
    components: { MemberTables, projectlevelbanner, Projectlevelbanner },
    computed: {
        getTeamid() {
            return this.$store.state.teamid
        }
    },
    created() {
        var name = "abcxyz"
        // this.create_team(name)
        // this.get_team_info(1)
        // var teamid = this.getTeamid
        // console.log("团队id",this.getTeamid)
        // this.get_team_info(teamid)
    },
    methods: {
        changeMemTable(num) {
            this.memTable = num
        },
        get_team_info(teamid) {
            console.log("获取团队信息", teamid)
            this.$axios({
                method: 'post',
                url: '/api/team/get_team_info ',
                data: qs.stringify({
                    "teamID": teamid
                })
            }).then(res => {
                console.log("获取团队信息", res.data)
                this.user_list = res.data.user_list
                // if(this.user_list)
            })
        },
        create_team(team_name) {
            console.log("团队名称", team_name)
            this.$axios({
                method: 'post',
                url: '/api/team/create_team ',
                data: qs.stringify({
                    "team_name": team_name,
                })
            }).then(res => {
                if (res.data.errno == 0) {
                    this.$message.success(res.data.msg)
                } else {
                    this.$message.error(res.data.msg)
                }
                console.log(res.data)
            })
        }
    }
}
</script>
<style>
</style>

