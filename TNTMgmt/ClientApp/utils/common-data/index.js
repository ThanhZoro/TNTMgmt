
const listIndustry = [
  "ArtsAndEntertainment",
  "Automotive",
  "BeatyAndFitness",
  "BooksAndLiterature",
  "BusinessAndIndustrialMarkets",
  "ComputersAndElectronics",
  "Finance",
  "FoodAndDrink",
  "Games",
  "Healthcare",
  "HobbiesAndLeisure",
  "HomeAndGarden",
  "InternetAndTelecom",
  "JobsAndEducation",
  "LawAndGoverment",
  "News",
  "OnlineCommunities",
  "PeopleAndSociety",
  "PetsAndAnimals",
  "Property",
  "Reference",
  "Science",
  "Shopping",
  "Sports",
  "Travel",
  "Other"
];

const listScale = [
  "Employer0105",
  "Employer0520",
  "Employer2050",
  "Employer50250",
  "Employer250",
];

const time = [
  { value: "minutes" },
  { value: "hours" },
  { value: "days" },
];
const ruleRevole = [
  { value: "nolookafter" },
  { value: "nocontract" }
];

const typeCRM = [
  { value: 'lead' },
  { value: 'transaction' }
];

const trackingType = [
  { value: "Call" },
  { value: "Chat" },
  { value: "Get Ticket" },
  { value: "Submit Form" },
  { value: "Login Wifi" },
  { value: "Login with FB" },
  { value: "Qr Code" }
];

const formSignIn = [
  { validate: 'validateName', name: 'fullName' },
  { validate: 'validatePhone', name: 'phone' },
  { validate: 'validateEmail', name: 'email' },
  { validate: 'validateGender', name: 'gender' },
  { validate: 'validateAddress', name: 'address' },
];
const validation = ['required', 'optional'];
const code = [4, 5, 6];
const color = ["#00a6ff", "#009688", "#013f6e", "#fef900", "#ffd185", "#77d353",
  "#037515", "#ffba5c", "#b8977e", "#ff9052", "#f95f62", "#976dd0", "#6c0182",
  "#343f4b", "#5a6978", "#969faa"];
const icon = ["flaticon-ring", "flaticon-old-typical-phone", "flaticon-sale", "flaticon-win",
  "flaticon-24-hourse-support", "flaticon-telephone", ""];
const type = ["rectangular", "circle"];

