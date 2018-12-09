<template>
    <div style="margin-top:20px;">
        <button :disabled="nodes.length===0" @click="initInstance()">
            子实例化
        </button>
    </div>
</template>

<script>
export default {
    contextTypes: {
        nodes: {
            type: Array,
            default: () => [],
        },
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
