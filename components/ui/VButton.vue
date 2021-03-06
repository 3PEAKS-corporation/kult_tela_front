<template>
  <button
    @click="click"
    :style="{ ...indents, ...buttonStyle }"
    :disabled="disabled"
    :class="{
      button: true,
      'button--w100': w100,
      'button--disabled': disabled,
      'button--clear': clearstyle
    }"
  >
    <VH3 v-if="level == 3" :weight="weight" :color="color">
      <slot></slot>
    </VH3>
    <VP v-else-if="level == 'p'" :weight="weight" :color="color">
      <slot></slot>
    </VP>
  </button>
</template>

<script>
import VH3 from '../typography/VH3'
import indents from '../../mixins/indents'

export default {
  props: {
    w100: Boolean,
    weight: String,
    disabled: Boolean,
    bg: String,
    color: String,
    clearstyle: Boolean,
    level: {
      type: String,
      default: '3'
    }
  },
  components: { VH3 },
  mixins: [indents],
  computed: {
    buttonStyle() {
      return {
        background: this.bg
      }
    }
  },
  methods: {
    click(e) {
      if (this.disabled === true) e.preventDefault()
      else this.$emit('click')
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  background: var(--yellow-base);
  padding: var(--space-half) var(--space);
  border-radius: var(--radius-half);
}

.button--w100 {
  width: 100%;
}

.button:active,
.button:hover,
.button:focus {
  box-shadow: 0 3px 0 var(--yellow-trans1);
  transform: translateY(-3px);
}

.button--disabled {
  opacity: 0.3;
  cursor: default;
}

.button--disabled:active,
.button--disabled:hover,
.button--disabled:focus {
  box-shadow: none;
  transform: none;
}

.button--clear {
  border: none;
  color: unset;
  background: unset;
  padding: unset;
}

.button--clear:hover,
.button--clear:focus,
.button--clear:active {
  transform: unset;
  box-shadow: unset;
}

.button h3,
.button p {
  color: var(--grey-base);
  text-align: center;
}
</style>
