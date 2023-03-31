<template>
  <div class="navbar">
        <div @click="$router.push('/')" class="title">Vue 3</div>
        <div class="links">
            <my-button @click="$router.push('/')">На главную</my-button>
            <router-link to="/">На главную</router-link>
            <router-link to="/posts">Посты</router-link>
            <router-link to="/about">О сайте</router-link>
            <router-link to="/store">Store</router-link>
            <router-link to="/composition">CompositionAPI</router-link>
        </div>   
  </div>
</template>

<script>
import MyButton from './ui/MyButton.vue'
export default {
  components: { MyButton },

}
</script>

<style scoped>
.navbar {
    height: 50px;
    width: 100%;
    background-color: rgb(221, 248, 248);
    box-shadow: 2px 2px 4px  gray;

    display: flex;
    align-items: center;
    padding: 10px;
}

.title {
    margin-right: 15px;
    color: teal;
    font-weight: bold;
    font-size: 30px;
}

.links {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
    color: teal !important;
}

</style>