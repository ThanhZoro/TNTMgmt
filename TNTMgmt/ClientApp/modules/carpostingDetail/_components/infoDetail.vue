<template>
  <div>
    <div class="row" style="margin-top: 20px;">
      <div class="col-md-6">
        <p>Tiêu đề: {{detail.postingInfo.detail.title || 'N/A'}}</p>
        <p>Thành phố: {{detail.postingInfo.detail.city || 'N/A'}}</p>
        <p>Địa chỉ: {{detail.postingInfo.detail.address || 'N/A'}}</p>
        <p>Giá: {{detail.postingInfo.detail.priceOrigin || 'N/A'}}</p>
        <p>Xuất sứ: {{detail.postingInfo.detail.madeIn || 'N/A'}}</p>
        <p>Hãng: {{detail.postingInfo.detail.manufacture || 'N/A'}}</p>
        <p>Loại: {{detail.postingInfo.detail.model || 'N/A'}}</p>
        <p>Số chỗ: {{detail.postingInfo.detail.seat || 'N/A'}}</p>
        <p>Màu bên ngoài: {{detail.postingInfo.detail.outsideColor || 'N/A'}}</p>
        <p>Màu bên trong: {{detail.postingInfo.detail.outsideColor || 'N/A'}}</p>
        <p>Nhiên liệu: {{detail.postingInfo.detail.fuel || 'N/A'}}</p>
        <p>Hộp số: {{detail.postingInfo.detail.gearBox || 'N/A'}}</p>
        <p>Trục xe: {{detail.postingInfo.detail.shaftingCar || 'N/A'}}</p>
        <p>Biển số: {{detail.postingInfo.detail.numberPlate || 'N/A'}}</p>
        <p>Số km đã sử dụng: {{detail.postingInfo.detail.kmUsed || 'N/A'}}</p>
        <p>Cửa: {{detail.postingInfo.detail.windows || 'N/A'}}</p>
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
    props: ["detail"]
  };
</script>
