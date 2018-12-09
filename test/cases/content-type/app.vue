
<template>
    <div>
        <div style="border-bottom: 1px solid #2333">
            <div>
                <p>实例名称： {{name}}</p>
                <p>状态： {{instance.status==='uninit'?'未实例化':'已实例化'}}</p>
                <p>
                    <button @click="addNode">
                        添加节点
                    </button>
                </p>
            </div>
            <div>
                <a style="margin:0px 5px;padding: 5px;cursor: pointer;" @click="type=0">基本信息</a>
                <a style="margin:0px 5px;padding: 5px;cursor: pointer;" @click="type=1">节点列表</a>
            </div>
        </div>
        <u-component-1 v-if="type===0"></u-component-1>
        <u-component-4 v-if="type===1"></u-component-4>
    </div>
</template>

<script>
import component1 from './components/component1.vue';
import component4 from './components/component4.vue';

export default {
    components: {
        'u-component-1': component1,
        'u-component-4': component4,
    },
    el: '#app',
    name: 'u-main',
    context: {
        id: {
            type: Symbol,
            value: Symbol('id'),
        },
        name: {
            type: String,
            value: 'test',
        },
        nodeNumber: {
            type: Number,
            value: 4,
        },
        nodes: {
            type: Array,
            value:  () => [{
                id: Symbol('nodeId'),
                name: 'test1',
                status: 'error',
                createTime: new Date().getTime(),
            }],
        },
        isDefault: {
            type: Boolean,
            value: true,
        },
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
        nodeDel: {
            type: Function,
            value(id) {
                this.delNode(id);
            }
        }
    },
    data() {
        return {
            type: 0,
        };
    },
    created() {
        // this.initInstance();
    },
    methods: {
        instanceInit() {
            this.instance.status = 'init';
        },
        delNode(id) {
            this.nodes = this.nodes.filter((node) => {
                return node.id !== id;
            })
        },
        addNode() {
            this.nodes.push({
                id: Symbol('nodeId'),
                name: 'test2',
                status: 'normal',
                createTime: new Date().getTime(),
            });
        },
    },
}
</script>
