<template>
    <div style="margin-top:20px;">
        <button @click="initInstance()">
            子实例化
        </button>
    </div>
</template>

<script>
export default {
    contextTypes: {
        initInstance: {
            type: Function,
            default: () => {
                // ‘default’
            },
        },
    },
    data() {
        return {};
    },
};
</script>
