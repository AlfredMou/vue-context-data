<template>
    <div>
        <table style="table-layout:fixed;">
            <thead>
                <tr>
                    <th style="text-align:left;" width="30%">节点名称</th>
                    <th style="text-align:left;" width="30%">节点状态</th>
                    <th style="text-align:left;" width="20%">创建时间</th>
                    <th style="text-align:left;" width="20%">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="node in nodes">
                    <td>{{node.name}}</td>
                    <td>{{node.status}}</td>
                    <td>{{node.createTime}}</td>
                    <td>
                        <a style="cursor: pointer;" @click="nodeDel(node.id)">
                            删除
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    contextTypes: {
        nodes: {
            type: Array,
            default: [],
        },
        nodeDel: {
            type: Function,
        }
    },
}
</script>
