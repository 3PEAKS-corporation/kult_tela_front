<template>
  <div>
    <VPageHeading button>
      Физические данные
      <template v-slot:info>
        Чтобы план тренировок был подобран корректно, выберите ваш уровень
        физической подготовки и уровень избыточного веса.
      </template>
    </VPageHeading>
    <VTipSmall mb="var(--space-half)">
      <VP color="var(--grey-light3)">
        Изменить данные физподготовки и лишнего веса вы сможете только в конце
        месяца службы или написав в техподдержку.
      </VP>
    </VTipSmall>
    <div v-if="levels">
      <div>
        <VPageHeading level="3">
          Физическая подготовка
          <template v-slot:info>
            Все закрытые уровни открываются последовательно каждый новый месяц
            службы.
          </template>
        </VPageHeading>
        <ul class="physical">
          <li
            @click="setPhyicalLevel(item)"
            :class="{
              'physical-item': true,
              'physical-item--disabled': item.disabled,
              'physical-item--selected': item.id === set_levels.physical_level
            }"
            v-for="item in levels.physical"
          >
            <div class="physical-item__top">
              <VH3>{{ item.name }}</VH3>
              <div class="workout__title__type">
                <div
                  v-if="item.types.home"
                  class="workout__title__type"
                  :class="!item.types.home ? 'svg--disabled' : ''"
                >
                  <VP color="var(--yellow-base)">Дома</VP>
                  <svg
                    width="24"
                    height="23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.503 11.312L12.6.252A.845.845 0 0012 0a.835.835 0 00-.599.252L.498 11.312c-.318.322-.498.76-.498 1.217 0 .948.76 1.72 1.694 1.72h1.15v7.891c0 .476.378.86.846.86h6.616v-6.019h2.965V23h7.04a.853.853 0 00.847-.86v-7.892h1.149c.45 0 .881-.18 1.199-.505a1.74 1.74 0 00-.003-2.431z"
                      fill="#EFF721"
                    />
                  </svg>
                </div>
                <div
                  style="margin-left: var(--space-third)"
                  class="workout__title__type"
                  :class="!item.types.gym ? 'svg--disabled' : ''"
                >
                  <VP>В зале</VP>
                  <svg
                    width="23"
                    height="23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.263 20.642a.463.463 0 01-.023.651l-1 .935a.46.46 0 01-.649-.024l-5.818-6.27a.463.463 0 01.023-.652l1-.933a.458.458 0 01.65.024l5.817 6.269zm7.424-11.799a.463.463 0 01-.023.651L9.375 15.37a.46.46 0 01-.649-.024l-1.5-1.62a.463.463 0 01.023-.65L13.536 7.2a.458.458 0 01.648.023l1.503 1.62zm-5.285 9.8a.464.464 0 01-.023.65l-1 .935a.458.458 0 01-.65-.024l-5.815-6.27a.463.463 0 01.023-.652l.998-.933a.46.46 0 01.65.023l5.817 6.27zm9.69-9.575a.463.463 0 01-.025.651l-1 .934a.46.46 0 01-.65-.023l-5.816-6.27a.463.463 0 01.023-.65l1.003-.937a.458.458 0 01.649.024l5.815 6.271zm2.135-1.996a.464.464 0 01-.023.651l-.998.934a.458.458 0 01-.649-.023l-5.815-6.272a.464.464 0 01.023-.652l.999-.935a.46.46 0 01.648.023l5.815 6.274z"
                      fill="#EFF721"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <VP>{{ item.description }}</VP>
            <div v-if="!item.disabled" class="physical-item__choose">
              <VButton
                :class="{
                  'physical-item__choose__btn': true,
                  'physical-item__choose__btn--selected':
                    item.id === set_levels.physical_level
                }"
              >
                {{
                  item.id === set_levels.physical_level ? 'Выбрано' : 'Выбрать'
                }}
              </VButton>
            </div>
          </li>
        </ul>
      </div>
      <div id="overweight">
        <VPageHeading level="3">
          Избыточный вес
        </VPageHeading>
        <ul>
          <li
            @click="setOverweightLevel(item)"
            :class="{
              'physical-item': true,
              'physical-item--disabled': item.disabled,
              'physical-item--selected': item.id === set_levels.overweight_level
            }"
            v-for="item in levels.overweight"
          >
            <div class="physical-item__top">
              <VH3>{{ item.name }}</VH3>
            </div>
            <VP>{{ item.description }}</VP>
            <div v-if="!item.disabled" class="physical-item__choose">
              <VButton
                :class="{
                  'physical-item__choose__btn': true,
                  'physical-item__choose__btn--selected':
                    item.id === set_levels.overweight_level
                }"
              >
                {{
                  item.id === set_levels.overweight_level
                    ? 'Выбрано'
                    : 'Нажмите для выбора'
                }}
              </VButton>
            </div>
          </li>
        </ul>
      </div>

      <div id="schedule">
        <VPageHeading level="3">
          График тренировок
          <template v-slot:info>
            Выберите по какому графику вам будет удобнее проводить тренировки
          </template>
        </VPageHeading>
        <ul>
          <li
            @click="setSchedule(item.value)"
            :class="{
              'physical-item': true,
              'physical-item--selected': item.value === scheduleType
            }"
            :key="item.value"
            v-for="item in scheduleTypes"
          >
            <div class="physical-item__top">
              <VH3>{{ item.name }}</VH3>
            </div>
            <VP>{{ item.description }}</VP>
            <div class="physical-item__choose">
              <VButton
                :class="{
                  'physical-item__choose__btn': true,
                  'physical-item__choose__btn--selected':
                    item.value === scheduleType
                }"
              >
                {{
                  item.value === scheduleType
                    ? 'Выбрано'
                    : 'Нажмите для выбора'
                }}
              </VButton>
            </div>
          </li>
        </ul>
      </div>

      <VDivider
        mt="var(--space
