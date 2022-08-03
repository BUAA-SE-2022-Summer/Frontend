<template>
    <div style="width:1100px;margin: 0;height: 600px;">
    <v-card
    class="mx-auto"
    width="300px"
    style="float:left;height: 450px;"
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
                <v-list-item-title @click="changeMemTable(1)">全部成员</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-icon>
            <v-icon >mdi-account-tie</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title @click="changeMemTable(2)">管理员</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-card>
    <v-card
    class="mx-auto"
    width="600px"
    style="float:left; height: 450px;"
    >
    <MemberTables v-show="this.memTable==1"></MemberTables>
  </v-card>
  
   </div>
</template>
<script>
import qs from 'qs'
import MemberTables from './MemberTables.vue'
  export default {
    data() {
        return {
            memTable:1,
            user_list:[],
        };
    },
    components: { MemberTables },
    computed:{
        getTeamid(){
            return this.$store.state.teamid
        }
    },
    created(){
        var name="abcxyz"
        // this.create_team(name)
        // this.get_team_info(1)
        // var teamid = this.getTeamid
        // console.log("团队id",this.getTeamid)
        // this.get_team_info(teamid)
    },
    methods:{
        changeMemTable(num){
            this.memTable=num
        },
        get_team_info(teamid){
            console.log("获取团队信息", teamid)
            this.$axios({
                method:'post',
                url:'/team/get_team_info ',
                data:qs.stringify({
                    "teamID":teamid
                })
            }).then(res=>{
                console.log("获取团队信息",res.data)
                this.user_list = res.data.user_list
                // if(this.user_list)
            })
        },
        create_team(team_name){
            console.log("团队名称", team_name)
            this.$axios({
                method:'post',
                url:'team/create_team ',
                data:qs.stringify({
                    "team_name":team_name,
                })
            }).then(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>
<<<<<<< HEAD
=======
<style>
</style>
>>>>>>> FeatureHome

