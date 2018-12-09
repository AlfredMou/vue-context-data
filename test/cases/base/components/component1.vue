<template>
    <div>
        <u-component-2></u-component-2>
        <u-component-3></u-component-3>
    </div>
</template>

<script>
import component2 from "./component2.vue";
import component3 from "./component3.vue";
console.log(component2);
export default {
    components: {
        'u-component-2': component2,
        'u-component-3': component3
    },
}
</script>
