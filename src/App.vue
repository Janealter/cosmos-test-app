<template>
  <div id="app">
    <Header v-on:linkClick="updateItems"/>
    <Slider/>
    <Carousel :items="items"/>
  </div>
</template>

<script>
  import { getItems } from './data/actions';

  import Header from './components/Header';
  import Slider from './components/Slider';
  import Carousel from './components/Carousel';


  export default {
    name: 'app',
    components: {
      Header,
      Slider,
      Carousel,
    },
    data () {
      return {
        items: getItems(),
      };
    },
    methods: {
      updateItems () {
        this.items = getItems();
      },
    },
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000000;
  }
</style>
