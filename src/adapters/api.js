let axios = require("axios");

const api = {
  insert(object) {
    // console.log("insert", object);

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
  async getModel() {
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

    let res = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      
    let model = [];
    for(let i=0; i<res.documents.length; i++) {
      // res.documents[i].object.snake = JSON.stringify(res.documents[i].object.snake);
      // res.documents[i].object.snack = JSON.stringify(res.documents[i].object.snack);
      model.push(res.documents[i].object);
    }
    // console.log('model:', model);
    return model;
  }
};

export default api;
