
var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    
    $.ajax({
        url: 'https://iot.geopalsolutions.com/iot/ii4vBTox9e02xEChFRUv?asset_identifier=' + encodedAssetIdentifier + '&' + 'master_job_id=' + masterJobId + '&key=15DA5EEA889C498F',
        headers: headers,
        type: 'GET',
        
        error: function(e) {
            Geopal.hideProgressDialog();
            return Geopal.showText('yes', 'Error: ' + JSON.stri

 JSON.stringify(e.message) , 'Error');
        },
        success: function(data, textStatus, jqXHR) {
            console.log('Data returned: ' + data);
            processReportData(data);
            Geopal.hideProgressDialog();
        }   
    });