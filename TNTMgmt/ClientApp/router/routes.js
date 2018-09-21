import HomePage from '@/views/homePage'
import CompanyInfo from '@/views/companyInfo'
import UserList from '@/views/userList'
import LeadList from '@/views/leadList'
import CreateUser from '@/views/createUser'
import UpdateUser from '@/views/updateUser'
import EditLead from '@/views/editLead'
import ChangePassword from '@/views/changePassword'
import Ga from '@/views/ga'
import EditTrackingDisconnectGa from '@/views/editTrackingDisconnectGa'
import EditTrackingConnectGa from '@/views/editTrackingConnectGa'
import GaInfo from '@/views/gaInfo'
import editConversion from '@/views/editConversion'
import EditFormTracking from '@/views/editFormTracking'
import EditCallTracking from '@/views/editCallTracking'
import EditQRCode from '@/views/editQRCode'
import EditTicketVoucher from '@/views/editTicketVoucher'
import ImportLead from '@/views/importLead'
import UserInfo from '@/views/userInfo'
import EditAccount from '@/views/editAccount'
import SurveyList from '@/views/surveyList'
import EditSurveyName from '@/views/editSurveyName'
import EditSurvey from '@/views/editSurvey'
import SurveyDetail from '@/views/surveyDetail'
import SurveyLead from '@/views/surveyLead'
import AssignmentPlanEdit from '@/views/assignmentPlanEdit'
import AssignmentPlanList from '@/views/assignmentPlanList'
import Page404 from '@/views/page404'
import MasterData from '@/views/masterData'
import Settings from '@/views/settings'
import ConfigSurvey from '@/views/configSurvey'
import ConfigSyncData from '@/views/configSyncData'
import ConfigConnectSMS from '@/views/configConnectSMS'
import ConfigConnectEDM from '@/views/configConnectEDM'
import ConfigConnectVoIP from '@/views/configConnectVoIP'
import ConfigSystemEmail from '@/views/configSystemEmail'
import LeadGeneralInfo from '@/views/leadGeneralInfo'
import LeadMoreInfo from '@/views/leadMoreInfo'
import History from '@/views/history'
import Contact from '@/views/contact'
import EditContact from '@/views/editContact'
import ChatLead from '@/views/chatLead'
import ProductCategoryList from '@/views/productCategoryList'
import EditProductCategory from '@/views/editProductCategory'
import ProductItemList from '@/views/productItemList'
import EditProductItem from '@/views/editProductItem'
import AccessRightCreate from '@/views/accessRightCreate'
import AccessRightEditDelete from '@/views/accessRightEditDelete'
import SOHeaderList from '@/views/soHeaderList'
import EditSO from '@/views/editSO'
import Team from '@/views/team'
import EditTeam from '@/views/editTeam'
import TeamUser from '@/views/teamUser'
import UserTeam from '@/views/userTeam'
import Carposting from '@/views/carposting'
import CarpostingDetail from '@/views/carpostingDetail'
import AccessRightDetail from '@/views/accessRightDetail'

import Vue from 'vue';
import store from '../store' // your vuex store
import userManager from '@/store/userManager';
const checkAuthen = async (to, from, next) => {
  let user = await userManager.getUser();
  if (user == null || (Math.floor((new Date((new Date).valueOf() + (new Date).getTimezoneOffset() * 60000)).getTime() / 1000) > user.expires_at)) {
    await userManager.signinRedirect()
  } else {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
    Vue.prototype.$http.defaults.headers.common['CompanyId'] = Vue.cookie.get('tenantId');
    if (!store.state.auth.signedIn) {
      if (user.profile.requiredChangePassword == "True") {
        var reqChangePass = Vue.cookie.get('twin-requiredChangePassword');
        if (reqChangePass != 'false') {
          Vue.cookie.set('twin-requiredChangePassword', 'false');
          next('/user/change-password');
        }
      }
      try {
        await store.dispatch('common/getCompanyCommonData');
        await store.dispatch('auth/signIn', user);
      } catch (e) {
        await store.dispatch('auth/loadFinish');
        if (e.response.status == 401) {
          await userManager.signinRedirect()
        } else if (e.response.status == 500) {
          next("/404");
        } else {
          next("/404");
        }
      }
    }
    if (to.meta.ignoreCheckAccess) {
      next();
    } else if (store.getters['common/currentUser'].accessRight && to.meta.accessRight) {
      var nested = to.meta.accessRight.split('.');// take two element key
      if (!store.getters['common/currentUser'].accessRight[nested[0]][nested[1]]) {
        next('/404')
      } else {
        next();
      }
    } else {
      next('/404')
    }
  }
}

