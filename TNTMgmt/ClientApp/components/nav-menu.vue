<template>
  <div class="navbar navbar-inverse">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand" style="font-size:17px;">
        {{companyInfo.companyName || ''}}
        <!--<img src="/assets/images/logo.png" alt="">-->
      </router-link>
      <ul class="nav navbar-nav visible-xs-block">
        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
        <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>
    </div>
    <div class="navbar-collapse collapse" id="navbar-mobile">
      <ul class="nav navbar-nav">
        <li><a @click="toggleSidebar" class="hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown language-switch">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <i class="icon-earth"></i>
            {{ $t(lang) }}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li @click="changeLanguage('vi')"><a> {{ $t('vi') }}</a></li>
            <li @click="changeLanguage('en')"><a> {{ $t('en') }}</a></li>
          </ul>
        </li>
        <li class="dropdown dropdown-user">
          <a class="dropdown-toggle" data-toggle="dropdown">
            <avatar :avatarUrl="currentUser.avatarUrl" :firstChar="currentUser.firstName ? currentUser.firstName.substring(0,1) : ''"></avatar>
            <!--<img src="/assets/images/demo/users/face11.jpg" alt="">-->
            <i class="caret"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <!--<li><a href="#"><i class="icon-user-plus"></i> My profile</a></li>
            <li><a href="#"><i class="icon-coins"></i> My balance</a></li>
            <li><a href="#"><span class="badge bg-teal-400 pull-right">58</span> <i class="icon-comment-discussion"></i> Messages</a></li>-->
            <li>
              <router-link to="/user/change-password">
                <i class="icon-key"></i> {{ $t('changePassword') }}
              </router-link>
            </li>
            <li class="divider"></li>
            <li><router-link :to="`/user/info`"><i class="icon-cog5"></i> {{ $t('accountSettings') }}</router-link></li>
            <li><a href="#" @click="switchCompany"><i class="icon-rotate-cw3"></i> {{ $t('switchCompany') }}</a></li>
            <li><a href="#" @click="signOut"><i class="icon-switch2"></i> {{ $t('logout') }}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  export default {
    data() {
      return {};
    },
    methods: {
      changeLanguage(command) {
        var _this = this;
        _this.$store.dispatch("language/setLang", command);
      },
      toggleSidebar() {
        var _this = this;
        _this.$store.dispatch("language/setToggle");
      },
      signOut() {
        var _this = this;
        _this.$store.dispatch("auth/signOut");
      },
      switchCompany() {
        var _this = this;
        _this.$store.dispatch("auth/switchCompany");
      }
    },
    computed: {
      ...mapState({
        lang: state => state.language.language,
        companyInfo: state => state.common.companyInfo
      }),
      ...mapGetters({
        currentUser: "common/currentUser"
      })
    }
  };
</script>
