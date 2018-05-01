# 基于Vue.js电商网站项目开发

> 注释版/教程版，稍有修改
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
tag可以指定渲染成什么标签，比如<router-link to="/about" tag="li">渲染的结果是<li>而不是<a>

replace:
使用replace不会留下History记录，所以导航后不能用后退键返回上一个页面，如<router-link="/about" replace>

active-class:
当<router-link>对应的路由匹配成功时，会自动给当前元素设置一个名为router-link-active的class，设置prop：active-class可以修改默认的名称。在做类似导航栏时，可以使用该功能高亮显示当前页面对应的导航菜单项，但是一般不会修改active-class，直接使用默认值router-link-active就可以
```




