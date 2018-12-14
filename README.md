# vue-context-data
- [中文说明](README.zh-CN.md)
React context for vue, mainly used for data communication between father component and son component.
The main function of this vue plugin is to communicate between parent and child, not just to simulate react mainly to solve the following two problems.
1. Simple application simplifies the sharing of parent and child component communication and the sharing and change of the same data without introducing vuex (vuex can really manage the data and state of the application well, but in fact the development cost of maintaining the store is relatively high, Simple application or simple module data. The introduction of complex data management in closed applications is not necessarily a good choice.
2. The decoupling between the component between the business component and the common component under vuex and vuex (sorry, I prefer the method of connect-react-redux for data binding, vuex officially recommended calling mode for business data The components that are processed, but at the same time versatile components are not particularly friendly, and the way to introduce and distribute is easy to couple components with vuex)

## Installation

``` shell
npm install vue-context-data --save
```

## Basic use

Global registration vue-context-data
```javascript
import VueContextData from 'vue-context-data';

Vue.use(VueContextData);
```
The parent component declares Context Data via context
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
The child component declares the accepted context data type through contextTypes, and declares that the context will automatically bind the context in the parent component of the most recent and declared context.
``` javascript
export default {
    contextTypes: {
        nodes: Array,
        instance: Object
    },
}
```
## Set default value
The vue-context-data property setting refers to the props of vue, allowing the user to set the default value. If the parent of the child component does not set the value in the context data, the default value will automatically fill the default declared in the contextTypes. At the same time, if the parent component's context declares value, it will be automatically populated at initialization time.
a context declaration in the parent component
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
a contextTypes declaration in a child component
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
## Custom selection parent node
a context declaration in the parent component
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
a contextTypes declaration in a child component
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

## Changelog

See [Releases](https://github.com/AlfredMou/vue-context-data/releases)

## Suggestions and bugs

See [Releases](https://github.com/AlfredMou/vue-context-data/issues)


## License

See [LICENSE](LICENSE)
