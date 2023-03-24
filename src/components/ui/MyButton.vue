<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
    .btn {
        padding: 10px 5px;
        border: 1px solid teal;
        background: rgb(221, 248, 248);
        border-radius: 7px;
    }
</style>