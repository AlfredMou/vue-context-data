<template>
    <div>
        <p>名称：{{instance.name}}</p>
        <p>可用区：{{instance.region}}</p>
        <p>UUID：{{instance.UUID}}</p>
        <p>status：{{statusMap[instance.status]}}</p>
        <p>创建时间：{{instance.create}}</p>
    </div>
</template>

<script>
import miXins from '../../../../src/childMixins.js';
export default {
    mixins: [miXins],
    contextTypes: {
        instance: {
            type: Object,
            default: {},
        }
    },
    data(){
        return {
            statusMap: {
                uninit: '未实例化',
                init: '已实例化',
            }
        };
    }
}
</script>
