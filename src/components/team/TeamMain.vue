<template>
    <div style="width:1000px;background:white;height: 600px;margin-top: 30px;">
        <div style="">
        <!-- <v-bottom-navigation
      :value="value"
      color="teal"
      grow
      style="background:transparent;"
                         
    > -->
    <v-btn @click="changeBoard(2)" style="background:transparent;margin-left:50px">
    <span>操作日志</span>
    <v-icon>mdi-book-open-outline</v-icon>
    </v-btn>
      <v-btn @click="changeBoard(1)"  style="background:transparent;margin-left:50px">
        <span>成员管理</span>
        <v-icon>  mdi-account-cog</v-icon>
      </v-btn>
    <!-- </v-bottom-navigation> -->
        </div>
        <div style="margin-left:50px;width:100%;margin-top: 30px;">
            <MemberManageVue v-show="this.boardId==1"></MemberManageVue>
            <TeamMangeVue v-show="this.boardId==2">123</TeamMangeVue>
        </div>
     </div>
</template>
<script>
import MemberManageVue from './MemberManage.vue'
import TeamMangeVue from './TeamMange.vue';
export default{
    components:{
        MemberManageVue,
        TeamMangeVue
    },
    data(){
        return{
            boardId:1,
        };
    },
    methods:{
        changeBoard(num){
            this.boardId=num
        }
    }

}
</script>