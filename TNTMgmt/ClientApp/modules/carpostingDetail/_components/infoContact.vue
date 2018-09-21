<template>
  <div>
    <div class="row" style="margin-top: 20px;">
      <div class="col-md-12">
        <p>Tên: {{contact.postingInfo.detail.contact.name  || 'N/A'}}</p>
        <p>Số điện thoại: {{contact.postingInfo.detail.contact.phones.join(' - ')  || 'N/A'}}</p>
        <p>Email: {{contact.postingInfo.detail.contact.email  || 'N/A'}}</p>
        <p>Thành phố: {{contact.postingInfo.detail.contact.city  || 'N/A'}}</p>
        <p>Quận/Huyện: {{contact.postingInfo.detail.contact.district  || 'N/A'}}</p>
        <p>Địa chỉ: {{contact.postingInfo.detail.contact.address  || 'N/A'}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    computed: {
    },
    methods: {
    },
    props: ["contact"]
  };
</script>
