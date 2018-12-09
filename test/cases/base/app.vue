
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
import miXins from '../../../src/parentMixins.js';
export default {
    components: {
        'u-component-1': component1,
    },
    el: '#app',
    mixins: [miXins],
    name: 'u-main',
    context: {
        instance: {
            type: Object,
            value: () => ({
                name: 'test-name',
                region: '可用区B',
                UUID: '41325bd0-0c08-4850-b970-ec08b6a50ea2',
                status: 'uninit',
                create: new Date().getTime(),
            }),
        },
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
        // this.initInstance();
    },
    methods: {
        instanceInit() {
            this.instance.status = 'init';
        },
    },
}
</script>
