import { checkValueType, getContextComponents, getType, toRawType } from './utils.js';

class ComputedContext {
    constructor(value) {
        this.value = value;
    }
}
function getDefaultValue(defaultValue, typeStr) {
    let value = defaultValue;
    if (value !== undefined) {
        if (typeStr === 'Object' || typeStr === 'Array') {
            if (toRawType(value) !== 'Function')
                throw new Error(`[vue-context-data warn]: Invalid default value for context data "${name}": Context datas with type Object/Array must use a factory function to return the default value.`);
            else
                value = value.apply(this);
        } else if (typeStr === 'Function')
            value = value.bind(this);
    }
    return value;
}
export default {
    beforeCreate() {
        const context = this.$options.contextTypes;
        if (context) {
            const names = Object.keys(context);
            this.__$$contextData = {};
            for (const name of names) {
                let item = context[name];
                if (toRawType(item) === 'Function')
                    item = { type: item };
                const type = item.type;
                const typeStr = getType(type);
                const defaultValue = item.default;
                const getParent = item.parent;
                const contextParent = getContextComponents(this, getParent);
                if (!contextParent)
                    break;
                let value;
                if (contextParent.__$$context && contextParent.__$$context.hasOwnProperty(name) && contextParent.__$$context[name] !== undefined)
                    value = contextParent[name];
                else
                    value = getDefaultValue(defaultValue, typeStr);
                checkValueType(value, type, name);
                this.__$$contextData[name] = value;
                contextParent.$on(`update-context:${name}`, ({ value }) => {
                    if (value === undefined)
                        value = getDefaultValue(defaultValue, typeStr);
                    else
                        checkValueType(value, type, name);
                    this[name] = new ComputedContext(value);
                });
            }
            for (const name of Object.keys(this.__$$contextData)) {
                if (!this.$options.computed)
                    this.$options.computed = {};
                if (!this.$options.computed[name]) {
                    this.$options.computed[name] = {
                        get() {
                            return this.__$$contextData[name];
                        },
                        set(context) {
                            if (context instanceof ComputedContext)
                                this.__$$contextData[name] = context.value;
                            else
                                console.error(`[vue-context-data]: context data ${name} is not allowed to modify，Please provide the action function by the parent context to manipulate the property`);
                        },
                    };
                }
            }
        }
    },
    data() {
        return {
            __$$contextData: this.__$$contextData,
        };
    },
};
