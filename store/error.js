export const state = () => ({
  method: '',
  payload: null
})

export const mutations = {
  set (state, error) {
    state.method = error.method
    state.payload = error.payload
  }
}
