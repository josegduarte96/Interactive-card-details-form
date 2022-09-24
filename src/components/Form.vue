<template>
  <section class="p-2 flex justify-center">
    <form
      v-if="!isValidForm"
      @submit.prevent="onSubmit"
      class="flex flex-col gap-4 w-[350px] md:w-[370px] xl:w-[370px]"
    >
      <div>
        <label class="text-very-dark-violet font-bold text-sm tracking-widest" for="cardName">CARDHOLDER NAME</label>
        <input
          name="cardName"
          v-model="formData.name"
          class="w-full mt-1 rounded-md p-3 placeholder:text-gray-400 focus:ring-0 focus:border-violet-600"
          type="text"
          placeholder="e.g. Jose Duarte"
          :class="v$.name.$errors.length ? 'border-red-500' : ''"
        />
        <span class="text-red-600" v-for="error in v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div>
        <label class="text-very-dark-violet font-bold text-sm tracking-widest" for="cardNumber">CARD NUMBER</label>
        <input
          name="cardNumber"
          v-model="card"
          class="w-full mt-1 rounded p-3 placeholder:text-gray-400 focus:ring-0 focus:border-violet-600"
          :class="v$.cardNumber.$errors.length ? 'border-red-500' : ''"
          type="text"
          maxlength="19"
          placeholder="e.g. 1234 5678 9123 0000"
        />

        <span class="text-red-600" v-for="error in v$.cardNumber.$errors" :key="error.$uid">{{ error.$message }}</span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div class="">
          <label class="text-very-dark-violet text-sm tracking-widest font-bold" for="vto">EXP. DATE(MM/YY)</label>
          <div class="flex flex-row gap-2 mt-1">
            <input
              name="vto"
              v-model="formData.mm"
              class="placeholder:text-gray-400 focus:ring-0 focus:border-violet-600 w-full rounded"
              :class="v$.mm.$errors.length ? 'border-red-500' : ''"
              type="text"
              placeholder="MM"
              maxlength="2"
            />

            <input
              name="vto"
              v-model="formData.yy"
              class="placeholder:text-gray-400 focus:ring-0 focus:border-violet-600 w-full rounded"
              :class="v$.yy.$errors.length ? 'border-red-500' : ''"
              type="text"
              placeholder="YY"
              maxlength="2"
            />
          </div>
          <span class="text-red-600" v-if="[...v$.yy.$errors, ...v$.mm.$errors].length">{{
            [...v$.yy.$errors, ...v$.mm.$errors][0].$message
          }}</span>
        </div>
        <div class="">
          <label class="text-very-dark-violet text-sm tracking-widest font-bold" for="cvc">CVC</label>
          <input
            name="cvc"
            v-model="formData.cvc"
            :class="v$.cvc.$errors.length ? 'border-red-500' : ''"
            class="placeholder:text-gray-400 focus:ring-0 focus:border-violet-600 w-full mt-1 rounded"
            type="text"
            maxlength="3"
            placeholder="e.g. 123"
          />
          <span class="text-red-600" v-for="error in v$.cvc.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
      </div>
      <button
        type="submit"
        class="rounded-lg transition ease-in-out hover:bg-violet-600 bg-very-dark-violet text-white h-14"
      >
        Confirm
      </button>
    </form>
    <div v-else class="w-[370px] transition-all ease-in lg:w-[390px] flex flex-col justify-center items-center">
      <img height="80" width="80" :src="img" alt="icon-picture-check" />
      <h1 class="text-2xl p-1">THANK YOU!</h1>
      <p class="text-gray-400 p-1">We've added your card details.</p>
      <button
        @click="resetValues"
        type="submit"
        class="self-stretch mt-2 rounded-lg transition ease-in-out hover:bg-violet-600 bg-very-dark-violet text-white h-12"
      >
        Continue
      </button>
    </div>
  </section>
</template>
<script setup>
import { computed, reactive, ref, watch } from "vue"
import useVuelidate from "@vuelidate/core"
import img from "@/assets/icon-complete.svg"
import { required, helpers, alpha, numeric, minLength, minValue, maxValue } from "@vuelidate/validators"

const onSubmit = async () => {
  isValidForm.value = await v$.value.$validate()
}

const resetValues = () => {
  formData.name = null
  formData.cardNumber = null
  formData.mm = null
  formData.yy = null
  formData.cvc = null
  isValidForm.value = false
  cardRef.value = null
  v$.value.$reset()
}

const emits = defineEmits(["valuesChanged"])
const isValidForm = ref(false)

const isCardNumberValid = (val) => /^\d*\.?\d*$/.test(val)
const cardRef = ref(null)
const formData = reactive({
  name: null,
  cardNumber: null,
  mm: null,
  yy: null,
  cvc: null,
})

watch(formData, (val) => {
  emits("valuesChanged", val, card.value)
})

const card = computed({
  get() {
    return cardRef.value
  },
  set(val) {
    if (val.length == 16) {
      cardRef.value = val.match(/.{4}/g)?.join(" ")
      formData.cardNumber = val
      return
    } else {
      cardRef.value = val.split("")?.join("").match(/[0-9]/g).join("")
      formData.cardNumber = cardRef.value
    }
  },
})

const rules = computed(() => {
  return {
    name: { required },
    cardNumber: { required, isCardNumberValid: helpers.withMessage(" Only numbers!!", isCardNumberValid) },
    mm: { required, numeric, minValue: minValue(1), maxValue: maxValue(12), minLength: minLength(2) },
    yy: { required, numeric, minValue: minValue(15), minLength: minLength(2) },
    cvc: { required, numeric, minLength: minLength(3) },
  }
})
const v$ = useVuelidate(rules, formData)
</script>

<style scoped>
form {
  max-width: 500px;
}
</style>
