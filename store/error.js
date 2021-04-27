export const state = () => ({
  message: '',
  data: null
})

export const mutations = {
  set (state, error) {
    state.message = error.message
    state.data = error.data
  }
}
