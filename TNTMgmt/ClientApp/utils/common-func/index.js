import Vue from 'vue'
import {i18n} from '@/i18n-setup'
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const buildFormData = (formData, data, parentKey) => {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}
const customizeTree = function (array, parent, tree) {

  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { id: "" };
  var children = _.map(array, function (o) {
    if (!o.parentId || o.parentId == "0") o.parentId = "";
    o.label = o.header.text;
    return o;
  });
  children = _.filter(children, function (child) { return child.parentId == parent.id; });
  children = _.orderBy(children, ['ordinal','createdAt'], ['asc']);
  if (!_.isEmpty(children)) {
    if (parent.id == "") {
      tree = children;
    } else {
      parent['children'] = children
    }
    _.each(children, function (child) { customizeTree(array, child) });
  }

  return tree;
}
const shorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  var value = str.substr(0, str.lastIndexOf(separator, maxLen));
  return value.concat('', '...');
}
const treeRoles = (data, response) => {
  response = typeof response !== 'undefined' ? response : [];
  _.forEach(data, function (v) {
    if (v.key) {
      var elem = { value: v.key, label: v.key };
      if (v.value) {
        elem['children'] = [];
        _.forEach(v.value, function (o) {
          if (o.key) {
            elem['children'].push({ value: o.key, label: o.key });
            if (o.value) treeRoles(o.value);
          }
        });
      }
      response.push(elem);
    }
  });
  return response;
};
const getSpecialString = (data) => {
  var searchSpecial = "";
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (/[*?@+^${}[\]().|\\]/.exec(data[i])) {
        searchSpecial = searchSpecial + "//" + data[i];
      } else {
        searchSpecial = searchSpecial + data[i];
      }
    }
  }
  return searchSpecial;
}
const getKey = (data) => {
  var value = "";
  for (let i = 1; i < data.length; i++) {
    value = value + data[i];
  }
  return value;
};
const setCommonRules = (rules, bool) => {
  _.forEach(rules, (o) => { _.forEach(o, (v, key) => { o[key] = bool }) });
}
export default {
  sleep,
  buildFormData,
  customizeTree,
  shorten,
  treeRoles,
  getSpecialString,
  getKey,
  setCommonRules
};
