<template>
  <div class="stripe-container">
    <div id="stripe-element-mount-point" />
    <slot name="stripe-element-errors">
      <div id="stripe-element-errors" role="alert" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'StripeForm',
  data () {
    return {
      loading: false,
      element: null,
      card: null
    }
  },
  computed: {
    form () {
      return document.getElementById('stripe-element-form')
    }
  },
  mounted () {
    const cardOptions = {
      style: {
        base: {
          color: '#fff',
          fontFamily: '"Roboto", sans-serif'
        }
      }
    }
    const elements = this.$stripe.elements({})
    this.element = elements.create('card', cardOptions)
    this.element.mount('#stripe-element-mount-point')
    this.element.on('change', (event) => {
      const displayError = document.getElementById('stripe-element-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
      this.onChange(event)
    })
    this.element.on('blur', this.onBlur)
    this.element.on('click', this.onClick)
    this.element.on('escape', this.onEscape)
    this.element.on('focus', this.onFocus)
    this.element.on('ready', this.onReady)
  },
  methods: {
    /**
     * Submit the element
     * @return {void}
     */
    async submit () {
      try {
        this.$emit('loading', true)
        const { token, error } = await this.$stripe.createToken(this.element)
        if (error) {
          const errorElement = document.getElementById('stripe-element-errors')
          errorElement.textContent = error.message
          this.$emit('error', error)
          return
        }
        this.$emit('token', token)
      } catch (error) {
        this.$emit('error', error)
      } finally {
        this.$emit('loading', false)
      }
    },
    /**
     * Clears the element
     * @return {void}
     */
    clear () {
      this.element.clear()
    },
    /**
     * Destroys the element
     * @return {void}
     */
    destroy () {
      this.element.destroy()
    },
    /**
     * Focuses on the element
     * @return {void}
     */
    focus () {
      // This method will currently not work on iOS 13+ due to a system limitation.
      this.element.focus()
    },
    /**
     * Unmounts the element
     * @return {void}
     */
    unmount () {
      this.element.unmount()
    },
    /**
     * Updates the element
     * @param {string} opts.classes.base The base class applied to the container. Defaults to StripeElement.
     * @param {string} opts.classes.complete The class name to apply when the Element is complete. Defaults to StripeElement--complete.
     * @param {string} opts.classes.empty The class name to apply when the Element is empty. Defaults to StripeElement--empty.
     * @param {string} opts.classes.focus The class name to apply when the Element is focused. Defaults to StripeElement--focus.
     * @param {string} opts.classes.invalid The class name to apply when the Element is invalid. Defaults to StripeElement--invalid.
     * @param {string} opts.classes.webkitAutoFill The class name to apply when the Element has its value autofilled by the browser (only on Chrome and Safari). Defaults to StripeElement--webkit-autofill.
     * @param {Object} opts.style Customize the appearance of this element using CSS properties passed in a Style object.
     * @param {string} opts.value A pre-filled set of values to include in the input (e.g., {postalCode: '94110'}). Note that sensitive card information (card number, CVC, and expiration date) cannot be pre-filled
     * @param {boolean} opts.hidePostalCode Hide the postal code field. Default is false. If you are already collecting a full billing address or postal code elsewhere, set this to true.
     * @param {string} opts.iconStyle Appearance of the icon in the Element. Either solid or default.
     * @param {boolean} opts.hideIcon Hides the icon in the Element. Default is false.
     * @param {boolean} opts.disabled Applies a disabled state to the Element such that user input is not accepted. Default is false.
     */
    update (opts) {
      this.element.update(opts)
    },
    onChange (e) {
      this.$emit('element-change', e)
    },
    onReady (e) {
      this.$emit('element-ready', e)
    },
    onFocus (e) {
      this.$emit('element-focus', e)
    },
    onBlur (e) {
      this.$emit('element-blur', e)
    },
    onEscape (e) {
      this.$emit('element-escape', e)
    },
    onClick (e) {
      this.$emit('element-click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.stripe-container {
  min-height: 22px;
  padding-top: 3px;
}
</style>
