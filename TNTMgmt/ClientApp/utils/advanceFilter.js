import Vue from 'vue';
import commonFunc from "@/utils/common-func"
const initFilter = (choosenFilter = null, searchRequest, request = null) => {
  var should = [];
  if (searchRequest.description) {
    should.push(
      {
        "match_phrase": {
          "fullName": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "phone": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "email": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "name": searchRequest.description
        }
      }
    );
  }
  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.pageSize,
    "sort": {
      "field": searchRequest.sort.field,
      "sortOrder": searchRequest.sort.sortOrder
    },
    "source": searchRequest.source ? searchRequest.source : {},
    "query": {
      "bool": {
        "must": [],
        "must_not": [
          {
            "ids": {
              "values": request ? request.ids : []
            }
          }
        ],
        "should": should,
        "minimum_should_match": searchRequest.description ? 1 : 0
      }
    }
  }
  if (searchRequest.id) {
    query.query.bool.must.push(
      {
        "term": {
          "id": searchRequest.id
        }
      }
    )
  }
  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        var queryMatchPhare = {};
        queryMatchPhare[filter.field] = filter.filterText;
        query.query.bool.must.push({
          "match_phrase": queryMatchPhare
        })
        break;
      case "date":
        query.query.bool.must.push({
          "range": {
            [filter.field]: {
              "gte": Vue.prototype.$moment(filter.date[0]).format(),
              "lte": Vue.prototype.$moment(filter.date[1]).format()
            }
          }
        });
        break;
      case "checkbox":
        var data = _.map(filter.data, (o) => { return o.id });
        query.query.bool.must.push({
          "terms": {
            [filter.field]: data
          }
        })
        break;
      case "select":
        query.query.bool.must.push({
          "range": {
            "updateAt": {
              "lte": "now-" + filter.select + "d/d"
            }
          }
        });
        break;
      default:
    }
  });
  return query;
}


const applyFilterTracking = (choosenFilter = null, searchRequest, request = null) => {
  var searchSpecial = commonFunc.getSpecialString(searchRequest.description);
  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.pageSize,
    "sort": {
      "field": searchRequest.sort.field,
      "sortOrder": searchRequest.sort.sortOrder
    },
    "query": {
      "bool": {
        "must": [],
        "must_not": [
          {
            "ids": {
              "values": request ? request.ids : []
            }
          }
        ],
        "should": [
          {
            "query_string": {
              "default_field": "websiteUrl",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "name",
              "query": "*" + searchRequest.description + "*"
            }
          }
        ]
      }
    }
  }

  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        query.query.bool.must.push({
          "query_string": {
            "default_field": filter.field,
            "query": "*" + filter.filterText + "*"
          }
        })
        break;
      case "date":
        query.query.bool.must.push({
          "range": {
            [filter.field]: {
              "gte": Vue.prototype.$moment(filter.date[0]).format(),
              "lte": Vue.prototype.$moment(filter.date[1]).format()
            }
          }
        });
        break;
      case "checkbox":
        var data = _.map(filter.data, (o) => { return o.id });
        query.query.bool.must.push({
          "terms": {
            [filter.field]: data
          }
        })
        break;
      default:
    }
  });
  return query;
}

const applyFilterUser = (choosenFilter, data) => {
  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        data = _.filter(data, (f) => { return f[filter.field] && f[filter.field].toString().toLowerCase().indexOf(filter.filterText.toLowerCase()) > -1; })
        break;
      case "date":
        data = _.filter(data, (f) => {
          return f[filter.field] && Vue.prototype.$moment(f[filter.field]).startOf('day') >= filter.date[0] && Vue.prototype.$moment(f[filter.field]).startOf('day') <= filter.date[1];
        })
        break;
      case "checkbox":
        var listIds = _.map(filter.data, (v) => { return filter.field == "gender" ? v.name : v.id });
        data = _.filter(data, (f) => {
          if (!_.isArray(f[filter.field])) {
            return _.includes(listIds, f[filter.field]);
          } else {
            return _.intersection(listIds, f[filter.field]).length > 0;
          }
        })
        break;
      case "select":
        data = _.filter(data, (f) => { return f[filter.field] && f[filter.field] == filter.select; })
        break;
      default:
    }
  });
  return data;
}

