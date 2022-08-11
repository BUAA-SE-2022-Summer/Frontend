<template>
    <!--    全屏容器    -->
    <div ref="pageDiv" @mousemove="demo_move" @mouseup="demo_up" :class="{ 'zlevelTop': mouseDownState }"
        style="position: absolute;top: 0;height: 100%;width: 100%">
        <div>
            <div>
                <div style="width: 100vw;height:6vh;background-color: whitesmoke;">
                    <router-link to="/">
                        <div style="width: 30vh;height:6vh;position: absolute;color:black;font-size :30px;left:2vw">
                            MoBook
                        </div>
                    </router-link>
                    <div style="position: absolute;left:90vh;height:6vh;background-color: whitesmoke">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select=""
                            style="background-color: whitesmoke;height: 7vh;top:-1vh" text-color="black"
                            active-text-color="red" router>
                            <el-menu-item index="/textbustest"><b>文档</b></el-menu-item>
                            <el-menu-item index="/prototype"><b>原型设计</b></el-menu-item>
                            <el-menu-item index="/project/uml"><b>uml绘制</b></el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="this.userhead" style="left:175vh;position: absolute"><img :src="this.userhead"
                            style="border-radius: 50%;width: 6vh;height: 6vh"></div>
                    <div v-else style="left:175vh;position: absolute; margin-top:3px">
                        <Avatar :username="this.username" :background-color="this.username" color="#fff"
                            :size="this.AvatarSize" style="vertical-align: middle;" :inline="true" />
                    </div>
                    <div style="left:185vh;position: absolute;top:1.5vh"><b>{{ this.username }}</b></div>
                    <!--<el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
                        <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
                        <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div style="left:62vh;position: absolute;top:1.5vh"><b>当前原型图</b></div>
                    </el-tooltip>-->
                    <div style="left:46vh;position: absolute;top:1.5vh"><b>{{ this.projectname }}</b></div>
                    <div v-if="this.now_file_name" style="left:59vh;position: absolute;top:1.5vh">-></div>
                    <div style="left:62vh;position: absolute;top:1.5vh"><b>{{ this.now_file_name }}</b></div>
                </div>
                <div v-if="this.ifnew === 0" style="margin-top:auto">
                    <el-tooltip class="item" effect="dark" content="新建原型图" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:20px;top:55px"><i
                                class="el-icon-document-add" style="" @click="changenew"></i></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分享原型图" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:120px;top:55px"><i
                                class="el-icon-document-checked" style="" @click="dialog = true"></i></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="选择模板" placement="bottom">
                        <div style="position: absolute;width:40px;height:40px;left:230px;top:55px"><i
                                class="el-icon-edit-outline" style="" @click="drawer = true"></i></div>
                    </el-tooltip>
                </div>
                <div v-if="this.ifnew === 1" style="width: 21vh;position: absolute;">
                    <el-input v-model="inputname" placeholder="请输入原型图名称"></el-input>
                    <el-button type="primary" style="position: absolute;width: 9vh;" @click="createnewpro">确认
                    </el-button>
                    <el-button type="error" style="position: absolute;width: 9vh;left:220px" @click="closecreate">取消
                    </el-button>
                </div>
                <div style="position: absolute;width: 300px;height:80vh;background-color: white;top:12vh">
                    <prolist />
                </div>
                <div style="display: flex;">
                    <PrototypeView ref="canvas" />
                </div>
                <el-drawer title="请选择一个模板" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
                    :size="size">
                    <!--<span>我来啦!</span>-->
                    <div @mouseover="over1" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management" style="width: 300px;background-color: red"
                            @click="open1">项目计划</el-button>
                    </div>
                    <div @mouseover="over2" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: orange" @click="open2">会议纪要</el-button>
                    </div>
                    <div @mouseover="over3" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: yellowgreen" @click="open3">项目管理</el-button>
                    </div>
                    <div @mouseover="over4" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: #b3d4fc" @click="open4">工作周报</el-button>
                    </div>
                    <div @mouseover="over5" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px;background-color: palevioletred" @click="open5">需求调研报告</el-button>
                    </div>
                    <div @mouseover="over6" @mouseleave="leave">
                        <el-button type="primary" icon="el-icon-s-management"
                            style="width: 300px; background-color: aqua" @click="open6">需求规格说明书</el-button>
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
            </div>
        </div>
        <!-- 点击蒙版  -->
        <div v-if="attrOpen" @click.stop="closeAtrrMenu"
            style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index:998 "></div>
        <!--  多功能菜单 -->
        <div :class="{ 'six-more-modal-btn': attrOpen, 'moreModal': !attrOpen, 'more-tran-animate': !mouseDownState }"
            ref="attrActionMgr" :style="position" @mousedown="attr_menu_down">
            <!--  触发器 -->
            <div v-if="!attrOpen" @click="demo_click" class="imgMore">
                组件设置
            </div>
            <!--  菜单  -->
            <div v-else>
                <!-- <CanvasAttr /> -->
                <el-tabs v-if="curComponent" v-model="activeName">
                    <el-tab-pane label="属性" name="attr">
                        <component :is="curComponent.component + 'Attr'" />
                    </el-tab-pane>
                    <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
                        <AnimationList />
                    </el-tab-pane>
                    <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
                        <EventList />
                    </el-tab-pane>
                </el-tabs>
                <div v-else>
                    还没选择组件噢
                </div>
            </div>
        </div>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    分享原型图
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    原型图在分享后将会生成一个链接，该链接可供任何人访问查看原型图的预览
                </v-card-text>
                <div v-if="is_sharing">
                    <v-card-text>
                        本原型图已处于分享状态，分享链接为<h4>{{ url }}</h4>
                    </v-card-text>
                    <div class="text-center">
                        <v-btn rounded color="primary" dark @click="closeshare">
                            取消分享
                        </v-btn>
                    </div>
                </div>
                <div v-else>
                    <v-card-text>
                        本原型图尚未处于分享状态，是否开启分享
                    </v-card-text>
                    <div class="text-center">
                        <v-btn rounded color="primary" dark @click="openShare">
                            打开分享
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import prolist from "../components/prototype/PrototypeList";
import qs from "qs";
import Prototype from "../components/prototype/PrototypeView.vue";
import PrototypeView from "../components/prototype/PrototypeView.vue";
import Avatar from 'vue-avatar';
//-------------------------------------------------
//-----------------------原型图相关组件------------
//-------------------------------------------------
import ComponentList from '@/components/ComponentList' // 左侧列表组件
import PageList from '@/components/PageList' // 左侧页面列表组件
import AnimationList from '@/components/AnimationList' // 右侧动画列表
import EventList from '@/components/EventList' // 右侧事件列表
import componentList from '@/custom-component/component-list' // 左侧列表数据
import Toolbar from '@/components/Toolbar'
import { deepCopy } from '@/utils/utils'
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import RealTimeComponentList from '@/components/RealTimeComponentList'
import CanvasAttr from '@/components/CanvasAttr'
export default {
    components: { Avatar, prolist, Prototype, PrototypeView, AnimationList, EventList, componentList, RealTimeComponentList, CanvasAttr },
    name: "prototype",
    props: {
        // 通过position来设置初始定位
        position: {
            type: Object,
            default: function () {
                return {
                    top: "32.25rem",
                    left: "0"
                }
            }
        }
    },
    computed: mapState([
        'componentData',
        'curComponent',
        'isClickComponent',
        'canvasStyleData',
        'editor',
    ]),
    data() {
        return {
            code: '',
            is_sharing: JSON.parse(sessionStorage.getItem('is_sharing')),
            dialog: false,
            now_file_name: JSON.parse(sessionStorage.getItem('now_file_name')),
            //----------------------
            //------悬浮按钮组------
            //----------------------
            dial_direction: 'left',
            dial_right: true,
            dial_bottom: true,
            dial_transition: 'scale-transition',
            //----------------------
            //-------选中的组件-----
            //----------------------
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            //----------------------
            //------浮动按钮--------
            //----------------------
            attrOpen: false,     //  attr菜单展开状态
            mouseDownState: false,   //  鼠标点击状态
            iX: 0, iY: 0,
            dX: 0, dY: 500,   //  初始定位
            lastMoveIndex: 0,    //  拖拽计数
            curMoveIndex: 0, //  历史计数
            //----------------------
            activeIndex: '/prototype',    // 当前激活的tab页
            AvatarSize: 40,// 用户头像大小
            size: '300',//抽屉的宽度
            drawer: false,
            direction: 'ltr',
            editor1: null,
            newContent: '',
            userhead: '',
            username: '',
            teamname: JSON.parse(sessionStorage.getItem('TeamName')),
            projectname: JSON.parse(sessionStorage.getItem('projectName')),
            projectid: JSON.parse(sessionStorage.getItem('ProjectID')),
            teamid: JSON.parse(sessionStorage.getItem('TeamID')),
            fatherid: JSON.parse(sessionStorage.getItem('project_root_fileID')),
            ifnew: 0,
            inputname: '',
            choice: 0,
            show: 0,
        }
    },
    created() {
        this.$axios.get('/api/user/get_user_info ').then(
            res => {
                this.userhead = res.data.data.img;
                this.username = res.data.data.username;
            }
        );
        this.$axios.post(
            '/api/prototype/share_prototype',
            this.$qs.stringify({
                projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
            })
        ).then(
            res => {
                this.code = res.data.code;
                this.url = "http://www.horik.cn/share?" + this.code
                console.log("分享的url");
            }
        )
    },
    methods: {
        closeshare() {
            this.$axios.post(
                '/api/prototype/close_sharing',
                this.$qs.stringify({
                    projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
                }))
                .then(res => {
                    if (res.data.errno == 0) {
                        this.is_sharing = false;
                        this.$message.success(res.data.msg)
                    }
                })
        },
        openShare() {
            this.$axios.post(
                '/api/prototype/close_sharing',
                this.$qs.stringify({
                    projectID: JSON.parse(sessionStorage.getItem('ProjectID'))
                }).then(res => {
                    if (res.data.errno == 0) {
                        this.$message.success(res.data.msg)
                    }
                }))
        },
        returnbefore() {
            this.$router.push('/projectdashboard');
        },
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
                    this.savepro();
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
        closecreate() {
            this.ifnew = 0;
        },
        changenew() {
            this.ifnew = 1;
        },
        createnewpro() {
            this.$axios({
                method: 'post',           /* 指明请求方式，可以是 get 或 post */
                url: '/api/prototype/create_prototype',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
                data: qs.stringify({
                    teamID: this.teamid,
                    projectID: this.projectid,
                    prototypeName: this.inputname,
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
        deletepro() {
            this.$axios({
                method: 'post',
                url: '/api/prototype/delete_prototype',
                data: qs.stringify({
                    prototypeID: JSON.parse(sessionStorage.getItem('prototypeID')),
                })
            }).then(res => {
                console.log(res.data)
                if (res.data.errno === 0) {
                    this.$message.success("删除成功");
                    window.location.reload();
                } else {
                    this.$message.error(res.data.msg);
                }
            }).catch(err => {
                console.log(err);         /* 若出现异常则在终端输出相关信息 */
            })
        },
        savepro() {
            this.$message.success("保存文件成功");
        },
        //---------------------------------------------------------
        //-------------------画布属性悬浮球效果--------------------
        //---------------------------------------------------------
        //  鼠标按下
        attr_menu_down(event) {
            //  如果打开了菜单，则不做响应
            if (this.attrOpen) {
                this.mouseDownState = false;
                return
            }
            console.log("attr_menu_down", event);
            /* 此处判断  pc 或 移动端 得到 event 事件 */
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            // 鼠标点击 面向页面 的 x坐标 y坐标
            let { clientX, clientY } = touch;
            // 鼠标x坐标 - 拖拽按钮x坐标  得到鼠标 距离 拖拽按钮 的间距
            this.iX = clientX - this.$refs.attrActionMgr.offsetLeft;
            // 鼠标y坐标 - 拖拽按钮y坐标  得到鼠标 距离 拖拽按钮 的间距
            this.iY = clientY - this.$refs.attrActionMgr.offsetTop;
            // 设置当前 状态为 鼠标按下
            this.mouseDownState = true;
        },
        //  鼠标拖拽
        demo_move(event) {
            //鼠标按下 切移动中
            if (this.mouseDownState) {
                console.log("demo_move", event);
                /* 此处判断  pc 或 移动端 得到 event 事件 */
                var touch;
                if (event.touches) {
                    touch = event.touches[0];
                } else {
                    touch = event;
                }
                // 鼠标移动时 面向页面 的 x坐标 y坐标
                let { clientX, clientY } = touch;
                //当前页面全局容器 dom 元素  获取容器 宽高
                let {
                    clientHeight: pageDivY,
                    clientWidth: pageDivX
                } = this.$refs.pageDiv;
                /* 鼠标坐标 - 鼠标与拖拽按钮的 间距坐标  得到 拖拽按钮的 左上角 x轴y轴坐标 */
                let [x, y] = [clientX - this.iX, clientY - this.iY];

                //拖拽按钮 dom 元素  获取 宽高 style 对象
                let {
                    clientHeight: attrActionMgrY,
                    clientWidth: attrActionMgrX,
                    style: attrActionMgrStyle
                } = this.$refs.attrActionMgr;
                /* 此处判断 拖拽按钮 如果超出 屏幕宽高 或者 小于
                   设置 屏幕最大 x=全局容器x y=全局容器y 否则 设置 为 x=0 y=0
                */
                if (x > pageDivX - attrActionMgrX) x = pageDivX - attrActionMgrX;
                else if (x < 0) x = 0;
                if (y > pageDivY - attrActionMgrY) y = pageDivY - attrActionMgrY;
                else if (y < 0) y = 0;
                this.dX = x; this.dY = y;
                // 计算后坐标  设置 按钮位置
                attrActionMgrStyle.left = `${x}px`;
                attrActionMgrStyle.top = `${y}px`;
                attrActionMgrStyle.bottom = "auto";
                attrActionMgrStyle.right = "auto";
                //  move Index
                this.lastMoveIndex++;
                //  当按下键滑动时， 阻止屏幕滑动事件
                event.preventDefault();
            }
        },
        //    鼠标抬起
        demo_up(event) {
            console.log("demo_up", event);
            //  当前页面全局容器 dom 元素  获取容器 宽高
            let {
                clientHeight: windowHeight,
                clientWidth: windowWidth
            } = document.documentElement;
            console.log('全局容器:', windowWidth, windowHeight);
            //  拖拽按钮 dom 元素  获取 宽高 style 对象
            let {
                clientHeight: attrActionMgrY,
                clientWidth: attrActionMgrX,
                style: attrActionMgrStyle
            } = this.$refs.attrActionMgr;

            console.log('拖拽按钮', attrActionMgrY, attrActionMgrX, attrActionMgrStyle);

            // 计算后坐标  设置 按钮位置
            if (this.dY > 0 && this.dY < (windowHeight - 50)) { //  不在顶部 且 不在底部
                if (this.dX <= (windowWidth / 2)) {  //  left 小于等于屏幕一半
                    attrActionMgrStyle.left = 0;
                    attrActionMgrStyle.right = 'auto';
                } else { //  left 大于屏幕一半
                    attrActionMgrStyle.left = 'auto';
                    attrActionMgrStyle.right = 0;
                }
                if (this.dY >= (windowHeight / 2)) {   //  宽度大于1/2时，是将top改为auto，调整bottom
                    attrActionMgrStyle.top = 'auto';
                    attrActionMgrStyle.bottom = (windowHeight - this.dY - 50) + 'px';
                }
            } else {
                if (this.dY === 0) {  //  在顶部
                    attrActionMgrStyle.top = 0;
                    attrActionMgrStyle.bottom = 'auto';
                } else if (this.dY === (windowHeight - 50)) {
                    attrActionMgrStyle.bottom = 0;
                    attrActionMgrStyle.top = 'auto';
                }
                if (this.dX >= (windowWidth / 2)) {  //  右侧是将left改为auto，调整right
                    attrActionMgrStyle.left = 'auto';
                    attrActionMgrStyle.right = (windowWidth - this.dX - 50) + 'px';
                }
            }
            this.mouseDownState = false;
        },
        //    单击事件
        demo_click() {
            console.log("demo_click|moveIndex:", this.lastMoveIndex, this.curMoveIndex);
            //  mouseup 后会激活click事件
            //  如果上一次down事件到下一次click事件中经历10次以下move，则视为纯点击事件
            if (this.lastMoveIndex - this.curMoveIndex <= 10) {
                //  点击事件
                this.attrOpen = !this.attrOpen;
                if (this.attrOpen) {
                    //  打开菜单
                }
            }
            this.curMoveIndex = this.lastMoveIndex
        },
        //    点击空白关闭菜单
        closeAtrrMenu() {
            this.attrOpen = false;
        },
        //--------------------------------------------------------------------------------------
        //--------------------原型图绘制相关-----------------------------------------------------
        //--------------------------------------------------------------------------------------
        handleDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            const index = e.dataTransfer.getData('index')
            const rectInfo = this.editor.getBoundingClientRect()
            if (index) {
                const component = deepCopy(componentList[index])
                component.style.top = e.clientY - rectInfo.y
                component.style.left = e.clientX - rectInfo.x
                component.id = generateID()
                this.$store.commit('addComponent', { component })
                this.$store.commit('recordSnapshot')
            }
        },

        handleDragOver(e) {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },

        handleMouseDown(e) {
            e.stopPropagation()
            this.$store.commit('setClickComponentStatus', false)
            this.$store.commit('setInEditorStatus', true)
        },

        deselectCurComponent(e) {
            if (!this.isClickComponent) {
                this.$store.commit('setCurComponent', { component: null, index: null })
            }

            // 0 左击 1 滚轮 2 右击
            if (e.button != 2) {
                this.$store.commit('hideContextMenu')
            }
        },
    }
}

</script>

<style scoped>
.zlevelTop {
    z-index: 9999;
}

.more-tran-animate {
    transition: 0.5s;
}

.moreModal {
    /* 如果碰到滑动问题，1.3 请检查 z-index。z-index需比web大一级*/
    z-index: 9999;
    position: fixed;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #337AB7;
    line-height: 40px;
    text-align: center;
    color: #fff;
    opacity: 0.6;
}

.moreModal:hover {
    opacity: 1;
}

.six-more-modal-btn {
    overflow: auto;
    padding: 10px;
    position: fixed;
    z-index: 1000;
    width: auto;
    height: auto;
    background: #fff;
    color: #EB5E5E;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.imgMore {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
</style>
