<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button>Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form  />
        </my-dialog>
        <posts-list
            :posts="sortedAndSearchPosts"
            v-if="!isPostsLoading"
        />
        <div v-else>Загрузка...</div>
    </div>
</template>

// v-bind:posts = :posts

<script>
import PostForm from '@/components/PostForm.vue'
import PostsList from '@/components/PostsList.vue'
import MySelect from '@/components/ui/MySelect.vue';
import MyButton from '@/components/ui/MyButton.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchPosts from '@/hooks/useSortedAndSearchPosts';

export default {
    components: {
        PostForm, PostsList,
        MySelect,
        MyButton,
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
            ]
        }
    },
    setup(props) {
        const { posts, isPostsLoading, totalaPge } = usePosts(10);
        const { selectedSort, sortedPosts } = useSortedPosts(posts);
        const { searchQuery, sortedAndSearchPosts } = useSortedAndSearchPosts(sortedPosts);

        return {
            posts,
            totalaPge,
            isPostsLoading,
            selectedSort,
            searchQuery,
            sortedAndSearchPosts,
            sortedPosts
        }
    }
}
</script>

<style>
.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.pageNum__conteiner {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
}

.pageNum {
    border: 1px solid teal;
    padding: 10px 15px;
    border-radius: 10px;
}

.current-page {
    background-color: teal;
    color: white;
}

.observer {
    height: 20px;
    width: 100%;
}
</style>