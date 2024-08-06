<template>
  <div class="wrapper">
    <button @click="goVueFinderExamplePage">VueFinderExample</button>
    <button @click="goVueFinderExamplePage2">VueFinderExample2</button>
    <button @click="goAboutPage">关于系统</button>
    <RouterView />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {FEATURES, FEATURE_ALL_NAMES} from '../src/features.js';
import {useRouter} from "vue-router";

const router = useRouter()

const goVueFinderExamplePage = () => {
  router.push({
    path:'/VueFinderExample'
  })
}

const goVueFinderExamplePage2 = () => {
  router.push({
    path:'/VueFinderExample2'
  })
}

const goAboutPage = () => {
  router.push({
    path:'/about'
  })
}

</script>

<style>
body {
  margin: 0;
  background: #eeeeee;
}

.wrapper {
  max-width: 800px;
  margin: 80px auto;
}

.btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}
</style>