export const routes = [
  { name: 'home', path: '/', component: HomePage, beforeEnter: checkAuthen, meta: { ignoreCheckAccess: true } },
  /*** User */
  { name: 'userList', path: '/user', component: UserList, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'createUser', path: '/user/create', component: CreateUser, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },  
  { name: 'changePassword', path: '/user/change-password', component: ChangePassword, beforeEnter: checkAuthen, meta: { ignoreCheckAccess: true } },
  { name: 'updateUser', path: '/user/update/:id', component: UpdateUser, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  { name: 'teamUser', path: '/user/team/:id', component: TeamUser, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  { name: 'userInfo', path: '/user/info', component: UserInfo, beforeEnter: checkAuthen, meta: { ignoreCheckAccess: true }  },
  { name: 'editAccount', path: '/account', component: EditAccount, beforeEnter: checkAuthen, meta: { ignoreCheckAccess: true }  },
  /*** Lead */
  { name: 'leadList', path: '/lead', component: LeadList, beforeEnter: checkAuthen, meta: { accessRight: 'lead.view' } },
  { name: 'editLead-update', path: '/lead/edit/:id?', component: EditLead, beforeEnter: checkAuthen, meta: { accessRight: 'lead.edit' } },
  { name: 'importLead', path: '/lead/import', component: ImportLead, beforeEnter: checkAuthen, meta: { accessRight: 'lead.import' } },
  /*** GA Tracking */
  { name: 'ga', path: '/ga', component: Ga, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.view' } },
  { name: 'ga-info', path: '/ga/:id', component: GaInfo, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.view' } },
  { name: 'ga-tracking-disconnect-ga-edit', path: '/ga/tracking/disconnect/edit/:id?', component: EditTrackingDisconnectGa, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  { name: 'ga-tracking-connect-ga-edit', path: '/ga/tracking/connect/edit/:id?', component: EditTrackingConnectGa, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /*** conversion   **/
  { name: 'conversion-update', path: '/ga/:gaId/conversion/edit/:id?', component: editConversion, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /**** FORMTRACKING EditCallTracking ***/
  { name: 'conversion-form', path: '/ga/:gaId/form/edit/:id?', component: EditFormTracking, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /**** CALLTRACKING ***/
  { name: 'call-edit', path: '/ga/:gaId/call/edit/:id?', component: EditCallTracking, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /*** QR CODE EditTicketVoucher ***/
  { name: 'qrcode-edit', path: '/ga/:gaId/qrcode/edit/:id?', component: EditQRCode, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /*** TICKET VOUCHER **/
  { name: 'ticketVoucher-edit', path: '/ga/:gaId/ticket-vouchet/edit/:id?', component: EditTicketVoucher, beforeEnter: checkAuthen, meta: { accessRight: 'tracking.edit' } },
  /***** EDIT SURVEY ***/
  { name: 'survey-detail', path: '/survey/:surveyId/details', component: SurveyDetail, beforeEnter: checkAuthen, meta: { accessRight: 'survey.view' } },
  { name: 'edit-survey', path: '/survey/:surveyId/details/edit/:id?', component: EditSurvey, beforeEnter: checkAuthen, meta: { accessRight: 'survey.edit' } },
  { name: '404', path: '/404', component: Page404 },
  /*** Survey */
  { name: 'surveyList', path: '/survey', component: SurveyList, beforeEnter: checkAuthen, meta: { accessRight: 'survey.view' } },
  { name: 'editSurveyName', path: '/survey/edit-name/:id?', component: EditSurveyName, beforeEnter: checkAuthen, meta: { accessRight: 'survey.edit' } },
  { name: 'surveyLead', path: '/lead/survey/:id/:surveyId?', component: SurveyLead, beforeEnter: checkAuthen, meta: { accessRight: 'lead.edit' } },
  /*** Attribution ***/
  { name: 'AssignmentPlanList', path: '/assignmentPlan', component: AssignmentPlanList, beforeEnter: checkAuthen, meta: { accessRight: 'auto.assignmentview' } },
  { name: 'AssignmentPlanEdit', path: '/assignmentPlan/edit/:id?', component: AssignmentPlanEdit, beforeEnter: checkAuthen, meta: { accessRight: 'auto.assignmentview' } },
  /*** Settings */
  { name: 'settings', path: '/settings', component: CompanyInfo, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'settingsLead', path: '/settings/lead', component: Settings, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'masterData', path: '/settings/master-data/:id?', component: MasterData, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'configSurvey', path: '/settings/config-survey', component: ConfigSurvey, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'configSyncData', path: '/settings/config-sync-data', component: ConfigSyncData, beforeEnter: checkAuthen, meta: { accessRight:  'settings.view' } },
  { name: 'configConnectSMS', path: '/settings/config-connect-sms', component: ConfigConnectSMS, beforeEnter: checkAuthen, meta: { accessRight:  'settings.view' } },
  { name: 'configConnectEDM', path: '/settings/config-connect-edm', component: ConfigConnectEDM, beforeEnter: checkAuthen, meta: { accessRight:  'settings.view' } },
  { name: 'configConnectVoIP', path: '/settings/config-connect-voip', component: ConfigConnectVoIP, beforeEnter: checkAuthen, meta: { accessRight:  'settings.view' } },
  { name: 'configSystemEmail', path: '/settings/config-system-email', component: ConfigSystemEmail, beforeEnter: checkAuthen, meta: { accessRight:  'settings.view' } },
  /*** Lead Info */
  { name: 'leadgeneralInfo', path: '/lead/generalInfo/:id', component: LeadGeneralInfo, beforeEnter: checkAuthen, meta: { accessRight:  'lead.view' } },
  { name: 'leadMoreInfo', path: '/lead/moreInfo/:id', component: LeadMoreInfo, beforeEnter: checkAuthen, meta: { accessRight:  'lead.view' } },
  { name: 'history', path: '/lead/history/:id', component: History, beforeEnter: checkAuthen, meta: { accessRight:  'lead.view' } },
  { name: 'contact', path: '/lead/contact/:id', component: Contact, beforeEnter: checkAuthen, meta: { accessRight:  'lead.view' } },
  { name: 'editContact', path: '/lead/contact/:leadId/edit/:id?', component: EditContact, beforeEnter: checkAuthen, meta: { accessRight:  'lead.view' } },
  { name: 'chatLead', path: '/lead/chat/:id', component: ChatLead, beforeEnter: checkAuthen, meta: { accessRight: 'lead.view' } },
  /** AccessRight **/
  { name: 'AccessRightCreate', path: '/user/accessRight/create', component: AccessRightCreate, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  { name: 'AccessRightEditDelete', path: '/user/accessRight/edit/:id', component: AccessRightEditDelete, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  { name: 'description-accessRight', path: '/user/accessRightDetail', component: AccessRightDetail, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  /*** SO */
  { name: 'soHeaderList', path: '/so/header', component: SOHeaderList, beforeEnter: checkAuthen, meta: { accessRight: 'so.view' } },
  { name: 'editSO', path: '/so/header/edit/:soHeaderId?', component: EditSO, beforeEnter: checkAuthen, meta: { accessRight: 'so.view' } },
  { name: 'createSOFromLead', path: '/so/header/edit/fromLead/:leadId?', component: EditSO, beforeEnter: checkAuthen, meta: { accessRight: 'so.view' } },

  { name: 'productCategoryList', path: '/product/category', component: ProductCategoryList, beforeEnter: checkAuthen, meta: { accessRight: 'product.view' } },
  { name: 'editProductCategory', path: '/product/category/edit/:id?', component: EditProductCategory, beforeEnter: checkAuthen, meta: { accessRight: 'product.view' } },
  { name: 'productItemList', path: '/product/item', component: ProductItemList, beforeEnter: checkAuthen, meta: { accessRight: 'product.view' } },
  { name: 'editProductItem', path: '/product/item/edit/:id?', component: EditProductItem, beforeEnter: checkAuthen, meta: { accessRight: 'product.view'} },
  /*** Team **/
  { name: 'team', path: '/team', component: Team, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'editTeam', path: '/team/edit/:id?', component: EditTeam, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  { name: 'userTeam', path: '/team/user/:id', component: UserTeam, beforeEnter: checkAuthen, meta: { accessRight: 'settings.edit' } },
  /*** Carposting **/
  { name: 'carposting', path: '/carposting', component: Carposting, beforeEnter: checkAuthen, meta: { accessRight: 'settings.view' } },
  { name: 'carpostingDetail', path: '/carposting/detail/:id', component: CarpostingDetail, beforeEnter: checkAuthen, meta: { ignoreCheckAccess: true } },
]
