<template>
  <header class="main-header">
    <Link href="" class="header-link" v-on:click="onLinkClick">Home</Link>
    <Link href="" class="header-link" v-on:click="onLinkClick">Blog</Link>
    <Link href="" class="header-link" v-on:click="onLinkClick">About the tests</Link>
    <Link href="" class="header-link" v-on:click="onLinkClick">Level 1</Link>
    <Link href="" class="header-link" v-on:click="onLinkClick">Contacts</Link>
    <Link href="" class="header-link" v-on:click="onLinkClick">About</Link>
  </header>
</template>

<script>
  import Link from './Link';

  export default {
    name: 'Header',
    components: {
      Link,
    },
    methods: {
      onLinkClick () {
        this.$emit('linkClick');
      },
    },
  }
</script>

<style lang="scss">
  .main-header {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 25px 0;
    @media (max-width: 900px) {
      justify-content: center;
    }
  }
  .header-link {
    margin: 10px 20px;
    text-transform: uppercase;
  }
</style>
