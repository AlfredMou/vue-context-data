# vue-context-data

react context vue版本，主要用于隔代父子之间的数据通信
这个vue插件主要的作用是隔代父子通信，并不仅仅是为了模仿react主要用于解决以下两个问题
1. 简单应用中在不引入vuex情况下简化隔代父子组件通信与同一数据的共享与更改（vuex确实能够很好的管理应用的数据与状态但是实际上维护store的开发成本也是比较高的，简单应用或者模块数据简单其封闭的应用引入复杂的数据管理并不一定是很好的选择）。
2. vuex下的介于业务组件与通用组件之间的组件与vuex的解耦（很抱歉，我更喜欢react-redux的connect的方式进行数据绑定，vuex官方推荐的调用方式对进行业务数据处理的组件，但是同时又具有通用性的组件并不是特别友好，这种引入并分发的方式很容易让组件与vuex强耦合在一起）

## 安装

``` shell
npm install vue-context-data --save
```

## 基础使用

全局注册vue-context-data
```javascript
import VueContextData from 'vue-context-data';

Vue.use(VueContextData);
```
父组件通过context声明Context Data
``` javascript
export default {
    name: 'u-main',
    context: {
        nodes: Array,
        instance: Object,
    },
    data() {
        return {
            type: 0,
        };
    },
    created() {
        this.instance = {
            name: 'test',
        };
    },
}
```
子组件通过contextTypes声明接受的context data类型, 声明context将自动绑定最近的并声明有context的上级组件中的context。
``` javascript
export default {
    contextTypes: {
        nodes: Array,
        instance: Object
    },
}
```
## 设置默认值
vue-context-data属性设置上参考了vue的props，允许用户设置默认值，如果子组件的parent并未设置context data中的值默认值将自动填充contextTypes中申明的default。同时如果父组件的context声明了value也将会在初始化时自动填充。
父组件中的context声明
``` javascript
export default {
    name: 'u-main',
    context: {
        nodes: Array,
        instance: {
            type: Object,
            value: {
                name: 'test',
            }
        }
    },
    data() {
        return {
            type: 0,
        };
    },
}
```
子组件中的contextTypes声明
``` javascript
export default {
    contextTypes: {
        nodes: Array,
        instance: {
            type: Object,
            dafault: {
                name: 'test',
            }
        }
    },
    created() {
        console.log(this.nodes);
    }
}
```
## 自定义选择父节点
有时候往往上级组件中并不仅有一个组件声明有context，这个时候就需要通过自定义筛选函数来进行筛选，这里建议用$options中的标记属性作为筛选条件
父组件中的context声明
``` javascript
export default {
    name: 'u-main',
    context: {
        nodes: Array,
        instance: {
            type: Object,
            value: {
                name: 'test',
            }
        }
    },
    data() {
        return {
            type: 0,
        };
    },
}
```
子组件中的contextTypes声明
``` javascript
export default {
    contextTypes: {
        nodes: Array,
        instance: {
            type: Object,
            dafault: {
                name: 'test',
            },
            parent(dom) {
                return dom.$options.name === 'u-main';
            },
        }
    },
    created() {
        console.log(this.instance);
    }
}
```

## 修改日志

参见[Releases](https://github.com/AlfredMou/vue-context-data/releases)

## 建议与bug

参见[Releases](https://github.com/AlfredMou/vue-context-data/issues)


## 开源协议

参见[LICENSE](LICENSE)
