<template>
  <main style="" class="overflow-x-hidden">
    <div class="relative h-72 lg:h-full">
      <div class="bg-violet"></div>
      <div class="w-[375px] h-60 absolute top-[25px] lg:top-52">
        <div class="bg-card-back absolute">
          <p class="absolute m-0 top-[43%] right-[18%] text-white text-small">
            {{ securityNumber || "123" }}
          </p>
        </div>
        <div class="bg-card-front absolute">
          <img class="absolute top-5 left-5" :src="img" width="60" height="60" loading="lazy" alt="logo-card" />
          <div class="absolute top-[55%] left-[10%] w-[81%]">
            <p class="text-center m-0 text-lg tracking-widest text-white">
              {{ cardNumber ? cardNumber : "0000 0000 0000 0000" }}
            </p>
            <div class="flex justify-between text-small tracking-widest">
              <p class="mt-2 tracking-widest text-white">{{ name?.toUpperCase() || "Jhon Doe" }}</p>
              <p class="mt-2 tracking-widest text-white">{{ yy || "00" }}/{{ mm || "00" }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-5 lg:absolute md:top-[25%] md:right-[20%] lg:top-[25%] lg:right-[20%]">
      <Form @valuesChanged="applyChanges" />
    </div>
  </main>
</template>
<script setup>
import { ref, toRef } from "vue"
import img from "./assets/card-logo.svg"
import backcard from "./assets/bg-card-back.png"
import frontcard from "./assets/bg-card-front.png"
import bgdesktop from "./assets/bg-main-desktop.png"
import bgmobile from "./assets/bg-main-mobile.png"
import Form from "./components/Form.vue"

const applyChanges = (formData, nroT) => {
  const { name: nombre, mm: mes, yy: anio, cvc } = formData
  securityNumber.value = cvc
  name.value = nombre
  cardNumber.value = nroT
  mm.value = mes
  yy.value = anio
}

const securityNumber = ref(null)
const cardNumber = ref(null)
const name = ref(null)
const mm = ref(null)
const yy = ref(null)
</script>
<style scoped>
.bg-violet {
  height: 33vh;
  width: 100vw;
  background-image: url("./assets/bg-main-mobile.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.bg-card-back {
  max-height: 160px;
  height: 100%;
  max-width: 300px;
  width: 100%;
  top: 20px;
  right: 5px;
  background-image: url("./assets/bg-card-back.png");
  background-size: 95%;
  background-repeat: no-repeat;
}

.bg-card-front {
  max-height: 160px;
  height: 100%;
  max-width: 290px;
  width: 100%;
  top: 110px;
  left: 20px;
  background-image: url("./assets/bg-card-front.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

@media (min-width: 1024px) {
  .bg-violet {
    height: 100vh;
    width: 350px;
    background-image: url("./assets/bg-main-desktop.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .bg-card-back {
    max-height: 160px;
    height: 100%;
    max-width: 300px;
    width: 100%;
    top: 130px !important;
    right: -120px !important;
    background-size: 95%;
    background-repeat: no-repeat;
  }
  .bg-card-front {
    max-height: 160px;
    height: 100%;
    max-width: 290px;
    width: 100%;
    top: -60px;
    left: 125px;
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
</style>
