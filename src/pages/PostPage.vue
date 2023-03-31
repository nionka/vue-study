<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-focus
            v-model="searchQuery"
            placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
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
import axios from 'axios';
import MySelect from '@/components/ui/MySelect.vue';

export default {
    components: {
        PostForm, PostsList,
        MySelect,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
            ]
        }
    },
    methods: {
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
        async fetchPosts() {
            this.isPostsLoading = true;
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
                
                this.posts = response.data;     
            } catch (error) {
                alert(error);
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() { 
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
                
                this.posts = [ ...this.posts, ...response.data];     
            } catch (error) {
                alert(error);
            }
        },
        // changePage(pageNum) {
        //     this.page = pageNum;
        // }
    },
    mounted() {
        this.fetchPosts();

        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }

        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPage) {
        //         this.loadMorePosts();
        //     }
        // }

        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((a,b) => {
                return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
            })
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page() {
        //     this.fetchPosts()
        // }
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