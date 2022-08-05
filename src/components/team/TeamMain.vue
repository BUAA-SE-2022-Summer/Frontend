<template>
    <div style="width:1000px;background:white;height: 600px;margin-top: 30px;">
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
    },
    created(){
        
    }

}
</script>