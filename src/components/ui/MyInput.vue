<template>
    <input
        :value="modelValue"
        @input="updateInput"
        class="input"
        type="text"
    >
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>
    .input {
        padding: 10px 5px;
        width: 100%;
    }
</style>