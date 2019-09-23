<template>
  <div class="rating-container">
    <div class="rating" :style="ratingSize">
      <div class="rating-indicator" :style="indicatorWidth">
        <img alt="Rating color" :style="ratingSize" src="../../assets/rating_color.png">
      </div>
      <img alt="Rating gray" :style="ratingSize" src="../../assets/rating_gray.png">
    </div>
    <div :style="fontSize" class="total-ratings">{{ totalRatings }}</div>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    totalRatings: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    maxRating: {
      type: Number,
      default: 5
    },
    imageWidth: {
      type: Number,
      default: 250
    },
    imageHeight: {
      type: Number,
      default: 44
    },
    scale: {
      type: Number,
      default: 1
    },
    textSize: {
      type: Number,
      default: 20
    }
  },
  computed: {
    indicatorWidth() {
      return { width: `${(this.rating / this.maxRating) * 100}%` };
    },
    ratingSize() {
      return {
        width: this.imageWidth * this.scale + "px",
        height: this.imageHeight * this.scale + "px"
      };
    },
    fontSize() {
      return {
        fontSize: this.textSize + "px"
      };
    }
  }
};
</script>

<style scoped lang="scss">
.rating-container {
  display: inline-flex;
  align-items: flex-start;
}
.rating {
  width: 100%;
  position: relative;
  .rating-indicator {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
.total-ratings {
  padding: 2px 0 0 3px;
  color: gray;
  font-weight: 800;
  display: inline;
}
</style>
