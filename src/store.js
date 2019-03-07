import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login:'http://qrcode.jiajiachuang.cn/qrcode/operator/login',//登录
        adduserLogin:'http://qrcode.jiajiachuang.cn/qrcode/operator/save',//注册

        operatorquery:'http://qrcode.jiajiachuang.cn/qrcode/operator/queryPage',//操作员信息分页查询
        delopera:'http://qrcode.jiajiachuang.cn/operator/delete',//根据id删除操作员
        upuserLogin:'http://qrcode.jiajiachuang.cn/qrcode/operator/update',//修改管理员信息

        addwine: 'http://qrcode.jiajiachuang.cn/qrcode/qrcode/save',//添加酒品
        upwine:'http://qrcode.jiajiachuang.cn/qrcode/qrcode/updateImage',//修改酒品
        delwine:'http://qrcode.jiajiachuang.cn/qrcode/qrcode/delete',//删除红酒信息
        addwineupdate: 'http://qrcode.jiajiachuang.cn/qrcode/qrcode/update',//生成二维码保存
        winequery: 'http://qrcode.jiajiachuang.cn/qrcode/qrcode/queryPage',//酒品信息分页查询
    },
    mutations: {},
    actions: {}
})
