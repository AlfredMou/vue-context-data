import { checkValueType, getContextComponents, getType, toRawType } from './utils.js';

class ComputedContext {
    constructor(value) {
        this.value = value;
    }
}
export default {
    beforeCreate() {
        const context = this.$options.contextTypes;
        if(context) {
            const names = Object.keys(context);
            this.__$$contextData = {};
            for(const name of names) {
                let item = context[name];
                if(toRawType(item) === 'Function')
                    item = { type: item };
                const type = item.type;
                const typeStr = getType(type);
                const defaultValue = item.default;
                const getParent = item.parent;
                const contextParent = getContextComponents(this, getParent);
                if(!contextParent)
                    break;
                let value = undefined;
                if(contextParent.__$$context && contextParent.__$$context.hasOwnProperty(name)) {
                    value = contextParent[name];
                } else {
                    value = defaultValue;
                    if(typeStr === 'Object' || typeStr === 'Array'){
                        if(toRawType(value) !== 'Function')
                            throw new Error(`[Vue warn]: Invalid default value for context data "${name}": Context datas with type Object/Array must use a factory function to return the default value.`);
                        else
                            value = value.apply(this);
                    }
                    else if (typeStr === 'Function')
                        value = value.bind(this);
                }
                checkValueType(value, type, name);
                this.__$$contextData[name] = value;
                contextParent.$on(`update-context:${name}`, ({value}) => {
                    checkValueType(value, type, name);
                    this[name] = new ComputedContext(value);
                });
                this.$options.computed;
            }   
            for(const name of Object.keys(this.__$$contextData)) {
                if(!this.$options.computed)
                    this.$options.computed = {};
                if(this.$options.computed[name])
                    throw new Error(`[vue-context-data]: ${name} has been declared in computed`);
                else {
                    this.$options.computed[name] = {
                        get() {
                            return this.__$$contextData[name];0
                        },
                        set(context) {
                            if(context instanceof ComputedContext)
                                this.__$$contextData[name] = context.value;
                            else
                                console.error(`[vue-context-data]: context data ${name} is not allowed to modify，Please provide the action function by the parent context to manipulate the property`);
                        }
                    }
                }
            }
        }
    },
    data() {
        return {
            __$$contextData: this.__$$contextData,
        }
    }
}