# 基于Vue.js电商网站项目开发

> 注释版/教程版，稍有修改

* [概述](#概述)
* [vue-router](#vuerouter)
* [Vuex](#vuex)

## 概述
来自《Vue.js项目实战》  

所涉及内容涵盖了许多典型场景，如商品列表按照价格、销量排序；商品列表按照品牌、价格过滤；动态购物车；使用优惠码等。

![alt](/images/cut-1.jpg)

![alt](/images/cut-2.jpg)

## vue-router
* 后端路由：每次GET或POST等请求在服务端有一个专门的正则配置列表，然后匹配到具体的一条路径后，分发到不同的Controller，进行各种操作，最终将html或数据返回前端，完成一次IO。缺点：模板是由维护或改写，html、数据、逻辑混为一谈。
* 前端路由：SPA单页面富应用，前后端分离的开发模式，后端只提供API返回数据，前端通过Ajax获取数据后，再用一定的方式渲染到页面里。优点：前后端分离，后端专注在数据上，前端专注在交互和可视化上，如果今后在开发移动APP，那么正好共用一套API。缺点：首屏渲染需要时间来加载css和js。

SPA就是在前后端分离的基础上，加上一层前端路由。

前端路由的开发：页面的可插拔、页面的生命周期、内存管理等。

### 跳转方法一：使用内置的<router-link>组件，它会被渲染成为一个<a>标签
它的用法与一般的组件一样，to是一个prop，指定需要跳转的路径，当然也可以用v-bind动态设置。使用<router-link>，在HTML5的History模式下会被拦截点击，避免浏览器重新加载页面。

```
tag:
tag可以指定渲染成什么标签，
比如<router-link to="/about" tag="li">渲染的结果是<li>而不是<a>

replace:
使用replace不会留下History记录，所以导航后不能用后退键返回上一个页面，
如<router-link="/about" replace>

active-class:
当<router-link>对应的路由匹配成功时，会自动给当前元素设置一个名为router-link-active的class，
设置prop：active-class可以修改默认的名称。
在做类似导航栏时，可以使用该功能高亮显示当前页面对应的导航菜单项，
但是一般不会修改active-class，直接使用默认值router-link-active就可以
```

### 跳转方法二：使用router实例方法
```
this.$router.push('/user/123');

replace:
类似于<router-link>的replace功能，它不会向history添加新纪录。
而是替换掉当前的history记录

go：
//后退1页
this.$router.go(-1);
//前进2页
this.$router.go(2);
```

### 高级用法
在页面发生路由改变时，需要统一设置。vue-router提供了导航钩子beforeEach和afterEach

导航钩子有三个参数：
* to 即将要进入的目标的路由对象
* from 当前导航即将要离开的路由对象
* next 调用该方法后，才能进入下一个钩子

```
const router = new VueRouter(RouterConfig);

//切换到不同页面时，改变标题
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

//一个页面较长，滚动到某个位置，在跳转到另一个页面
//滚动条默认是在上一个页面停留的位置，二号的体验肯定是能返回顶端
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
```

从一个页面过渡到另一个页面时，可以出现一个全局的Loading动画，等刷新页面加载完后再结束动画。
```
//某些页面需要校验是否登录，如果登录了就可以访问，否则调到登录页
router.beforEach((to,from,next)=>{
    if(window.localStorage.getItem(token)){
        next();
    }else{
        next('/login);
    }
});
//next()的参数设置为false时，可以取消导航，设置为具体的路径可以导航到指定的页面
```

## Vuex
在实际业务中，经常有跨组件共享数据的需求，因此Vuex的设计就是用来统一管理组件状态的。非父子组件通信时，也可以使用bus(中央事件总线)的方法。

Vuex里面的数据都是响应式的，任何组件使用同一store的时候，只要store的数据变化，对应的组件也会立即更新。

> 看main.js

### state
在组件内来自store的数据只能读取，不能手动改变，改变store中数据的唯一途径就是显式地提交mutations

```
const store = new Vuex.Store({
    state:{
    count:0
    }
});
...

this.$store.state.count
```


### mutations
javascript的观察者模式，组价只负责提交一个事件名，Vuex对应的mutataions来完成业务逻辑。

```
const store = new Vuex.Store({
    mutations:{
       increment(state，n=1){
           state.count+=n;
       }
    }
});
...

this.$store.commit('increment',5);
//或者
this.$store.commit({
    type:'increment',
    count:10
})

```
mutation里不要异步操作数据，如果异步操作数据了，组件在commit后，数据不能立即被恢复，而且不知道什么时候会改变。

### getters
相当于组件的计算属性，getter也可以依赖其他getter
```
const store = new Vuex.Store({
    getters:{
        filteredList:state => {
            return state.list.filter(item => item < 10);
        },
        listCount:(state,getters){
            return getters.filteredList.length;
        }
    }
});
...

this.$store.getters.listCount;
```

### action
mutation里不应该异步操作数据，所以有了actions选项。action与mutation很像，不同的是action里面提交的是mutation，并且可以异步操作业务逻辑。

```
const store = new Vuex.Store({
    actions:{
        asyncIncrement(context){
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                },1000)
            })
        }
    }
});
...

this.$store.dispatch('asyncIncrement').then(() => {
    console.log(this.$store.state.count);
})
```
涉及改变数据的，就使用mutations，存在业务逻辑的，就用actions。至于将业务逻辑放在action里还是Vue组件里完成，就需要根据实际场景拿捏了。

### modules
用来将store分割到不同的模块
```
const moduleA = {
    state:{},
    mutations:{},
    actions:{},
    getters:{}
}

const store = new Vue.Store({
    modules:{
        a:moduleA,
        b:moduleB
    }
});

```
module的mutation和getter接收的第一个参数state是当前模块的状态，在action和getters中，还可以接受一个参数rootState，来访问根节点的状态
