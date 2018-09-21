import Vue from 'vue'

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      color: `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}, 1)`,
      borderColor: `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}, 1)`,
    };
  }
  return {
    color: `rgb(87, 86, 31, 1)`,
    borderColor: `rgb(87, 86, 31,1)`,
  };
}

const leadStatus = (state, getters, rootState) => {
  var data = _.map(state.data['status_aggs'], (v, k) => {
    var report = { value: v, label: 'N/A', color: "rgb(87, 86, 31,1)", borderColor: "rgb(87, 86, 31, 1)" };
    if (k) {
      var data = _.find(rootState.common.commonDatas, { 'dataType': 1, 'id': k });
      if (data) {
        var initColor = hexToRgb(data.color);
        report.label = data.dataValue;
        report.color = initColor.color;
        report.borderColor = initColor.borderColor;
      }
    }
    return report;
  });

  return {
    labels: _.map(data, 'label'),
    datasets: [{
      data: _.map(data, 'value'),
      backgroundColor: _.map(data, 'color'),
      borderColor: _.map(data, 'borderColor'),
    }]
  };
}

const leadSource = (state, getters, rootState) => {
  var data = _.map(state.data['source_aggs'], (v, k) => {
    var report = { value: v, label: 'N/A', color: "rgb(87, 86, 31,1)", borderColor: "rgb(87, 86, 31, 1)" };
    if (k) {
      var data = _.find(rootState.common.commonDatas, { 'dataType': 2, 'id': k });
      if (data) {
        var initColor = hexToRgb(data.color);
        report.label = data.dataValue;
        report.color = initColor.color;
        report.borderColor = initColor.borderColor;
      }
    }
    return report;
  });

  return {
    labels: _.map(data, 'label'),
    datasets: [{
      data: _.map(data, 'value'),
      backgroundColor: _.map(data, 'color'),
      borderColor: _.map(data, 'borderColor'),
    }]
  };
}

const leadChannel = (state, getters, rootState) => {
  var data = _.map(state.data['channel_aggs'], (v, k) => {
    var report = { value: v, label: 'N/A', color: "rgb(87, 86, 31,1)", borderColor: "rgb(87, 86, 31, 1)" };
    if (k) {
      var data = _.find(rootState.common.commonDatas, { 'dataType': 3, 'id': k });
      if (data) {
        var initColor = hexToRgb(data.color);
        report.label = data.dataValue;
        report.color = initColor.color;
        report.borderColor = initColor.borderColor;
      }
    }
    return report;
  });

  return {
    labels: _.map(data, 'label'),
    datasets: [{
      data: _.map(data, 'value'),
      backgroundColor: _.map(data, 'color'),
      borderColor: _.map(data, 'borderColor'),
    }]
  };
}

export default {
  leadStatus,
  leadSource,
  leadChannel
};
