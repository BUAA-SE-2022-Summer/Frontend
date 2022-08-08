<template>
  <div>
    <div>
      <!--<img class="bgbox" id="bgbox" alt="" src="../../src/img/背景.jpg">-->
      <div style="width: 1540px;height:6vh;background-color: whitesmoke;">
        <router-link to="/">
          <div><img :src="this.logourl" style="width: 20vh;height:6vh;position: absolute;"></div>
        </router-link>
        <div style="left:175vh;position: absolute"><img :src="this.userhead"
                                                        style="border-radius: 50%;width: 6vh;height: 6vh"></div>
        <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
        <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
          <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队:</b></div>
        </el-tooltip>
        <div style="left:53vh;position: absolute;top:1.5vh"><b>{{ this.teamname }}</b></div>
        <div style="left:100vh;position: absolute;top:1.5vh;"><b>团队文档中心</b></div>
        <!--<el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
          <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
        </el-tooltip>-->
        <!--<el-tooltip class="item" effect="dark" :content="this.now_textname" placement="bottom">
          <div style="left:62vh;position: absolute;top:1.5vh"><b>当前文档</b></div>
        </el-tooltip>-->
      </div>
      <div>
        <!--<el-table :data="this.textdata" height="600" border stripe
                  style="position:absolute;width: 60vh;top:12vh" @cell-click="find">
          <el-table-column prop="file_name" label="文档列表" width:20vh>
          </el-table-column>
        </el-table>-->
      </div>

      <!-- <div style="position: absolute;width: 300px;height:5vh;background-color: wheat;top:720px">
        <div style="top:5px;position: absolute;left: 10px;cursor: pointer" @click="showtrash"><b>> 回收站</b></div>
      </div> -->


      <div v-if="this.ifnew === 0">
        <!--<el-tooltip class="item" effect="dark" content="新建团队文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:10px;top:55px"><i class="el-icon-document-add"
                                                                                       style="" @click="changenew"></i></div>
        </el-tooltip>-->
        <!--<el-tooltip class="item" effect="dark" content="删除当前文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:70px;top:55px"><i class="el-icon-delete-solid"
                                                                                       style="" @click="deletetxt"></i></div>
        </el-tooltip>-->
        <el-tooltip class="item" effect="dark" content="保存文档" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:10px;top:55px"><i class="el-icon-document-checked"
                                                                                        style="" @click="savetxt"></i></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="选择模板" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:130px;top:55px"><i class="el-icon-edit-outline" style="" @click="drawer = true"></i></div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="新建团队根文件夹" placement="bottom">
          <div style="position: absolute;width:40px;height:40px;left:250px;top:55px"><i class="el-icon-folder-add" style="" @click="createteamdir"></i></div>
        </el-tooltip>
      </div>
      <div v-if="this.ifnew === 1" style="width: 21vh;position: absolute;">
        <el-input v-model="inputname" placeholder="请输入文档名称"></el-input>
        <el-button type="primary" style="position: absolute;width: 9vh;" @click="createnewtxt">确认</el-button>
        <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消</el-button>
      </div>
      <div v-if="this.ifnew === 2" style="width: 21vh;position: absolute;">
        <el-input v-model="inputdirname" placeholder="请输入团队文件夹名称"></el-input>
        <el-button type="primary" style="position: absolute;width: 9vh;" @click="createteamdir1">确认</el-button>
        <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消</el-button>
      </div>
      <div v-if="this.ifnew === 3" style="width: 21vh;position: absolute;">
        <el-input v-model="inputdirname1" placeholder="请输入团队文件夹名称"></el-input>
        <el-button type="primary" style="position: absolute;width: 9vh;" @click="createsondir1">确认</el-button>
        <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消</el-button>
      </div>
      <div v-if="this.ifnew === 4" style="width: 21vh;position: absolute;">
        <el-input v-model="inputfilename" placeholder="请输入团队文件名称"></el-input>
        <el-button type="primary" style="position: absolute;width: 9vh;" @click="createsondoc1">确认</el-button>
        <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消</el-button>
      </div>
      <!--<div v-if="this.ifshow === 1" style="position: absolute;width: 300px;height:91vh;background-color: white">
      </div>-->
      <div v-if="this.ifshow === 1" style="position: absolute;width: 300px;height:5vh;background-color: wheat;top:50px">
        <div style="top:5px;position: absolute;left: 10px;cursor: pointer" @click="closetrash"><b>
          < 团队文档回收站</b>
        </div>
        <!--<doxlists1></doxlists1>-->
      </div>
      <div v-if="this.ifshow === 0"
           style="position: absolute;width: 300px;height:80vh;background-color: white;top:12vh;display: block;overflow-y: scroll;">
        <!--<doxlist></doxlist>-->
      </div>

      <div v-if="this.ifshow === 0"
           style="position: absolute;width: 300px;height:5vh;background-color: wheat;top:700px">

        <div style="top:5px;position: absolute;left: 10px;cursor: pointer" @click="showtrash"><b>> 团队文档回收站</b></div>
      </div>
      <div ref="editorContainer" style="width: 165vh;position: absolute;left:40vh;height:100vh;minHeight: 100vh"></div>
      <!--<div style="position: absolute;left:700px;top:80vh"><v-btn text color="primary" @click="outtxt">导出当前文档</v-btn></div>-->
      <!--<div style="position: absolute;left:900px;top:80vh"><v-btn text color="error" @click="deletetxt">删除当前文档</v-btn></div>
      <div style="position: absolute;left:1100px;top:80vh"><v-btn text color="primary" @click="createnewtxt">新建文档</v-btn></div>-->
      <el-drawer title="请选择一个模板" :visible.sync="drawer" :direction="direction" :before-close="handleClose" :size="size">
        <!--<span>我来啦!</span>-->
        <div @mouseover="over1" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: red"
                     @click="open1">项目计划</el-button>
        </div>
        <div @mouseover="over2" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: orange"
                     @click="open2">会议纪要</el-button>
        </div>
        <div @mouseover="over3" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: yellowgreen"
                     @click="open3">项目管理</el-button>
        </div>
        <div @mouseover="over4" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: #b3d4fc"
                     @click="open4">工作周报</el-button>
        </div>
        <div @mouseover="over5" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: palevioletred"
                     @click="open5">需求调研报告</el-button>
        </div>
        <div @mouseover="over6" @mouseleave="leave">
          <el-button type="primary" icon="el-icon-s-management" style="width: 300px; background-color: aqua"
                     @click="open6">需求规格说明书</el-button>
        </div>
      </el-drawer>
      <div><img v-if="this.show === 1" src="../img/项目计划.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div><img v-if="this.show === 2" src="../img/会议纪要.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div><img v-if="this.show === 3" src="../img/项目管理.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div><img v-if="this.show === 4" src="../img/工作周报.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div><img v-if="this.show === 5" src="../img/需求调研报告.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div><img v-if="this.show === 6" src="../img/需求规格说明书.jpg"
                style="width: 165vh;height:500px;position: absolute;left:300px;top:12vh"></div>
      <div  style="height:80vh;width:300px;display: block;overflow-y: scroll;position: absolute;top:12vh;background-color: whitesmoke">
        <v-treeview
            v-if="this.ifshow===0"
            v-model="tree"
            :open="open"
            :items="items"
            color="blue"
            activatable
            item-key="name"
            open-on-click
            :active.sync="active"
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="item.is_dir===true" @click="opendir1(item)">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else >
              mdi-file-document-outline
            </v-icon>
            <v-icon v-if="item.is_dir===false" @click="edit(item)">
              mdi-pencil
            </v-icon>
            <v-icon v-if="item.is_dir===false" @click="delete1(item)">
              mdi-delete
            </v-icon>
            <v-icon v-if="item.is_dir===true && item.is_pro===false" @click="createsondir(item)">
              mdi-folder-plus-outline
            </v-icon>
            <v-icon v-if="item.is_dir===true && item.is_pro===false" @click="createsondoc(item)">
              mdi-file-plus-outline
            </v-icon>
            <div v-if="item.is_pro===true" style="display: inline-block"><b>(项目文档)</b></div>
          </template>
        </v-treeview>
        <!--<div style="position: absolute;left:500px;top:700px">
          <el-button>导出文件</el-button>
        </div>-->
      </div>
      <div style="position: absolute;left:500px;top:700px">
         <el-button @click="exportword">导出word</el-button>
         <el-button @click="exportpdf">导出pdf</el-button>
     </div>
    </div>
    <!--<div><el-button @click="load">cnm</el-button></div>-->
  </div>