const fontWeight = ['bold', 'bolder', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const fontStyle = ['normal', 'italic'];
const typeSurvey = [
  { value: 'label' },
  { value: 'input' },
  { value: 'radio' },
  { value: 'checkbox' },
  { value: 'radio-button' },
  { value: 'checkbox-button' }
];

const languageDefault = ['vi-VN', 'en-EN'];

const positionButton = [
  { value: 'topLeft' },
  { value: 'topRight' },
  { value: 'bottomLeft' },
  { value: 'bottomRight' }
];
const mailType = [
  { value: 'smtp', label: 'SMTP' },
  { value: 'sendgrid', label: 'Send grid' }
];

const statusProduct = [
  { value: 'active' },
  { value: 'inactive' }
];

const statusSOHeader = [
  { index: 0, value: 'noStatus', colorValue: ""},
  { index: 1, value: 'draft', colorValue: "#00ffff" },
  { index: 2, value: 'complete', colorValue: "#00ff00" },
  { index: 3, value: 'cancelled', colorValue: "#000000" }
];

const typeDiscount = [
  { index: 1, value: 'PercentBeforeTax' },
  { index: 2, value: 'PercentAfterTax' },
  { index: 3, value: 'AmountBeforeTax' },
  { index: 4, value: 'AmountAfterTax' },
];

const accessRight = {
  lead: {
    view: false,
    edit: false,
    import: false,
    export: false,
    delete: false,
    companyedit: false,
    companydata: false,
    companydataedit: false,
    teamdata: false,
    teamdataedit: false,
  },
  settings: {
    view: false,
    edit: false
  },
  tracking: {
    view: false,
    edit: false,
    delete: false,
    export: false,
    import: false
  },
  survey: {
    view: false,
    edit: false,
    delete: false,
    export: false,
    import: false
  },
  auto: {
    assignmentdelete: false,
    assignmentedit: false,
    assignmentexport: false,
    assignmentimport: false,
    assignmentview: false
  },
  product: {
    view: false,
    edit: false,
    delete: false,
    export: false,
    import: false
  },
  so: {
    view: false,
    edit: false,
    delete: false,
    export: false,
    import: false
  }
};
const carposting = // This file is intentionally left empty for noop aliases
  [
    {
      "companyId": "",
      "salesmanId": "",
      "postingInfo": {
        "id": "76bb2a5ff47829f18514f5fd3f327c1c",
        "siteKey": "bonbanh",
        "itemKey": "CarPosting",
        "resultKey": "0543781f8fe1f8528222ba3d0cfbf14f",
        "sourceUrl": "https://bonbanh.com/xe-toyota-highlander-le-2.7-2018-1750130",
        "status": "GOOD",
        "createdAt": 1536807770881,
        "updatedAt": 0,
        "detail": {
          "contact": {
            "name": "Phạm Văn Sang",
            "phones": [
              "190985028888"
            ],
            "email": "",
            "city": null,
            "district": null,
            "address": "19a lê văn lương, cầu giấy hà nội"
          },
          "city": "TP. Hà Nội",
          "district": null,
          "address": "19a lê văn lương, cầu giấy hà nội",
          "carStatus": "Used",
          "transaction": "For sale",
          "title": "Xe Toyota Highlander LE 2.7 2018 - 2 Tỷ 495 Triệu (~ 106,967 USD )",
          "briefDesc": "",
          "priceOrigin": "~2.495.000.000 đ",
          "priceProcessed": "2495000000",
          "priceCur": "VND",
          "madeIn": "",
          "manufacture": "Toyota",
          "model": "highlander",
          "body": "",
          "productionYear": "",
          "outsideColor": "",
          "insideColor": "",
          "seat": 0,
          "fuel": "",
          "fuelCons": "",
          "fuelConsLDist": "",
          "gearBox": "",
          "shaftingCar": "",
          "numberPlate": "",
          "kmUsed": "",
          "windows": "",
          "postedDate": 1536771600000
        }
      }
    },
    {
      "companyId": "",
      "salesmanId": "",
      "postingInfo": {
        "id": "3921cd54e46a2caae540a2048f9a9826",
        "siteKey": "bonbanh",
        "itemKey": "CarPosting",
        "resultKey": "59c36bec2b1e60ffd2339cc1dd896122",
        "sourceUrl": "https://bonbanh.com/xe-toyota-fortuner-2.7v-4x4-at-2010-1762829",
        "status": "GOOD",
        "createdAt": 1536807723038,
        "updatedAt": 0,
        "detail": {
          "contact": {
            "name": "Phạm Văn Sang",
            "phones": [
              "0908843999",
              "0985149779"
            ],
            "email": "",
            "city": null,
            "district": null,
            "address": "cầu nhật tân hà nội"
          },
          "city": "TP. Hà Nội",
          "district": null,
          "address": "cầu nhật tân hà nội",
          "carStatus": "Used",
          "transaction": "For sale",
          "title": "Xe Toyota Fortuner 2.7V 4x4 AT 2010 - 538 Triệu (~ 23,065 USD )",
          "briefDesc": "",
          "priceOrigin": "~538.000.000 đ",
          "priceProcessed": "538000000",
          "priceCur": "VND",
          "madeIn": "",
          "manufacture": "Toyota",
          "model": "fortuner",
          "body": "",
          "productionYear": "",
          "outsideColor": "",
          "insideColor": "",
          "seat": 0,
          "fuel": "",
          "fuelCons": "",
          "fuelConsLDist": "",
          "gearBox": "",
          "shaftingCar": "",
          "numberPlate": "",
          "kmUsed": "",
          "windows": "",
          "postedDate": 1536771600000
        }
      }
    },
  ]
export default {
  listIndustry,
  listScale,
  time,
  trackingType,
  ruleRevole,
  formSignIn,
  validation,
  code,
  color,
  icon,
  type,
  fontWeight,
  fontStyle,
  typeSurvey,
  languageDefault,
  positionButton,
  mailType,
  typeCRM,
  statusProduct,
  accessRight,
  statusSOHeader,
  carposting,
  typeDiscount
};
