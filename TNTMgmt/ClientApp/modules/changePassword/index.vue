<template>
  <div>
    <title-bar :langTitle="$t('screen.leadList')"></title-bar>
    <div class="content">
      <div class="panel-heading mb-20">
        <h5 class="panel-title">{{$t('changePassword')}}</h5>
        <div class="heading-elements">
          <router-link to="/" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
      </div>
      <div class="content" v-if="formData">
        <!-- Bordered panel body table -->
        <div class="panel panel-flat">
          <div class="panel-body">
            <div class="form-horizontal">
              <fieldset class="content-group">

                <div :class="`form-group ${errors.has('oldPassword') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('oldPassword')}} *</label>
                  <div class="col-lg-10">
                    <input type="password" name="oldPassword" :placeholder="$t('oldPassword')" :data-vv-as="$t('oldPassword')" v-validate="'required'" class="form-control" v-model="formData.oldPassword">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('newPassword') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('newPassword')}} *</label>
                  <div class="col-lg-10">
                    <input type="password" name="newPassword" :placeholder="$t('newPassword')" :data-vv-as="$t('newPassword')" v-validate="'required'" class="form-control" v-model="formData.newPassword">
                  </div>
                </div>

                <div :class="`form-group ${errors.has('confirmPassword') ? 'has-error' : ''}`">
                  <label class="control-label col-lg-2">{{$t('confirmPassword')}} *</label>
                  <div class="col-lg-10">
                    <input type="password" name="confirmPassword" :placeholder="$t('confirmPassword')" :data-vv-as="$t('confirmPassword')" v-validate="'required'" class="form-control" v-model="formData.confirmPassword">
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="text-right mt-30">
          <router-link to="/" class="btn btn-default">
            {{$t('back')}}
          </router-link>
          <button @click="validateBeforeSubmit" :disabled="errors.items.length > 0 || loading" class="btn btn-primary">{{$t('save')}} <i v-show="loading" class="icon-spinner2 spinner position-left"></i></button>
        </div>
        <!-- /bordered panel body table -->
      </div>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import { mapActions, mapState, mapGetters } from "vuex";
  import store from "./_store";
  import TitleBar from "components/common/titleBar";
  export default {
    components: {
      "title-bar": TitleBar,
    },
    data() {
      return {
        formData: {},
        loading: false
      };
    },
    computed: {
    },
    async created() {
      var _this = this;
      const STORE_KEY = "$_changePassword";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
      await _this.$store.dispatch(
        "common/setTitle",
        _this.$t("screen.changePassword")
      );
    },
    methods: {
      validateBeforeSubmit: _.debounce(async function () {
        var _this = this;
        _this.loading = true;
        await _this.$validator.validateAll().then(async result => {
          if (result) {
            try {
              await _this.$store.dispatch(
                "$_changePassword/changePassword",
                _this.formData
              );
              new PNotify({
                title: '',
                text: _this.$t('changeSuccessfully'),
                addclass: 'bg-success'
              });
              _this.$router.push("/");
            } catch (error) {
              console.log(error);
            }
          }
        });
        _this.loading = false;
      }, 500)
    }
  };
</script>
