let axios = require("axios");

const api = {
  insert(object) {
    console.log("insert", object);

    let data = JSON.stringify({
      collection: "model",
      database: "snake_game",
      dataSource: "Cluster0",
      document: {
        object
      },
    });

    let config = {
      method: "post",
      url: "https://data.mongodb-api.com/app/data-jbsxm/endpoint/data/beta/action/insertOne",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "api-key":
          "tRFVisLbmPl5MAqdHPYnl1gxeQEjiIhMYOc0Tt1ilK7PX0RNZngkMJ8nwiGHCqEv",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getModel() {
    console.log("getModel");

    let data = JSON.stringify({
      collection: "model",
      database: "snake_game",
      dataSource: "Cluster0",
    });

    let config = {
      method: "post",
      url: "https://data.mongodb-api.com/app/data-jbsxm/endpoint/data/beta/action/find",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "api-key":
          "tRFVisLbmPl5MAqdHPYnl1gxeQEjiIhMYOc0Tt1ilK7PX0RNZngkMJ8nwiGHCqEv",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data);

        // let model = { }
        console.log(response.data.documents[0].object);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export default api;
