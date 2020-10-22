  var SOLASJobIDValue = asset.asset_fields.find(function(element) {
    return element.name == 'SOLASJobID';
  });
  Geopal.Log.setExtraField4('SOLASJobIDValue: ' + JSON.stringify(SOLASJobIDValue));
  if (SOLASJobIDValue.action_value_entered) {
    info.ownerID = SOLASJobIDValue;
  } else {
    info.ownerID = data.id;
  }
  Geopal.Log.setExtraField4('Info: ' + JSON.stringify(info));