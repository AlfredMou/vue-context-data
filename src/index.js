import childMixins from './childMixins.js';
import parentMixins from './parentMixins.js';

export default {
    install(Vue) {
        Vue.mixin(parentMixins);
        Vue.mixin(childMixins);
    }
}