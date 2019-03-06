import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: require('./views/login').default
        },
        {
            path: '/Home',
            name: 'Home',
            component: require('./views/Home').default,
            redirect:'/AlcoholAdministration',
            children:[
                {
                    //酒品管理
                    path: '/AlcoholAdministration',
                    name: 'AlcoholAdministration',
                    component: require('./views/AlcoholAdministration').default
                },{
                //操作员管理
                    path:'/operator',
                    name:'operator',
                    component:require('./views/operator').default
                }
            ]
        },

    ]
})
