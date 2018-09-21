<template>
  <div>
    <center v-if="!formData">
      <i class="icon-spinner2 spinner position-left" style="font-size: 50px; " v-if="!data.data"></i>
      <div v-else style="float:right">
        <div v-if="!data.total">{{$t('noData')}}</div>
        <div v-else>{{$t('have')}} {{data.total}} {{descriptionTotal}}</div>
      </div>
    </center>
    <center>
      <i class="icon-spinner2 spinner position-left" style="font-size: 50px;" v-if="!data"></i>
    </center>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      
    },
    computed: {
    },
    async created() {

    },
    mounted() {
    },
    props: ["data", "descriptionTotal", "formData"]
  }
</script>
