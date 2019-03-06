<template>
    <div class="operator">

        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                <el-button type="primary" @click="addaccount=true" size="mini">新增</el-button>
                    <el-button type="primary" @click="delOperator" size="mini">删除</el-button>
                </div>

                <div>
                    <el-input  size="mini" style="width: 50%" v-model="usernamequery" placeholder="登录账号"></el-input>
                    <el-button size="mini" @click="usernamequery=''">重置</el-button>
                    <el-button size="mini" @click="pagequery()">查询</el-button>
                </div>

            </div>

            <!--注册账号-->
            <el-dialog
                    title="注册账号"
                    :visible.sync="addaccount"
                    width="30%"
            >

                <el-form :model="addAdmin" :rules="rules" ref="addAdmin"  inline class="demo-ruleForm">
                    <el-form-item
                            label="登录账号"
                            prop="username"
                    >
                        <el-input size="mini" v-model="addAdmin.username"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="用户昵称"
                            prop="nickname"
                    >
                        <el-input size="mini" v-model="addAdmin.nickname"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="用户密码"
                            prop="password"
                    >
                        <el-input size="mini" type="password" v-model="addAdmin.password"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="确认密码"
                            prop="renewpwd"
                    >
                        <el-input size="mini" type="password" v-model="addAdmin.renewpwd"></el-input>
                    </el-form-item>

                    <el-form-item
                            label="手机号"
                    >
                        <el-input size="mini"  v-model="addAdmin.phoneNumber"></el-input>
                    </el-form-item>

                </el-form>

                <el-button type="primary" @click="adduser('addAdmin')" size="mini">注册</el-button>
            </el-dialog>

            <!--修改账号-->
            <el-dialog
                    title="修改账号"
                    :visible.sync="upaddaccount"
                    width="30%"
            >

                <el-form :model="upaddAdmin" :rules="uprules" ref="upaddAdmin"  inline class="demo-ruleForm">
                    <el-form-item
                            label="登录账号"
                            prop="username"
                    >
                        <el-input size="mini" v-model="upaddAdmin.username"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="用户昵称"
                            prop="nickname"
                    >
                        <el-input size="mini" v-model="upaddAdmin.nickname"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="用户密码"
                            prop="password"
                    >
                        <el-input size="mini" type="password" v-model="upaddAdmin.password"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="确认密码"
                            prop="renewpwd"
                    >
                        <el-input size="mini" type="password" v-model="upaddAdmin.renewpwd"></el-input>
                    </el-form-item>

                    <el-form-item
                            label="手机号"
                    >
                        <el-input size="mini"  v-model="upaddAdmin.phoneNumber"></el-input>
                    </el-form-item>

                </el-form>

                <el-button type="primary" @click="upadduser('upaddAdmin')" size="mini">修改</el-button>
            </el-dialog>





            <div>
                <el-table
                        :data="operatorList"
                        border
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column
                            width="70"
                            type="index"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            width="50"
                            type="selection"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            width="180"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="upopera(scope.row)">修改</el-button>
                            <el-button type="text" @click="deloperator(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="添加时间"
                            prop="createTime"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            label="登录账号"
                            prop="username"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            label="E-mail"
                            prop="email"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="昵称"
                            prop="nickname"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="密码"
                            align="center"
                            prop="password"
                    ></el-table-column>
                    <el-table-column
                            label="手机号"
                            prop="phoneNumber"
                            align="center"
                    >
                    </el-table-column>

                </el-table>

            </div>
        </div>


        <!--分页-->

        <div class="block" style="text-align: right;margin: 0.5em">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="totalRecord">
            </el-pagination>
        </div>



    </div>
</template>

<script>
    export default {
        name: "operator",
        data() {

            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入新密码'));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error('密码长度为6 - 18个字符'))
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addAdmin.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            var validatePass3 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入新密码'));
                } else if (value.toString().length < 6 || value.toString().length > 18) {
                    callback(new Error('密码长度为6 - 18个字符'))
                } else {
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.upaddAdmin.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                totalRecord: 0,//总数
                pageNum: 1,//当前页数
                operatorList: [],//操作员列表
                usernamequery:'',//查询
                addaccount: false,//注册界面
                addAdmin: {
                    username: '',//登录账号
                    nickname: '',//用户昵称
                    password: '',//用户密码
                    renewpwd:'',//确认密码
                    phoneNumber: '',//手机号
                },
                rules: {
                    username: [
                        { required: true, message: '登录账号不能为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '用户昵称不能为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass, trigger: 'blur' },
                    ],
                    renewpwd: [
                        { required: true, validator: validatePass2, trigger: 'blur' },
                    ],
                },
                upaddAdmin: {
                    username: '',//登录账号
                    nickname: '',//用户昵称
                    password: '',//用户密码
                    renewpwd:'',//确认密码
                    phoneNumber: '',//手机号
                },
                uprules: {
                    username: [
                        { required: true, message: '登录账号不能为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '用户昵称不能为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: validatePass3, trigger: 'blur' },
                    ],
                    renewpwd: [
                        { required: true, validator: validatePass4, trigger: 'blur' },
                    ],
                },
                ids:[],//多选ID
                upaddaccount:false,//修改面板
            }
        },
        methods: {
            deloperator(data){
                //单个删除
                this.ids.length=0
                this.ids.push(data.id)
                this.delOperator()
            },
            upopera(data){
              //修改面板
                this.upaddaccount=true
                this.upaddAdmin=data

            },
            handleSelectionChange(val){
                //获得多选id
                this.ids.length=0
                val.forEach(item=>{
                    this.ids.push(item.id)
                })
            },
            delOperator(){
              //批量删除
                this.$axios.post(this.$store.state.delopera,{
                    ids:this.ids
                }).then(res=>{

                    if (res.data.code==200){
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose(){
                                location.reload();
                            }

                        });
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            adduser(addAdmin){
                // 注册账号
                this.$refs[addAdmin].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.adduserLogin,this.addAdmin).then(res=>{
                            if (res.data.code==200){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    onClose(){
                                        location.reload();
                                    }

                                });
                            }else {
                                this.$message.error(res.data.msg);
                            }
                        })

                    } else {
                        return false;
                    }
                });
            },
            upadduser(upaddAdmin){
                // 修改账号
                this.$refs[upaddAdmin].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upuserLogin,this.upaddAdmin).then(res=>{
                            if (res.data.code==200){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    onClose(){
                                        location.reload();
                                    }

                                });
                            }else {
                                this.$message.error(res.data.msg);
                            }
                        })

                    } else {
                        return false;
                    }
                });
            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.pagequery()
            },
            pagequery() {
                //分页查询操作员信息
                this.$axios.get(this.$store.state.operatorquery, {
                    params: {pageSize: 10, pageNum: this.pageNum,username:this.usernamequery}
                }).then(res => {
                    console.log(res)
                    this.operatorList = res.data.list
                    this.totalRecord = res.data.totalRecord
                })
            },

        },
        created: function () {
            this.pagequery()
        }
    }
</script>

<style scoped>
    .el-button {
        margin: 1em
    }
</style>