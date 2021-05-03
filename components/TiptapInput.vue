<template>
  <tiptap-vuetify
    v-model="text"
    :placeholder="placeholder"
    :extensions="extensions"
  />
</template>

<script>
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule } from 'tiptap-vuetify'

export default {
  name: 'TiptapInput',
  components: {
    'tiptap-vuetify': TiptapVuetify
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      extensions: [
        Bold,
        Italic,
        Strike,
        Underline,
        Link,
        Blockquote,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Paragraph,
        HorizontalRule,
        HardBreak
      ]
    }
  },
  computed: {
    text: {
      get () {
        return this.value
      },
      set (text) {
        this.$emit('input', text)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .theme--dark.v-btn.v-btn--icon {
  color: #000;
  display: inline;
  margin: 5px;
  min-height: 22px;
  padding: 0;
  white-space: normal;
}
</style>