const initLeadInfo = (searchRequest, request) => {
  var should = [];
  if (searchRequest.description) {
    should.push(
      {
        "match_phrase": {
          "phone": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "email": searchRequest.description
        }
      },
      {
        "match_phrase": {
          "name": searchRequest.description
        }
      }
    );
  }
  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.numberScroll ? (searchRequest.pageSize) * searchRequest.numberScroll : searchRequest.pageSize,
    "sort": {
      "field": searchRequest.sort.field,
      "sortOrder": searchRequest.sort.sortOrder
    },
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "leadId": request.leadId
            }
          }
        ],
        "should": should,
        "minimum_should_match": searchRequest.description ? 1 : 0
      }
    }
  }
  if (request.type) {
    query.query.bool.must.push({
      "terms": {
        "type": request.type
      }
    });
  }
  return query;
}

const applyFilterProductSO = (choosenFilter = null, searchRequest, request = null) => {
  var searchSpecial = commonFunc.getSpecialString(searchRequest.description);
  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.pageSize,
    "sort": {
      "field": searchRequest.sort.field,
      "sortOrder": searchRequest.sort.sortOrder
    },
    "query": {
      "bool": {
        "must": [],
        "must_not": [
          {
            "ids": {
              "values": request ? request.ids : []
            }
          }
        ],
        "should": [
          {
            "query_string": {
              "default_field": "categoryCode",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "name",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "status",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "productCode",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "productCategoryId",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "term": {
              "sONumber": searchRequest.description ? searchRequest.description : 0
            }
          },
          {
            "query_string": {
              "default_field": "salesman",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "buyer.name",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "buyer.phone",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "buyer.email",
              "query": "*" + searchSpecial == "" ? searchRequest.description : searchSpecial + "*"
            }
          }
        ]
      }
    }
  }

  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        query.query.bool.must.push({
          "query_string": {
            "default_field": filter.field,
            "query": "*" + filter.filterText + "*"
          }
        })
        break;
      case "date":
        query.query.bool.must.push({
          "range": {
            [filter.field]: {
              "gte": Vue.prototype.$moment(filter.date[0]).format(),
              "lte": Vue.prototype.$moment(filter.date[1]).format()
            }
          }
        });
        break;
      case "checkbox":
        var data = _.map(filter.data, (o) => { return o.id });
        query.query.bool.must.push({
          "terms": {
            [filter.field]: data
          }
        })
        break;
      default:
    }
  });
  return query;
}

const applyFilterSODetails = (choosenFilter = null, searchRequest, request = null) => {

  var query = {
    "from": (searchRequest.currentPage - 1) >= 0 ? (searchRequest.currentPage - 1) * searchRequest.pageSize : 0,
    "size": searchRequest.pageSize,
    "sort": {
      "field": searchRequest.sort.field,
      "sortOrder": searchRequest.sort.sortOrder
    },
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "sOHeaderId": searchRequest.soHeaderId
            }
          }
        ],
        "must_not": [
          {
            "ids": {
              "values": request ? request.ids : []
            }
          }
        ],
        "should": [
          {
            "query_string": {
              "default_field": "productCode",
              "query": "*" + searchRequest.description + "*"
            }
          },
          {
            "query_string": {
              "default_field": "productName",
              "query": "*" + searchRequest.description + "*"
            }
          },
        ]
      }
    }
  }
  if (searchRequest.id) {
    query.query.bool.must.push(
      {
        "term": {
          "id": searchRequest.id
        }
      }
    )
  }
  _.forEach(choosenFilter, function (filter) {
    switch (filter.searchType) {
      case "text":
        query.query.bool.must.push({
          "query_string": {
            "default_field": filter.field,
            "query": "*" + filter.filterText + "*"
          }
        })
        break;
      case "date":
        query.query.bool.must.push({
          "range": {
            [filter.field]: {
              "gte": Vue.prototype.$moment(filter.date[0]).format(),
              "lte": Vue.prototype.$moment(filter.date[1]).format()
            }
          }
        });
        break;
      case "checkbox":
        var data = _.map(filter.data, (o) => { return o.id });
        query.query.bool.must.push({
          "terms": {
            [filter.field]: data
          }
        })
        break;
      default:
    }
  });
  return query;
}

export default {
  initFilter,
  applyFilterTracking,
  applyFilterUser,
  initLeadInfo,
  applyFilterProductSO,
  applyFilterSODetails
};
