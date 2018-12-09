import { checkValueType, getType, toRawType } from './utils.js';

export default {
    beforeCreate() {
        const context = this.$options.context;
        if(context) {
            this.__$$context = {};
            this.__$$contextWatch = [];
            for(const name of Object.keys(context)) {
                const item = context[name];
                const type = getType(item.type);
                let value = item.value;
                if (type === 'Object' || type === 'Array') {
                    if(toRawType(value) !== 'Function')
                        throw new Error(`[Vue warn]: Invalid default value for context data "${name}": Context datas with type Object/Array must use a factory function to return the default value.`);
                    else
                        value = value.apply(this);
                } else if (type === 'Function')
                    value = value.bind(this);
                this.__$$context[name] = {
                    type: item.type,
                    value
                };
            }
            for(const name of Object.keys(this.__$$context)) {
                const context = this.__$$context[name];
                if(!this.$options.computed)
                    this.$options.computed = {};
                if(this.$options.computed[name])
                    throw new Error(`[vue-context-data]: ${name} has been declared in computed`);
                else {
                    this.$options.computed[name] = {
                        get() {
                            return this.__$$context[name].value;0
                        },
                        set(newValue) {
                            checkValueType(newValue, context.type, name);
                            const oldValue = this.__$$context[name].value;
                            this.__$$context[name] = Object.assign({}, this.__$$context[name], { value: newValue });
                            this.$emit(`update-context:${name}`, {
                                value: newValue,
                                oldValue,
                            });
                        }
                    }
                }
            }
        }
    },
    data() {
        return {
            __$$context: this.__$$context,
        };
    }
}