<template>
  <div style="width: 100%">
    <VButton
      v-if="showInstallBanner"
      @click="install"
      mt="var(--space-half)"
      w100
    >
      Добавить на рабочий стол
    </VButton>
    <VButton
      v-else
      @click="$router.push('/how-to-install')"
      mt="var(--space-half)"
      w100
    >
      Как сохранить приложение?
    </VButton>
  </div>

</template>
<script>
  import VButton from '../ui/VButton'

  let installEvent
  export default {
    components: { VButton },
    data() {
      return {
        showInstallBanner: false
      }
    },
    mounted() {
      window.addEventListener('beforeinstallprompt', e => {
        e.preventDefault()
        installEvent = e
        this.showInstallBanner = true
      })

      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.showInstallBanner = false
      }
    },
    methods: {
      install() {
        if (installEvent) {
          installEvent.prompt()
          installEvent.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
              this.showInstallBanner = false
            } else {
            }
          })
        } else this.showInstallBanner = false
      }
    }
  }
</script>
