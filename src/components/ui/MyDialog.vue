<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
    name: 'my-dialog',
    mixins: [toggleMixin]
    // props: {
    //     show: {
    //        type: Boolean,
    //        default: false,
    //     }
    // },
    // methods: {
    //     hideDialog() {
    //         this.$emit('update:show', false);
    //     }
    // }
}
</script>

<style>
    .dialog {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
    }

    .dialog__content {
        margin: auto;
        background: white;
        border-radius: 12px;
        padding: 20px;
    }
</style>