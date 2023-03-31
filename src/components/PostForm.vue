<template>
     <form @submit.prevent class="form">
        <h4>Создание поста</h4>
        <my-input
            v-focus
            class="form_input"
            v-model="post.title"
            placeholder="Название поста"
        />
        <my-input
            class="form_input"
            v-model="post.body"
            placeholder="Описание поста"
        />
        <my-button class="form_btn" @click="createPost">Создать пост</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin-bottom: 30px;
    }

    .form_btn {
        margin-top: 15px;   
    }
    .form_input {
        margin-bottom: 10px;
    }
</style>