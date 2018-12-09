<template>
    <div style="margin-top:20px;">
        <button @click="initInstance()">
            子实例化
        </button>
    </div>
</template>

<script>
import miXins from '../../../../src/childMixins.js';

export default {
    mixins: [miXins],
    contextTypes: {
        initInstance: {
            type: Function,
            default: () => {},
        }
    },
    data(){
        return {};
    }
}
</script>
