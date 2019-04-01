<template>
  <a class="link" :href="href" @click.prevent="onClick">
    <slot/>
  </a>
</template>

<script>
  export default {
    name: 'Link',
    props: {
      href: String,
    },
    methods: {
      onClick () {
        this.$emit('click');
      },
    },
  }
</script>

<style lang="scss">
  .link {
    text-decoration: none;
  }
  .link:visited {
    color: #000000;
  }
</style>
