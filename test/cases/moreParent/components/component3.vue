<template>
    <div>
        <p>名称：{{ instance.name }}/{{ name }}</p>
        <p>可用区：{{ instance.region }}</p>
        <p>UUID：{{ instance.UUID }}</p>
        <p>status：{{ statusMap[instance.status] }}</p>
        <p>创建时间：{{ instance.create }}</p>
    </div>
</template>

<script>
export default {
    contextTypes: {
        name: String,
        instance: {
            type: Object,
            default: () => ({}),
            parent(dom) {
                return dom.$options.name === 'u-main';
            },
        },
    },
    data() {
        return {
            statusMap: {
                uninit: '未实例化',
                init: '已实例化',
            },
        };
    },
};
</script>
