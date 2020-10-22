var hoursText = $('#hoursInput').val().toString();
var ampsText = $('#ampsInput').val().toString();
console.log(hoursInput);

console.log(ampsText);

var pumpNo = 1
Geopal.Geopal.setJobWorkflowValueByName('Pump '+ pumpNo + ' Hours', hoursText);
Geopal.Geopal.setJobWorkflowValueByName('Pump '+ pumpNo + ' Amps',ampsText);
Geopal.Geopal.setJobWorkflowValueByName('Pump '+ pumpNo + ' Hours Amps', hoursText + ' / ' + ampsText);

Geopal.finish();