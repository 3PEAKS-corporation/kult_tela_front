export const strict = false

export const actions = {
  async nuxtClientInit({ commit, getters, dispatch }, ctx) {
    const token = getters['auth/GET_TOKEN']
    if (token) {
      try {
        const { data } = await ctx.app.$api.Auth.tokenAuth()
        await commit('user/SET_USER', data.user)
        await commit('auth/SET_AUTHENTICATED')
      } catch (err) {
        if (!err.response) {
          dispatch(
            'error/SET_ERROR',
            'Отсутствует подключение к серверу, попробуйте позднее'
          )
        } else await dispatch('auth/LOGOUT')
      }
    }
  }
}
