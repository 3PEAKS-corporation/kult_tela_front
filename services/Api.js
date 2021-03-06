export default function(ctx) {
  const axios = ctx.$axios

  this.getImageLink = image_src => {
    if (!image_src.includes('http://'))
      return process.env.API_URL + 'public/images/' + image_src
    else return image_src
  }

  this.Auth = {
    login: user => axios.$post('/auth', user), // user = { email, password }
    createBlankProfile: (data, forceBuy = false) => axios.$put('/auth/signup', data, { params: { forceBuy } }), //user = { email }
    tokenAuth: () => axios.$get('/auth'), // headers must contain token
    isFillAllowed: data => axios.$post('/auth/signup', data),
    fillInfo: data => axios.$post('/auth/signup/fill', data),
    verifyCode: data => axios.$post('/auth/signup/code', data)
  }

  this.Promo = {
    verify: data => axios.$post('/promo', data)
  }

  this.Chat = {
    uploadImage: data => axios.$post('/chat/image', data),
    getAll: () => axios.$get('/chat'),
    getById: id => axios.$get('/chat/' + id),
    getConversationById: id => axios.$get('/chat/' + id + '?c=true')
  }

  this.Password = {
    request: data => axios.$post('/user/password', data),
    verify: data => axios.$post('/user/password/verify', data),
    reset: data => axios.$post('/user/password/reset', data)
  }

  this.User = {
    updateWeight: data => axios.$post('/user/update/weight', data),
    updateWorkout: data => axios.$post('/user/update/workout', data),
    setLastSeenNotification: id =>
      axios.$get('/user/notification/set-last-seen/' + id),
    updateInfo: data => axios.$post('/user/update/info', data)
  }

  this.Plans = {
    getAll: () => axios.$get('/plan/all'),
    getChangePrices: () => axios.$get('/plan/change/price'),
    changePlan: data => axios.$post('/plan/change', data)
  }

  this.Top = {
    allTime: () => axios.$get('/top/all-time'),
    lastMonth: () => axios.$get('/top/last-month')
  }

  this.Food = {
    getDaily: () => axios.$get('/food/daily'),
    getNext: () => axios.$get('/food/next'),
    getTipsVideos: () => axios.$get('/food/tips-videos')
  }

  this.FoodReport = {
    getStatus: () => axios.$get('/user/food/report'),
    send: images => axios.$post('/user/food/report', images)
  }

  this.Workout = {
    get: () => axios.$get('/workout/plan'),
    getPrevious: () => axios.$get('/workout/plan/previous'),
    getNext: () => axios.$get('/workout/plan/next'),
    getLevels: () => axios.$get('/workout/level'),
    setLevels: data => axios.$post('/workout/level', data)
  }

  this.Subscription = {
    extend: data => axios.$post('/user/subscription/extend', data)
  }

  this.Public = {
    getUserById: id => axios.$get('/public/user/' + id)
  }

  this.Request = {
    add: data => axios.$post('/request', data),
    getPrice: () => axios.$get('/request')
  }

  this.Exercise = {
    getById: id => axios.$get('/exercise?id=' + id),
    getAll: () => axios.$get('/exercise')
  }

  this.Support = {
    getAdminId: () => axios.$get('/support')
  }

  this.Tutor = {
    getAll: () => axios.$get('/user/tutor'),
    setTutor: data => axios.$post('/user/tutor', data)
  }
}
