<template>
    <div class="home">
        <el-container>
            <!--头-->
            <el-header>
                <!--<h3>首诺供应链</h3>-->
                <div class="menubox">

                    <el-menu
                            :default-active="indexTab"
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#403f4d"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="addindex('1'),$router.push('AlcoholAdministration')">酒品管理</el-menu-item>
                        <el-menu-item index="2" :disabled="permissions" @click="addindex('2'),$router.push('operator')">操作员管理</el-menu-item>
                    </el-menu>


                </div>


                <div>
                    <!--{{nickname}}-->
                    <el-dropdown  @command="out">
  <span class="el-dropdown-link" style="color: #ffffff">
    {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click="out">退出</el-dropdown-item>

                        </el-dropdown-menu>
                    </el-dropdown>


                </div>
            </el-header>

            <el-container>
                <!--侧栏-->
                <el-aside width="2%">
                </el-aside>

                <!--内容-->
                <el-main>
                    <div class="tabsPane">
                        <el-tabs v-model="editableTabsValue2" type="card" tab-position="top" closable
                                 @tab-remove="removeTab" @tab-click="selected">
                            <el-tab-pane
                                    v-for="item in editableTabs2"
                                    :key="item.name"
                                    :label="item.title"
                                    :name="item.name"
                                    :urlTag="item"
                            ></el-tab-pane>
                        </el-tabs>
                    </div>


                    <router-view></router-view>

                </el-main>
            </el-container>


        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                nickname: '',//用户昵称
                editableTabsValue2: '',//默认选中第几个标签
                editableTabs2: [],//所有标签信息
                tabIndex: 0,//索引，当新增的时候从哪里开始递增
                permissions:false,//权限
                indexTab:'1',//选项卡索引
            }
        },
        methods: {
            addindex(data){
                //记录每次点击的索引
                console.log(data)
                sessionStorage.setItem('index',data)
            },
            out(){
              //退出
                this.$router.push('/')
                this.$cookies.remove('username')
            },
            //新增选项卡
            addTab(targetName, url) {
                let num
                let select = this.editableTabs2.some((item, index) => {
                    num = index + 1
                    return item.title == targetName
                })
                //判断以打开的选项卡中是否有包含当前要打开的菜单
                if (select) {
                    this.editableTabsValue2 = num.toString()
                } else {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: targetName,
                        name: newTabName,
                        content: url
                    });
                    this.editableTabsValue2 = newTabName;
                }


                //将最新选项卡信息保存
                sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)

            },
            //选中选项卡
            selected(tab, event) {
                let url = tab.$attrs.urlTag.content
                this.$router.push(url)
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)


            },
            //删除选项卡
            removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
                if (this.editableTabs2.length == 0) {
                    this.editableTabsValue2 = '0'
                }
                //将最新选项卡信息保存
                sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)
            },
            //页面加载后恢复之前记录的选项卡
            PageLoad() {
                let menu = JSON.parse(sessionStorage.getItem('menu'))
                if (menu != null) {
                    menu.forEach(item => {
                        this.editableTabs2.push(item)
                    })
                    this.editableTabsValue2 = sessionStorage.getItem('index')
                    this.tabIndex = this.editableTabs2.length
                }
            }

        },
        created: function () {
            let name = this.$cookies.get('nickname')
            if (name) {
                this.nickname = this.$cookies.get('nickname')
                let username = this.$cookies.get('username')
               let index=sessionStorage.getItem('index')
                    this.indexTab=index
                if (username!='admin'){
                    this.permissions=true
                }
            } else {
                this.$message.error('还未登录，请先登录');
                this.$router.push('/')
            }

            // indexTab
            this.PageLoad()

        }

    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .el-container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .el-header {
        background-color: #403f4d;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .headerTitle {
        color: #ffffff;
    }

    .menubox {
        width: 50%;
        display: flex;
        justify-content: space-between;
        margin-left: 2%;
    }

    .el-aside {
        background-color: #403f4d;
        height: 100%;
        color: #ffffff;
    }

    .menu {
        margin-left: 5px;
    }

    .el-main {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    /*.tabsPane{height: 5%}*/
    .el-tabs {
        height: 100%
    }
</style>