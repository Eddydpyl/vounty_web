<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-img v-if="image" :src="image" :height="height">
        <v-fade-transition>
          <div
            v-if="hover && editable"
            class="d-flex transition-fast-in-fast-out black v-card--reveal display-3 white--text pointer fill"
            @click="$refs.imageInput.click()"
          >
            <v-icon large>
              mdi-camera
            </v-icon>
          </div>
        </v-fade-transition>
      </v-img>
      <div
        v-else
        :height="height"
        class="v-text v-border fill"
        :style="textStyle"
      >
        <div
          v-if="hover && editable"
          class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text pointer justify-center fill"
          @click="$refs.imageInput.click()"
        >
          <v-icon large>
            mdi-camera
          </v-icon>
        </div>
        <p
          v-else
          class="centered-text"
          v-html="text"
        />
      </div>
    </v-hover>
    <input
      ref="imageInput"
      type="file"
      accept="image/*"
      style="display: none;"
      @change="$emit('change', $event)"
    >
  </div>
</template>

<script>
export default {
  name: 'VountyBanner',
  props: {
    height: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: ''
    }
  },
  computed: {
    textStyle () {
      return {
        height: this.height,
        position: 'relative',
        'font-size': this.fontSize
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.centered-text {
  cursor: default;
  margin-right: -50%;
  position: absolute;
  text-align: center;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
</style>
