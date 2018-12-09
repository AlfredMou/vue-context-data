<template>
    <div>
        component-1：{{ name }}
        <u-component-2></u-component-2>
        <u-component-3></u-component-3>
    </div>
</template>

<script>
import component2 from './component2.vue';
import component3 from './component3.vue';
export default {
    name: 'u-component-1',
    context: {
        name: {
            type: String,
            value: 'test1',
        },
    },
    components: {
        'u-component-2': component2,
        'u-component-3': component3,
    },
};
</script>
