<template>
  <div class="registration w-100">
    <h3 class="text-center">Registration</h3>
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "@/components/Register.vue";

export default {
  name: "registeration",
  components: {
    Register
  }
};
</script>