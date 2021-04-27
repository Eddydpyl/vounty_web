<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-avatar class="v-border ma-3" size="150px" tile>
        <v-img v-if="image" :src="image">
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
          class="v-text fill"
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
            :style="textStyle"
            v-html="text"
          />
        </div>
      </v-avatar>
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
  name: 'VountyAvatar',
  props: {
    size: {
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
