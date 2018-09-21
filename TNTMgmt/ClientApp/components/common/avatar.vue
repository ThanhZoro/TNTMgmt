<template>
  <a v-if="!avatarUrl" style="position:inherit" :class="`custorm-border-login btn btn-rounded btn-flat bg-${randomColor(firstChar)} border-${randomColor(firstChar)} border-2`">
    <span class="custorm-word-login">{{stripUnicode(firstChar).toUpperCase()}}</span>
  </a>
  <img v-else :src="avatarUrl" alt="" style="width: 35px;height: 35px;border-radius: 50%;">
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      randomColor(char) {
        var _this = this;
        var colors = ["primary", "danger", "success", "warning", "info", "pink", "violet", "purple", "indigo", "blue", "teal", "green", "orange", "brown", "grey", "slate"];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        var item = colors[Math.floor((Math.abs(possible.indexOf(_this.stripUnicode(char))) / possible.length) * colors.length)];
        return item;
      },
      stripUnicode(slug) {
        slug = slug.toLowerCase();
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        slug = slug.replace(/ /gi, "-");
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
      }
    },
    computed: {
    },
    async created() {


    },
    mounted() {
    },
    props: ["avatarUrl", "firstChar"]
  }
</script>
