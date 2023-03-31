<template>
    <div class="post">
        <div>
            <div><strong>Название: </strong>{{ post.title }}</div>
            <div><strong>Описание: </strong>{{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
            <my-button @click="$emit('remove', post)">удалить</my-button>
        </div>   
    </div>
</template>

<script>
import MyButton from './ui/MyButton.vue'
export default {
  components: { MyButton },
    props: {
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>
    .post__btns {
        display: flex;
        align-self: flex-start;
        gap: 5px;
    }

    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>