</template>
<script>
import { createEditor } from '@textbus/editor';
import '@textbus/editor/bundles/textbus.min.css';
import doxlists1 from "../components/demo/trashlists";
import doxlist from "../components/demo/doxlists";
import qs from "qs";
import { exportWord } from 'mhtml-to-word'
import { saveAs } from 'file-saver'

export default {
  components: { doxlists1, doxlist },
  name: "textbustest",

  data() {
    return {
      open: ['public'],
      active:[],
      selection:[],
      tree: [],
      items: [
      ],
      inputdirname:'',
      inputdirname1:'',
      inputfilename:'',
      size: '300px',//抽屉的宽度
      drawer: false,
      direction: 'ltr',
      editor1: null,
      newContent: '',
      logourl: 'https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png',
      userhead: '',
      username: '',
      teamname: JSON.parse(sessionStorage.getItem('TeamName')),
      projectname: JSON.parse(sessionStorage.getItem('projectName')),
      projectid: JSON.parse(sessionStorage.getItem('ProjectID')),

      teamid: JSON.parse(sessionStorage.getItem('TeamID')),
      fatherid: JSON.parse(sessionStorage.getItem('project_root_fileID')),
      textdata: [
      ],
      trashlist: [
      ],
      now_id: 0,
      now_textname: '',
      ifnew: 0,
      inputname: '',
      ifshow: 0,
      choice: 0,
      projectplan: '<h1 style="text-align:center"><strong>&nbsp;项目计划</strong></h1><h2>&nbsp;&nbsp;&nbsp;&nbsp;一、摘要</h2><h2>&nbsp;&nbsp;&nbsp;&nbsp;二、综述</h2><h2>&nbsp;&nbsp;&nbsp;&nbsp;三、甲方需求</h2><h2>&nbsp;&nbsp;&nbsp;&nbsp;四、技术与产品</h2><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）：目前持有技术</h3><h3 style="background-color:rgb(255, 255, 255)"><strong style="color:rgb(73, 80, 96);font-family:Roboto, sans-serif;font-size:1.75rem;line-height:1.2">&nbsp;</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）：技术需求描述</h3><h3 style="background-color:rgb(255, 255, 255)">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）：需要改进的技术</h3><h2 style="background-color:rgb(255, 255, 255)">&nbsp;&nbsp;&nbsp;&nbsp;五、市场分析</h2><h2 style="background-color:rgb(255, 255, 255)">&nbsp;&nbsp;&nbsp;&nbsp;六、初步项目进度计划及人员安排</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><h3 style="background-color:rgb(255, 255, 255)"><strong style="color:rgb(73, 80, 96);font-family:Roboto, sans-serif;font-size:1.75rem;line-height:1.2">&nbsp;</strong></h3><p><br></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p><br></p>',
      meetingpoint: '<h1 style="text-align:center"><strong>&nbsp;XX科技公司</strong></h1><h3 style="text-align:center"><strong>XXX次会议纪要</strong></h3><p style="text-align:left"><strong>——————————————————————————————————————————————————————————————————————————————————————————————————————</strong></p><p style="text-align:left"><strong>会议时间：20xx年x月x日</strong></p><p><strong>会议地点：第x会议室</strong></p><p><strong>会议主持：xxx</strong></p><p><strong>记录人员：xxx</strong></p><p><strong>出席人员：xxx xxx xxx xxx</strong></p><p><strong>缺席人员: &nbsp;&nbsp;xxx xxx</strong></p><p><strong>会议内容：</strong></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>一、讨论内容</strong></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>二、决议事项</strong></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.</p>',
      projecthold: '<h1><strong>xx项目管理</strong></h1><p><strong><br></strong></p><table class="tb-table tb-table-textbus"><tbody><tr><td colSpan="1" rowSpan="1">Task Comtains<br>工作计划<br></td><td colSpan="1" rowSpan="1">Owner<br>责任人<br></td><td colSpan="1" rowSpan="1">Bar<br>进度<br></td><td colSpan="1" rowSpan="1">Start State<br>计划开始日期<br></td><td colSpan="1" rowSpan="1">Work Days<br>工作日<br></td><td colSpan="1" rowSpan="1">End State<br>计划完成日期<br></td><td colSpan="1" rowSpan="1">Actural Start<br>实际开始日期<br></td><td colSpan="1" rowSpan="1">Actural End<br>实际结束日期<br></td><td colSpan="1" rowSpan="1">Status<br>是否按计划进行<br></td></tr><tr><td colSpan="1" rowSpan="1">完成原型图部分后段对接</td><td colSpan="1" rowSpan="1">黄瑞</td><td colSpan="1" rowSpan="1">80%</td><td colSpan="1" rowSpan="1">2022/8/7</td><td colSpan="1" rowSpan="1">2</td><td colSpan="1" rowSpan="1">2022/8/9</td><td colSpan="1" rowSpan="1">2022/8/5</td><td colSpan="1" rowSpan="1">2022/8/6</td><td colSpan="1" rowSpan="1">是</td></tr><tr><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td></tr><tr><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td></tr><tr><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td><td colSpan="1" rowSpan="1"><br></td></tr></tbody></table><h2>&nbsp;</h2><h2><strong>请于此处下方插入甘特图：</strong></h2><h3>（甘特图位置）</h3>',
      workweekly: '<h1><strong>xx工作周报</strong></h1><p><strong><br></strong></p><p><strong><br></strong></p><table class="tb-table"><tbody><tr><td colSpan="5" rowSpan="1" style="text-align:center"><strong style="font-family:SimHei, STHeiti;font-size:24px">xx工作周报<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x年x月x日<br></strong></td></tr><tr><td colSpan="5" rowSpan="1">项目名称</td></tr><tr><td colSpan="3" rowSpan="1">上周工作总结</td><td colSpan="2" rowSpan="1">下周工作注意事项</td></tr><tr><td colSpan="3" rowSpan="1">1.</td><td colSpan="2" rowSpan="1">1.</td></tr><tr><td colSpan="3" rowSpan="1">2.</td><td colSpan="2" rowSpan="1">2.</td></tr><tr><td colSpan="3" rowSpan="1">本周工作记录</td><td colSpan="2" rowSpan="1">本周工作存在问题及解决方法</td></tr><tr><td colSpan="1" rowSpan="1">具体时间</td><td colSpan="2" rowSpan="1">具体工作记录</td><td colSpan="1" rowSpan="1">具体问题</td><td colSpan="1" rowSpan="1">具体解决方法</td></tr><tr><td colSpan="1" rowSpan="1">x年x月x日</td><td colSpan="2" rowSpan="1">xxx</td><td colSpan="1" rowSpan="1">xxx</td><td colSpan="1" rowSpan="1">xxx</td></tr><tr><td colSpan="5" rowSpan="1">下周工作计划</td></tr><tr><td colSpan="2" rowSpan="1">时间</td><td colSpan="3" rowSpan="1">计划</td></tr><tr><td colSpan="2" rowSpan="1">xxx</td><td colSpan="3" rowSpan="1">xxx</td></tr><tr><td colSpan="2" rowSpan="1">xxx</td><td colSpan="3" rowSpan="1">xxx</td></tr><tr><td colSpan="2" rowSpan="1">xxx</td><td colSpan="3" rowSpan="1">xxx</td></tr><tr><td colSpan="2" rowSpan="1">xxx</td><td colSpan="3" rowSpan="1">xxx</td></tr></tbody></table><p><br></p><p style="text-align:center;font-family:宋体;font-size:10.5pt">&nbsp;</p><h2>&nbsp;</h2><p><br></p>',
      needlook: '<h1><strong>xx项目需求调研报告</strong></h1><p><strong><br></strong></p><table class="tb-table"><tbody><tr><td colSpan="2" rowSpan="1" style="text-align:center"><strong>软件开发项目需求调研报告模板</strong></td></tr><tr><td colSpan="2" rowSpan="1">项目名称：</td></tr><tr><td colSpan="2" rowSpan="1">调查方式：</td></tr><tr><td colSpan="1" rowSpan="1">调查人：</td><td colSpan="1" rowSpan="1">调查时间：</td></tr><tr><td colSpan="2" rowSpan="1">调查地点：</td></tr><tr><td colSpan="2" rowSpan="1">参与人员：</td></tr><tr><td colSpan="2" rowSpan="1">调研内容：</td></tr><tr><td colSpan="2" rowSpan="1">取得的原始材料：</td></tr><tr><td colSpan="2" rowSpan="1">收到的结果与反馈：</td></tr><tr><td colSpan="1" rowSpan="1">项目代表签字：</td><td colSpan="1" rowSpan="1">用户代表签字：</td></tr></tbody></table><h2>&nbsp;</h2><p><br></p>',
      needbook: '<h1><strong>xx软件需求规格说明书</strong></h1><p><strong><br></strong></p><p><strong><br></strong></p><table class="tb-table"><tbody><tr><td colSpan="5" rowSpan="1" style="text-align:center"><strong style="font-size:20px">xx软件需求规格说明书</strong></td></tr><tr><td colSpan="5" rowSpan="1">硬件整体需求：</td></tr><tr><td colSpan="5" rowSpan="1">工作环境需求：</td></tr><tr><td colSpan="1" rowSpan="1">需求编号：</td><td colSpan="1" rowSpan="1">功能名称</td><td colSpan="1" rowSpan="1">功能需求标识</td><td colSpan="1" rowSpan="1">优先级</td><td colSpan="1" rowSpan="1">具体描述</td></tr><tr><td colSpan="1" rowSpan="1">1</td><td colSpan="1" rowSpan="1">系统入口</td><td colSpan="1" rowSpan="1">L1</td><td colSpan="1" rowSpan="1">最高</td><td colSpan="1" rowSpan="1">用户在该软件中进行一切操作的入口</td></tr></tbody></table><h2>&nbsp;</h2><p><br></p>',
      show: 0,
      if_save:0,
      opendir:0,
      now_file_name:'',
    }
  },
  created() {
    sessionStorage.setItem('if_save',JSON.stringify(this.if_save));
    //alert('进入详情页');
    this.now_id = JSON.parse(sessionStorage.getItem('now_textid'));
    //alert("textbus当前文档id为"+this.now_id);
    this.now_textname = JSON.parse(sessionStorage.getItem('now_textname'));
    if(this.now_textname===null){
      this.now_textname='当前没有选择文档';
    }

    this.$axios.get('/api/user/get_user_info ').then(
        res => {
          this.userhead = res.data.data.img;
          this.username = res.data.data.username;
          console.log(this.userhead)
        }
    );
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/file/get_file_centre_list',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({
        teamID: this.teamid,
      })
    })
        .then(res => {/* res 是 response 的缩写 */
          if (res.data.errno === 0) {
            this.$message.success("获取团队文档列表成功");
            this.items=res.data.items;
            //this.$router.go(0);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    console.log("debug当前项目id" + JSON.parse(sessionStorage.getItem('ProjectID')));
    console.log("当前项目id" + this.projectid);
    console.log("当前文档id" + this.now_id);
  },
  methods: {
    exportword(){
      let html = this.editor1.getContents().content;
      let blob = new Blob([html],{type:"application/msword;charset=utf-8"});
      //let blob = new Blob([html],{type:"application/pdf;charset=utf-8"});
      saveAs(blob,this.now_file_name);
    },
    exportpdf(){
      sessionStorage.setItem('pdf',JSON.stringify(this.editor1.getContents().content));
      this.$router.push('/pdftest');
    },
    createsondir(item){
      this.ifnew=3;
      this.opendir=item.id;
    },
    createsondir1(){
      console.log("当前团队id为"+this.teamid);
      console.log("当前父文件夹的id为"+this.opendir);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/create_team_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID:this.teamid,
          file_name:this.inputdirname1,
          file_type:'dir',
          fatherID:this.opendir,
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success('创建团队子文件夹成功');
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    createsondoc(item){
      this.ifnew=4;
      this.opendir=item.id;
    },
    createsondoc1(item){
      console.log("当前团队id为"+this.teamid);
      console.log("当前父文件夹的id为"+this.opendir);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/create_team_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID:this.teamid,
          file_name:this.inputfilename,
          file_type:'doc',
          fatherID: this.opendir
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success('创建团队文件成功');
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    createteamdir(){
        this.ifnew=2;
    },
    createteamdir1(){
      console.log(this.teamid);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/create_team_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID:this.teamid,
          file_name:this.inputdirname,
          file_type:'dir',
          fatherID:0
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success('创建团队文件夹成功');
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    opendir1(item){
      //this.$message.success(item.id);
      this.opendir=item.id;//当前打开的文件夹id
    },
    edit(item){
      //this.$message.success(item.id);
      //sessionStorage.setItem('now_textid', JSON.stringify(item.id));
      this.now_id=item.id;
      this.now_file_name=item.name;
      console.log(this.now_id);
      if(!(this.now_id===null)) {
        this.$axios({
          method: 'post',           /* 指明请求方式，可以是 get 或 post */
          url: '/api/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
          data: qs.stringify({
            fileID: this.now_id,
          })
        })
            .then(res => {/* res 是 response 的缩写 */
              //获取用户登录的三个基本信息并存放于sessionStorage
              if (res.data.errno === 0) {
                this.$message.success('导入文件成功');
                this.newContent = res.data.content;
                this.editor1.replaceContent(this.newContent);
                //console.log(this.newContent);
                //this.inside = res.data.content;
                //sessionStorage.setItem('now_textid', JSON.stringify(res.data.fileID));
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);         /* 若出现异常则在终端输出相关信息 */
            });
      }
    },
    returnbefore(){
      this.$router.push('/projectdashboard');
    }
    ,
    leave() {
      this.show = 0;
    },
    over1() {
      this.show = 1;
    },
    over2() {
      this.show = 2;
    },
    over3() {
      this.show = 3;
    },
    over4() {
      this.show = 4;
    },
    over5() {
      this.show = 5;
    },
    over6() {
      this.show = 6;
    },
    open1() {
      this.choice = 1;
      this.show = 0;
      this.insertbody();
    },
    open2() {
      this.choice = 2;
      this.insertbody();
    },
    open3() {
      this.choice = 3;
      this.insertbody();
    },
    open4() {
      this.choice = 4;
      this.insertbody();
    },
    open5() {
      this.choice = 5;
      this.insertbody();
    },
    open6() {
      this.choice = 6;
      this.insertbody();
    },
    open7() {
      this.choice = 7;
      this.insertbody();
    },
    insertbody() {
      if (this.now_id === 0) {
        this.$message.error('当前未选择文档');
      }
      else {
        this.$confirm('此操作会覆盖当前选择的文件内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
          if (this.choice === 1) {
            this.newContent = this.projectplan;
          }
          if (this.choice === 2) {
            this.newContent = this.meetingpoint;
          }
          if (this.choice === 3) {
            this.newContent = this.projecthold;
          }
          if (this.choice === 4) {
            this.newContent = this.workweekly;
          }
          if (this.choice === 5) {
            this.newContent = this.needlook;
          }
          if (this.choice === 6) {
            this.newContent = this.needbook;
          }
          this.editor1.replaceContent(this.newContent);
          this.savetxt();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导入'
          });
        });
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done(
            );
          })
          .catch(_ => { });
    },
    load() {
      this.editor1.replaceContent(this.newContent);
    },
    outtxt() {

    },
    closecreate() {
      this.ifnew = 0;
    },
    closetrash() {
      this.ifshow = 0;
    },
    showtrash() {
      this.ifshow = 1;
    },
    changenew() {
      this.ifnew = 1;
    },
    createnewtxt() {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/create_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          teamID: this.teamid,
          projectID: this.projectid,
          file_name: this.inputname,
          file_type: 'doc',
          fatherID: this.fatherid
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            if (res.data.errno === 0) {
              this.$message.success("文档创建成功");
              window.location.reload();
              //this.$router.go(0);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
      this.ifnew = 0;
    },
    deletetxt() {
      this.$axios({
        method: 'post',
        url: '/api/file/delete_file',
        data: qs.stringify({
          fileID: this.now_id,
        })
      })
          .then(res => {
            console.log(res.data)
            if (res.data.errno === 0) {
              this.$message.success("删除成功");
              window.location.reload();
            } else {
              alert(res.data.msg);
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    find(row, column, cell, event) {
      //alert(row.fileID);
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID: row.fileID,
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success("打开成功");
              sessionStorage.setItem('now_textid', JSON.stringify(res.data.fileID));
              sessionStorage.setItem('now_textname', JSON.stringify(res.data.file_name));
              window.location.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    savetxt() {
      this.if_save=1;
      sessionStorage.setItem('if_save',JSON.stringify(this.if_save));
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/edit_file ',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID: this.now_id,
          content: this.editor1.getContents().content
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success("保存文件成功");
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    }
  },
  mounted() {
    if(!(this.now_id===null)) {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/file/read_file',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({
          fileID: this.now_id,
        })
      })
          .then(res => {/* res 是 response 的缩写 */
            //获取用户登录的三个基本信息并存放于sessionStorage
            if (res.data.errno === 0) {
              this.$message.success('导入文件成功');
              this.newContent = res.data.content;
              _this.editor1.replaceContent(this.newContent);
              //this.inside = res.data.content;
              sessionStorage.setItem('now_textid', JSON.stringify(res.data.fileID));
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    }
    const _this = this;
    _this.editor1 = createEditor();
    //const editor = createEditor();
    _this.editor1.mount(this.$refs.editorContainer);
    const newContent = '<p>这里新内容！</p>';
    // _this.editor1.replaceContent(newContent);
    _this.editor1.onChange.subscribe(() => {
      console.log(_this.editor1.getContents().content);
    });
    _this.editor1.onReady.subscribe(() => {
      //alert(this.newContent);
      //_this.editor1.replaceContent(this.newContent);
    });
  }
}
</script>

<style scoped>
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

.textbus-container {
  line-height: 1.428;
  border-radius: 5px;
  height: 583px;
  color: #495060;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
