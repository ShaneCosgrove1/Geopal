/* eslint-disable no-var */
/* eslint-disable camelcase */

var success = function(item) {
  Geopal.setJobWorkflowValueByName('Job Name', item);

  Geopal.setJobFieldValueByName(
      'Contract Number',
      item.match(/(c\d\d\d)\s(.*)/i)[1]
  );
  Geopal.setJobFieldValueByName(
      'Contract Name',
      item.match(/(c\d\d\d)\s(.*)/i)[2]
  );
};
var cancel = function() {
  Geopal.showMessage('nothing was picked');
};
Geopal.showSingleChoiceList(
    'success',
    'cancel',
    'C588 Midlands Water Nw Mgt Services,C593 Regional New Connections LOT3 North West',
    'Select Job',
    'Plese Select Which Job This Form is For'
);
