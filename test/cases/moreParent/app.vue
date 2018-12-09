<template>
    <div>
        实例信息展示
        <div>
            <u-component-1></u-component-1>
        </div>
    </div>
</template>

<script>
import component1 from './components/component1.vue';
export default {
    el: '#app',
    name: 'u-main',
    components: {
        'u-component-1': component1,
    },
    context: {
        name: String,
        instance: Object,
        initInstance: {
            type: Function,
            value() {
                this.instanceInit();
            },
        },
    },
    data() {
        return {
            instanceName: 'test',
        };
    },
    created() {
        this.name = 'test';
        this.instance = {
            name: 'test-name',
            region: '可用区B',
            UUID: '41325bd0-0c08-4850-b970-ec08b6a50ea2',
            status: 'uninit',
            create: new Date().getTime(),
        };
    },
    methods: {
        instanceInit() {
            this.instance.status = 'init';
        },
    },
};
</script>
