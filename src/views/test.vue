<template>
  <div style="width: 100vw;height:6vh;background-color: white;">
                    <router-link to="/">
                        <div><img src='https://xuemolan.oss-cn-hangzhou.aliyuncs.com/UI_page/UI/1.png'
                                style="width: 30vh;height:6vh;position: absolute;left:2vw">
                        </div>
                    </router-link>
                    <div style="position: absolute;left:90vh;height:6vh;background-color: white">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select=""
                            style="background-color: white;height: 7vh;top:-1vh" text-color="black"
                            active-text-color="red" router>
                            <el-menu-item index="/textbustest"><b>文档</b></el-menu-item>
                            <el-menu-item index="2"><b>原型设计</b></el-menu-item>
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
                    <el-tooltip class="item" effect="dark" :content="this.teamname" placement="bottom">
                        <div style="left:42vh;position: absolute;top:1.5vh"><b>当前团队</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="this.projectname" placement="bottom">
                        <div style="left:52vh;position: absolute;top:1.5vh"><b>当前项目</b></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div style="left:62vh;position: absolute;top:1.5vh"><b>当前原型图</b></div>
                    </el-tooltip>
                </div>
</template>