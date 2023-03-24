<template>
    <div class="app">
        <post-form @create="createPost" />
        <posts-list
            :posts="posts"
            @remove="removePost"
        />
    </div>
</template>

// v-bind:posts = :posts

<script>
import PostForm from './components/PostForm.vue'
import PostsList from './components/PostsList.vue'

export default {
    components: {
        PostForm, PostsList
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'JavaScript', body: 'JS is the best'},
                {id: 2, title: 'Python', body: 'Py is the best'},
                {id: 3, title: 'Java', body: 'Java is the best'},
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
        },
        removePost(postRemove) {
            this.posts = this.posts.filter(post => post.id !== postRemove.id)
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 15px;
}
</style>