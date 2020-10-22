
redoID = Geopal.Input.get("id");

var params= {
      'job-data': "{\"identifier\": \"" + redoID + "\"}"
};

Geopal.Output.printString('ID:' + redoID + '\n' + 'Params:' + JSON.stringify(params));

var  IOT_URL  = 'https://iot.geopalsolutions.com/iot/c1154_ecmfolderquerycreate';
var installationResponse = Geopal.HttpClient.post(IOT_URL, params, {
        "Connection": "Keep-Alive",
});
