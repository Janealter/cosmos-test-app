<template>
  <div class="carousel">
    <swiper v-if="!isUpdating" :options="swiperOptions" v-on:ready="onSwiperReady" :key="id">
      <div class="swiper-pagination" slot="pagination"></div>
      <swiperSlide class="swiper-slide" v-for="item in items" :key="item.id">
        <h2>{{ item.title }}</h2>
        <img :src="item.imageUrl" alt="slide image">
        <p>{{ item.description }}</p>
        <a class="read-more-btn" :href="item.url">Read more</a>
      </swiperSlide>
    </swiper>
    <div class="loader" v-if="isUpdating">
      <div class="loader-animation"><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  const screenWidths = {
    small: 600,
    medium: 1200,
  };

  const timeoutForAutoSlidingInMS = 60000;
  const timeoutForUpdatingSwiperInMS = 1000;

  export default {
    name: 'Carousel',
    components: {
      swiper,
      swiperSlide,
    },
    props: {
      items: Array,
    },
    watch: {
      items () {
        this.updateSwiper();
      },
    },
    data () {
      return {
        id: 0,
        swiper: null,
        timeoutForAutoSliding: null,
        isUpdating: false,
        swiperOptions: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            [screenWidths.small]: {
              slidesPerView: 1,
            },
            [screenWidths.medium]: {
              slidesPerView: 2,
            },
          },
        },
      };
    },
    methods: {
      updateSwiper () {
        this.isUpdating = true;
        const updatingTimeout = setTimeout(() => {
          // Change id causes update swiper
          this.id = Math.floor(Math.random() * 1000);
          this.isUpdating = false;
          clearTimeout(updatingTimeout);
        }, timeoutForUpdatingSwiperInMS);
      },
      onSwiperReady (swiper) {
        this.swiper = swiper;
      },
      onMouseMove () {
        if (!this.swiper.destroyed) {
          this.swiper.autoplay.stop();
          this.swiper.slideToClosest(300);
          clearTimeout(this.timeoutForAutoSliding);
          this.setTimeoutForAutoSliding();
        }
      },
      setTimeoutForAutoSliding () {
        this.timeoutForAutoSliding = setTimeout(() => {
          this.swiper.autoplay.start();
        }, timeoutForAutoSlidingInMS);
      },
    },
    mounted () {
      this.setTimeoutForAutoSliding();
      document.addEventListener('mousemove', this.onMouseMove);
    },
    destroyed() {
      document.removeEventListener('mousemove', this.onMouseMove);
    }
  }
</script>

<style lang="scss">
  $yellow: #eab301;

  .carousel {
    padding: 10px;

    & p {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      color: grey;
      flex-grow: 1;
    }
  }
  .swiper-container {
    display: flex;
    flex-direction: column-reverse;
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .swiper-pagination {
    position: static;
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    background-color: $yellow;
    border-radius: 50%;
    opacity: 1;
  }
  .swiper-pagination-bullet-active::after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    transform: translate(50%, 50%);
    background-color: #9c9c9c;
    border-radius: 50%;
  }
  .read-more-btn {
    display: inline-block;
    padding: 10px;
    border-radius: 4px;
    background-color: $yellow;
    color: white;
    text-decoration: none;
  }
  .loader {
    width: 100%;
    height: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader-animation {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;

    & div {
      display: inline-block;
      position: absolute;
      left: 6px;
      width: 13px;
      background: $yellow;
      animation: loader-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }

    & div:nth-child(1) {
      left: 6px;
      animation-delay: -0.24s;
    }

    & div:nth-child(2) {
      left: 26px;
      animation-delay: -0.12s;
    }

    & div:nth-child(3) {
      left: 45px;
      animation-delay: 0s;
    }
  }
  @keyframes loader-animation {
    0% {
      top: 6px;
      height: 51px;
    }
    50%, 100% {
      top: 19px;
      height: 26px;
    }
  }
</style>
