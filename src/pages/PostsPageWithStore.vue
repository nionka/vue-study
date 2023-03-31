<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select
                :model:value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <posts-list
            :posts="sortedAndSearchPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Загрузка...</div>
        
        <div v-intersection="loadMorePosts" class="observer"></div>   <!-- ref="observer" -->
        <!-- <div class="pageNum__conteiner">
            <div
                v-for="page in totalPage"
                :key="page"
                class="pageNum"
                :class="{
                    'current-page': page === this.page
                }"
                @click="changePage(page)"
            >
                {{ page }}
            </div>
        </div> -->
    </div>
</template>

// v-bind:posts = :posts

<script>
import PostForm from '@/components/PostForm.vue'
import PostsList from '@/components/PostsList.vue'
import MySelect from '@/components/ui/MySelect.vue';
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    components: {
        PostForm, PostsList,
        MySelect,
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(postRemove) {
            this.posts = this.posts.filter(post => post.id !== postRemove.id)
        },
        showDialog() {
           this.dialogVisible = true; 
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPost: 'post/sortedPost',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts'
        })
    },
    watch: {
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