<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-button type="primary" @click="dialogVisible=true" size="mini">新增</el-button>
            </div>

            <div>
                <el-input size="mini" style="width: 50%" v-model="barquery" placeholder="编码"></el-input>
                <el-button size="mini" @click="barquery=''">重置</el-button>
                <el-button size="mini" @click="pagequery()">查询</el-button>
            </div>


        </div>

        <div>
            <el-table
                    :data="wineLiat"
                    border
            >
                <el-table-column
                        label="条形码"
                        prop="bar"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="酒品图片"
                        prop="bar"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-popover
                                placement="top-start"
                                trigger="hover"
                        >
                            <img style="width: 300px;height: 300px" :src="scope.row.imageUrl">
                            <img slot="reference" style="width: 50px;height: 50px" :src="scope.row.imageUrl">
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        label="二维码图片"
                        prop="bar"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-popover
                                placement="top-start"
                                trigger="hover"
                        >
                            <img style="width: 300px;height: 300px" :src="scope.row.qrContent">
                            <img slot="reference" style="width: 50px;height: 50px" :src="scope.row.qrContent">
                        </el-popover>


                    </template>
                </el-table-column>
                <el-table-column
                        label="价格"
                        align="center"
                        prop="price"
                ></el-table-column>

            </el-table>

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


        <el-dialog
                title="新增酒类"
                :visible.sync="dialogVisible"
                width="60%"
        >


            <el-upload
                    action="http://192.168.1.199:8088/qrcode/qrcode/uploadImage "
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="uploadImage"
                    name="file"
                    :before-upload="beforeAvatarUpload"
                    accept=".png,.jpg,.jpeg"
                    :limit="1"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="bingImg">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过2M</div>
            <vue-qr v-show="switchShow" id="qrcode" :text="urlValvue"></vue-qr>


            <el-form :model="AlcohlData" ref="AlcohlData" label-width="100px" class="demo-ruleForm" :inline="true">
                <el-row>
                    <el-form-item
                            prop="price"
                            :rules="[
                             { required: true, message: '请输入酒品价格'},
                     ]"
                    >
                        <el-input placeholder="酒品价格,例（300.00）" v-model.number="AlcohlData.price"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item
                            prop="price"
                            :rules="[
                             { required: true, message: '请输入酒品条形码'},
                     ]"
                    >
                        <el-input placeholder="酒品条形码" v-model.number="AlcohlData.bar"></el-input>
                    </el-form-item>
                </el-row>
                <el-form-item>
                    <a>
                        <el-button @click="downloadImg" title="下载二维码至本地">保存二维码</el-button>
                    </a>
                    <!--http://192.168.1.199:8088/qrcode/qrcode/createQRcode-->
                    <el-button type="primary" @click="generate()">生成二维码</el-button>
                    <el-button type="primary" @click="submitForm('AlcohlData')">保存</el-button>
                </el-form-item>
            </el-form>


        </el-dialog>


    </div>
</template>

<script>
    import vueQr from 'vue-qr'

    export default {
        name: "AlcoholAdministration",
        components: {vueQr},
        data() {
            return {
                urlValvue: '',//生成地址
                dialogImageUrl: '',//上传图片展现用户地址
                bingImg: false,//查看大图
                imgUrl: '',//数据库图片地址
                AlcohlData: {
                    price: '',//酒品价格
                    imageUrl: '',//图片地址
                    bar: '',//酒品条形码
                },
                switchShow: false,//二维码显示隐藏
                imgName: '',//二维码名称
                baseImg: '',//二维码编码
                AlcohoId: '',//
                wineLiat: [],//酒品信息
                dialogVisible: false,//新增酒品面板
                totalRecord: 0,//总数
                pageNum: 1,//当前页数
                barquery: '',//条形码查询

            }
        },
        methods: {

            handleCurrentChange(val) {
                this.pageNum = val
                this.pagequery()
            },
            beforeAvatarUpload(file) {
                //上传图片大小限制
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;

            },
            submitForm(formName) {

                // let oQrcode = document.querySelector('#qrcode img').src

                this.$refs[formName].validate((valid) => {
                    if (valid) {


                        this.$axios.post(this.$store.state.addwine, this.AlcohlData).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.urlValvue = `http://mobile.jiajiachuang.cn?id=${res.data.data.id}`
                                this.AlcohoId = res.data.data.id
                                console.log(this.urlValvue)
                            }

                        })


                        // this.switchShow = true//显示图片
                    } else {
                        this.$message.error('数据还未填写完全！');
                        return false;
                    }
                });
            },
            generate() {
                //生成二维码
                let oQrcode = document.querySelector('#qrcode img').src
                if (oQrcode) {
                    this.switchShow = true//显示二维码
                    let data = {
                        id: this.AlcohoId,
                        qrContent: oQrcode
                    }
                    this.$axios.post(this.$store.state.addwineupdate, data).then(res => {
                        console.log(res)
                    })
                } else {
                    this.$message.error('暂未保存酒品信息，请先保存完酒品信息再生成二维码哦！');
                }

            },

            uploadImage(response, file, fileList) {
                //上传图片
                if (response.code != 200) {
                    this.$message.error(file.response.msg);
                } else {
                    this.AlcohlData.imageUrl = response.data
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.bingImg = true;
            },


            downloadImg() {

                if (this.urlValvue != '') {
                    //下载二维码
                    var oQrcode = document.querySelector('#qrcode img')
                    var url = oQrcode.src
                    var a = document.createElement('a')
                    var event = new MouseEvent('click')
                    // 下载图名字
                    a.download = this.imgName
                    //url
                    a.href = url
                    //合成函数，执行下载
                    a.dispatchEvent(event)
                } else {
                    this.$message.error('还未生成二维码！');
                }

            },
            dataFormat(time) {
                //以时间格式命名
                return `${time.getFullYear()}${time.getMonth() + 1 >= 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1)}${time.getDate() >= 10 ? time.getDate() : '0' + time.getDate()}${time.getHours() >= 10 ? time.getHours() : '0' + time.getHours()}${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()}${time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds()}`;
            },
            pagequery() {
                //分页查询酒品信息
                this.$axios.get(this.$store.state.winequery, {
                    params: {pageSize: 10, pageNum: this.pageNum, bar: this.barquery}
                }).then(res => {
                    console.log(res)
                    this.wineLiat = res.data.list
                    this.totalRecord = res.data.totalRecord
                })
            }
        },
        created: function () {
            let data = new Date()
            let name = this.dataFormat(data)
            this.imgName = name

            this.pagequery()

        }
    }
</script>

<style scoped>
    .el-button {
        margin: 1em
    }

</style>