"
      />
      <VButton
        id="accept-button"
        :disabled="!validate"
        mt="var(--space)"
        w100
        @click="setLevels"
      >
        Подтвердить
      </VButton>
      <VP
        v-show="!validate"
        mt="var(--space-third)"
        style="text-align: center"
        color="var(--red-base)"
      >
        Форма заполнена не полностью
      </VP>
    </div>
  </div>
</template>

<script>
import { VDivider, VTipSmall } from '../../components/'
import scrollTo from '../../mixins/scrollTo'

export default {
  mixins: [scrollTo],
  middleware: ['minPlan_1', 'requireSub'],
  components: { VDivider, VTipSmall },
  data() {
    return {
      levels: null,
      set_levels: {
        overweight_level: null,
        physical_level: null
      },
      scheduleTypes: [
        {
          value: 'odd',
          name: 'Нечётные дни',
          description: 'Понедельник, среда, пятница'
        },
        {
          value: 'even',
          name: 'Чётные дни',
          description: 'Вторник, четверг, суббота'
        }
      ],
      scheduleType: null
    }
  },
  computed: {
    validate() {
      return (
        typeof this.set_levels.physical_level === 'number' &&
        typeof this.set_levels.overweight_level === 'number' &&
        typeof this.scheduleType === 'string'
      )
    }
  },
  methods: {
    setSchedule(val) {
      this.scheduleType = val
      this.scrollTo('#accept-button', 400)
    },
    setPhyicalLevel(item) {
      if (!item.disabled) {
        this.set_levels.physical_level = item.id
        this.scrollTo('#overweight', 400)
      }
    },
    setOverweightLevel(item) {
      this.set_levels.overweight_level = item.id
      this.scrollTo('#schedule', 300)
    },
    async setLevels() {
      const levels = this.set_levels
      if (this.validate) {
        try {
          const payload = { ...levels, schedule_type: this.scheduleType }
          await this.$api.Workout.setLevels(payload)
          await this.$store.commit('user/UPDATE_USER', { workout: levels })
          await this.$router.push('/workout/personal')
        } catch (e) {
        }
      }
    }
  },
  async asyncData({ store, redirect, app }) {
    const user = store.state.user.user
    if (
      typeof user.workout.overweight_level !== 'number' ||
      typeof user.workout.physical_level !== 'number'
    ) {
      try {
        const { data: levels } = await app.$api.Workout.getLevels()
        return {
          levels
        }
      } catch (e) {
        redirect('/')
      }
    } else {
      if (store.state.workout.workout) {
        redirect('/workout/personal')
      } else redirect('/workout')
    }
  }
}
</script>

<style scoped>
.physical {
}

.workout__title__type {
  display: flex;
  align-items: center;
}

.workout__title__type p {
  color: var(--yellow-base);
  margin-right: var(--space-third);
}

.physical-item {
  padding: var(--space-half);
  border-radius: var(--radius);
  border: solid 2px var(--yellow-trans4);
  cursor: pointer;
  background: var(--yellow-trans4);
  margin-bottom: var(--space-half);
}

.physical-item p {
  line-height: 1.3;
  font-weight: 300;
}

.physical-item > div {
  margin-bottom: var(--space-third);
}

.physical-item__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.physical-item__choose {
  margin: var(--space-third) 0 0 0 !important;
  display: flex;
  justify-content: flex-end;
}

.physical-item__choose__btn {
  padding: var(--space-third) var(--space);
  color: var(--yellow-base);
  border: 2px solid var(--yellow-base);
  background: none !important;
}

.physical-item__choose__btn >>> h3 {
  color: yellow !important;
  font-size: 19px;
}

.physical-item__choose__btn--selected {
  background: var(--yellow-base) !important;
}

.physical-item__choose__btn--selected >>> h3 {
  color: var(--grey-base) !important;
}

.svg--disabled {
  opacity: 0.2;
}

.physical-item__top svg:first-child {
  margin-right: var(--space-third);
}

.physical-item:hover,
.physical-item:active,
.physical-item:focus {
  border: 2px solid var(--yellow-trans2);
}

.physical-item--disabled {
  background: var(--white-trans4);
  cursor: default;
  border-color: var(--white-trans4);
}

.physical-item--disabled h3 {
  color: var(--grey-light2);
}

.physical-item--disabled p {
  color: var(--grey-light2);
  font-weight: 400;
}

.physical-item--disabled svg path {
  fill: var(--grey-light2);
}

.physical-item--disabled:hover,
.physical-item--disabled:active,
.physical-item--disabled:focus {
  border-color: var(--white-trans4);
}

.physical-item--selected {
  border-color: var(--yellow-base);
}

.physical-item--selected:hover,
.physical-item--selected:active,
.physical-item--selected:focus {
  border-color: var(--yellow-base);
}
</style>
