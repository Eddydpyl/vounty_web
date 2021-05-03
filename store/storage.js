export const state = () => ({
  getter: null,
  setter: null
})

export const mutations = {
  set (state, data) {
    state.getter = data.getter
    state.setter = data.setter
  }
}

export const actions = {
  link ({ state, commit }) {
    const url = '/storage/'
    return this.$axios.$get(url)
      .then((data) => {
        commit('set', data)
        return data
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          await this.$auth.logout()
          return this.$router.push({
            path: '/login'
          })
        }
        commit('error/set', {
          method: 'storage/link',
          payload: { }
        }, { root: true })
        throw error
      })
  }
}
