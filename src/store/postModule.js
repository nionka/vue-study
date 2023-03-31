import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((a,b) => {
                return a[state.selectedSort]?.localeCompare(b[state.selectedSort])
            })
        },
        sortedAndSearchPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, num) {
            state.page = num;
        },
        setSelectedSort(state, sort) {
            state.selectedSort = sort;
        },
        setTotalPage(state, totalPage) {
            state.totalPage = totalPage;
        },
        setSearchQuery(state, search) {
            state.searchQuery = search;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                
                commit('setPosts', response.data)     
            } catch (error) {
                alert(error);
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) { 
            try {
                commit('setPage', state.page + 1)

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                
                commit('setPosts', [ ...state.posts, ...response.data]);   
            } catch (error) {
                alert(error);
            }
        },
    },
    namespaced: true
}