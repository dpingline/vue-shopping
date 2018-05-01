const routers = [{
        path: '/list', //当前匹配的路径
        meta: {
            title: '商品列表'
        },
        component: (resolve) => require(['./views/list.vue'], resolve) //映射的组件
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/list'
    }
];
export default routers;
// webpack会把每一个路由打包为一个js文件，在请求到该页时，才会去加载这个页面的js，也就是异步实现的懒加载（安需加载）
// 非要一次性加载可以这样写
// {
//     path: '/list', //当前匹配的路径
//     meta: {
//         title: '商品列表'
//     },
//     component: require('./views/list.vue') //映射的组件
// },