<template>
  <div>
    <el-button type="primary" @click="changecardvis">选择原型样式</el-button>
    <div v-if="this.cardvis===1">
      <el-card class="box-card" style="position: absolute;width:1000px;height:530px;left:20px;background-color: whitesmoke">
        <div slot="header" class="clearfix">
          <span>原型创建规格</span>
        </div>
        <div style="position: absolute;">
          <b>Name</b>
        </div>
        <div>
          <el-input v-model="appname" placeholder="请输入项目名称" style="position: absolute;width: 400px;top:110px;left:20px;"></el-input>
        </div>
        <div style="position: absolute;top:170px;">
          <b>Screensize</b>
        </div>
        <div @click="click11">
        <div v-if="this.click1===1" style="position:absolute;width:300px;height: 100px;background: white;top:200px;cursor: pointer">
          <div style="position: absolute;left:100px;top: 30px">
          <div>
            iphonex/11/12
          </div>
          <div>
            375*812
          </div>
            <div style="position: absolute;left:-50px;top:0px;">
              <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
            </div>
            <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
        </div>
        </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:200px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
             <div>
               iphonex/11/12
             </div>
            <div>
              375*812
            </div>
              <div style="position: absolute;left:-50px;top:0px;">
                <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
              </div>
            </div>
          </div>
        </div>
        <div @click="click12">
          <div v-if="this.click1===2" style="position:absolute;width:300px;height: 100px;background: white;top:200px;left:320px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iphone11/12Max
              </div>
              <div>
                414*896
              </div>
              <div style="position: absolute;left:-50px;top:0px;">
                <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
              </div>
              <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
            </div>
          </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:200px;left:320px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iphone11/12Max
              </div>
              <div>
                414*896
              </div>
              <div style="position: absolute;left:-50px;top:0px;">
                <img src="../img/手机 - 副本.jpg" style="width: 20px;height: 40px;border-radius: 10%">
              </div>
            </div>
          </div>
        </div>
        <div @click="click13">
          <div v-if="this.click1===3" style="position:absolute;width:300px;height: 100px;background: white;top:200px;left:620px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iPad(Vertical)
              </div>
              <div>
                768*1024
              </div>
              <div style="position: absolute;left:-50px;top:0px;">
                <img src="../img/ipad.png" style="width: 20px;height: 40px;border-radius: 10%">
              </div>
              <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
            </div>
          </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:200px;left:620px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iPad(Vertical)
              </div>
              <div>
                768*1024
              </div>
              <div style="position: absolute;left:-50px;top:0px;">
                <img src="../img/ipad.png" style="width: 20px;height: 40px;border-radius: 10%">
              </div>
            </div>
          </div>
        </div>
        <div @click="click14">
          <div v-if="this.click1===4" style="position:absolute;width:300px;height: 100px;background: white;top:300px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iPad(Horizontal)
              </div>
              <div>
                1024*768
              </div>
              <div style="position: absolute;left:-60px;top:10px;">
                <img src="../img/ipad1.png" style="width: 40px;height: 20px;border-radius: 10%">
              </div>
              <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
            </div>
          </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:300px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                iPad(Horizontal)
              </div>
              <div>
                1024*768
              </div>
              <div style="position: absolute;left:-60px;top:10px;">
                <img src="../img/ipad1.png" style="width: 40px;height: 20px;border-radius: 10%">
              </div>
            </div>
          </div>
        </div>
        <div @click="click15">
          <div v-if="this.click1===5" style="position:absolute;width:300px;height: 100px;background: white;top:300px;left:320px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktop
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1280*720
              </div>
              <div style="position: absolute;left:-60px;top:10px;">
                <img src="../img/网页.png" style="width: 40px;height: 30px;border-radius: 10%">
              </div>
              <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
            </div>
          </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:300px;left:320px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desktop
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1280*720
              </div>
              <div style="position: absolute;left:-60px;top:10px;">
                <img src="../img/网页.png" style="width: 40px;height: 30px;border-radius: 10%">
              </div>
            </div>
          </div>
        </div>
        <div @click="click16">
          <div v-if="this.click1===6" style="position:absolute;width:300px;height: 100px;background: white;top:300px;left:620px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
              </div>
                <div>
                  <el-input v-model="cwidth" placeholder="请输入宽度" style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input>
                </div>
              <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                *
              </div>
              <div>
                <el-input v-model="cheight" placeholder="请输入高度" style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
              </div>
              <i class="el-icon-success" style="position: absolute;left:150px;top:40px"></i>
            </div>
          </div>
          <div v-else style="position:absolute;width:300px;height: 100px;background: whitesmoke;top:300px;left:620px;cursor: pointer">
            <div style="position: absolute;left:100px;top: 30px">
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Custom
              </div>
              <div>
                <div>
                  <el-input v-model="cwidth" placeholder="请输入宽度" style="position: absolute;width: 80px;height: 10px;left:-50px"></el-input>
                </div>
                <div style="position:absolute;left: 40px;top:33px;font-size: 20px">
                  *
                </div>
                <div>
                  <el-input v-model="cheight" placeholder="请输入高度" style="position: absolute;width: 80px;height: 10px;left:60px"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-btn color="blue" style="position: absolute;top:450px;left: 20px;background-color:whitesmoke;"><b>创建原型</b></v-btn>
        <!--<el-button type="primary" style="position: absolute;top:450px;left: 20px;">创建原型</el-button>-->
        <v-btn color="blue" style="position: absolute;top:450px;left: 130px;background-color:whitesmoke;" @click="changecardvis"><b>取消</b></v-btn>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "test_chooseprototype",
  data(){
    return{
      cardvis:0,
      click1:0,
      appname:'',
      cwidth:0,
      cheight:0,
    }
  },
  methods:{
    changecardvis(){
      if(this.cardvis===0) {
        this.cardvis = 1;
      }
      else{
        this.cardvis = 0;
      }
    },
    click11(){
      this.click1=1;
    },
    click12(){
      this.click1=2;
    },
    click13(){
      this.click1=3;
    },
    click14(){
      this.click1=4;
    },
    click15(){
      this.click1=5;
    },
    click16(){
      this.click1=6;
    }
  }
}
</script>

<style scoped>

</style>
