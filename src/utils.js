const _toString = Object.prototype.toString
const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/

function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}
export function getType (fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
}
export function assertType (value, type) {
    let valid
    const expectedType = getType(type)
    if (simpleCheckRE.test(expectedType)) {
        const t = typeof value
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object')
            valid = value instanceof type;
    } else if (expectedType === 'Object')
        valid = isPlainObject(value);
    else if (expectedType === 'Array')
        valid = Array.isArray(value);
    else
        valid = value instanceof type;
    return {
        valid,
        expectedType
    }
}
export function toRawType (value) {
    return _toString.call(value).slice(8, -1)
}
export function checkValueType(value, type, name) {
    if(type === undefined || value === undefined)
        return true;
    const result = assertType(value, type);
    if(!result.valid)
        console.error(`[vue-context-data warn]: Invalid context data: type check failed for prop "${name}". Expected ${result.expectedType}, got ${toRawType(value)}.`);
    return result.valid;
}
export function getContextComponents(component, handleFn) {
    if(component.$parent){
        let result = undefined;
        if (handleFn instanceof Function) {
            if(handleFn(component.$parent))
                result = component.$parent;
        } else {
            if(component.$parent.__$$context)
                result = component.$parent;
        }
        if(!result)
            return getContextComponents(component.$parent);
        else
            return result;

    } else
        return undefined;
}