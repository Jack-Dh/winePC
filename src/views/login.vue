<template>
    <div class="login">

        <div class="box_box">
            <div class="loginbox">
                <el-row :gutter="20">
                    <el-col :span="22" :offset="1">
                        <el-input
                                placeholder="登录账号"
                                v-model="userName"
                                suffix-icon="el-icon-info"
                        ></el-input>
                    </el-col>
                    <el-col :span="22" :offset="1">
                        <el-input placeholder="登录密码"
                                  v-model="passWord"
                                  suffix-icon="el-icon-info"
                                  type="password"
                                  @keyup.enter.native="loginWine"
                        ></el-input>
                    </el-col>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" style="width: 100%" @click="loginWine">登录</el-button>
                    </el-col>
                    <el-col :span="20" :offset="2">
                        <el-button type="text" style="color: #409eff;font-size: 0.8em" @click="addaccount=true">注册账号
                        </el-button>
                        <el-button type="text" style="color: #409eff;font-size: 0.8em" @click="forget">忘记密码？</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>


        <el-dialog
                title="注册账号"
                :visible.sync="addaccount"
                width="30%"
        >

            <el-form :model="addAdmin" :rules="rules" ref="addAdmin" inline class="demo-ruleForm">
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

    </div>

</template>

<script>
    export default {
        name: "login",
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

            return {
                userName: '',//登录账号
                passWord: '',//登录密码
                addaccount: false,//注册界面
                addAdmin: {
                    username: '',//登录账号
                    nickname: '',//用户昵称
                    password: '',//用户密码
                    renewpwd: '',//确认密码
                    phoneNumber: '',//手机号
                },
                rules: {
                    username: [
                        {required: true, message: '登录账号不能为空', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '用户昵称不能为空', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePass, trigger: 'blur'},
                    ],
                    renewpwd: [
                        {required: true, validator: validatePass2, trigger: 'blur'},
                    ],
                }

            }
        },
        methods: {
            adduser(addAdmin) {
                this.$refs[addAdmin].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.adduserLogin, this.addAdmin).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    onClose() {
                                        location.reload();
                                    }

                                });
                            }
                        })

                    } else {
                        return false;
                    }
                });
            },
            forget() {
                //忘记密码
                this.$message('请联系高级管理员处理！');
            },

            loginWine() {
                let data = {
                    username: this.userName,
                    password: this.passWord
                }
                this.$axios.post(this.$store.state.login, data).then(res => {
                    if (res.data.code == 200) {
                        let nickname = res.data.data.nickname
                        let username = res.data.data.username
                        this.$cookies.set('nickname', nickname)
                        this.$cookies.set('username', username)
                        this.$router.push('/Home')
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        created:function () {
            sessionStorage.setItem('index','1')

        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box_box {
        width: 1000px;
        height: 900px;
        background: url("../assets/image/imac.png") no-repeat;
        display: flex;
        justify-content: center;
    }

    .loginbox .el-input, .box .el-button {
        margin-top: 6%;
        margin-bottom: 2%;
    }

    .loginbox {
        width: 300px;
        height: 220px;
        margin-top: 180px;
        background-color: #edeff1;
        padding: 10px;
        border-radius: 2%
    }


</style>