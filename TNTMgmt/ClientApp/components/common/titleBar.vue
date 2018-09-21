<template>
  <div class="page-header page-header-default">
    <div class="breadcrumb-line">
      <ul class="breadcrumb">
        <li>
          <router-link to="/">
            <i class="icon-home2 position-left"></i> {{$t('home')}}
          </router-link>
        </li>
        <li class="active">{{langTitle}}</li>
      </ul>
    </div>
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
    props: ["langTitle"]
  }
</script>
