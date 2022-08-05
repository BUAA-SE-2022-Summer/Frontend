<template>
  <div>
  <div class="home">
    <div class="home-header">
      <div class="home-header-left">
        
      </div>

    </div>
    

  </div>
  <div>
      <projectListsVue></projectListsVue>
    </div>
   </div>
</template>

<script>

import qs from "qs";
import projectListsVue from "./projectLists.vue";
export default {
  components:{projectListsVue},
  name: 'Home',
  data() {
    return {
      admins: [
        ['成员管理', 'mdi-account-cog'],
        ['操作日志', 'mdi-book-open-outline'],
      ],
      numproject:0,
      projectlist:[],
      teamid:0,

      dialog: false,
    headers: [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Actions', value: 'actions', sortable: false },],
      desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    }

  },
    computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  created() {
    this.teamid=sessionStorage.getItem('TeamID');

    // alert(this.teamid);

    //alert("项目当前团队"+this.teamid)
    //this.$axios({
       // method: 'post',
        //url: '/project/get_project_list',
       // data: qs.stringify({
         // teamID: this.teamid
        //})
      //}).then(res => {
       // console.log("获取项目信息", res.data);
        //this.$message.success("获取项目列表成功");
        //this.projectlist=res.data.project_list;
        // console.log(this.user_list)
      //})
     this.$axios({
       method: 'post',
       url: '/project/get_project_list',
       data: qs.stringify({
         teamID:this.teamid
       })
     })
         .then(res => {
           //console.log(res.data)
           if (res.data.errno === 0) {
              this.$message.success("获取项目列表成功");
              this.projectlist=res.data.project_list;
            } else {
             alert(res.data.msg);
              this.$message.error(res.data.msg);
            }
         })
         .catch(err => {
           console.log(err);         /* 若出现异常则在终端输出相关信息 */
         })
  },
  methods:{
    findproject(row,column,cell,event){
       console.log(row.projectID);
       console.log(row.project_root_fileID);
       sessionStorage.setItem('ProjectID',JSON.stringify(row.projectID));
       sessionStorage.setItem('project_root_fileID',JSON.stringify(row.project_root_fileID));
       //alert(row.project_root_fileID);
       this.$router.push('/dashboard/demo/console');
    },
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
       
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  
  }
}
</script>





<style scoped>
.home {
  width: 1060px;
  
  position: fixed;
  top: 20px;
  right: 0;
  border: 1px solid #ccc;
}
.home-header {
  width: 70%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-shadow: 0 0 0 #e0e0e0;
  position: fixed;
  top: 20px;
  right: 0;
}
.home-header-left {
  display: flex;
  align-items: center;
}
.home-header-left-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.home-header-right {
  display: flex;
  align-items: center;
}
.home-header-right-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 20px;
}
.but_1 {
  position: fixed;
  top: 100px;
  right: 320px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_2 {
  position: fixed;
  top: 100px;
  right: 160px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}
.but_3 {
  position: fixed;
  top: 92px;
  right: 2px;
  width: 150px;
  height: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 10px;
}
.li_1 {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.li_2 {
  height: 66px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.tit_1 {
  text-align: left;
}
.tit_1_1 {
  text-align: left;
  margin-left: 20px;
}
.home-content {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: column wrap;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  left: 42%;
  top:37%;
  transform: translateY(-80px);
}
.home-content .empty-header {
  font-size: 18px;
  line-height: 16px;
  color: rgb(31, 41, 46);
  margin-top: 8px;
  font-weight: 500;
}
.home-content .empty-desc.is-show {
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  color: rgb(79, 79, 79);
  font-weight: 400;
}
</style>
