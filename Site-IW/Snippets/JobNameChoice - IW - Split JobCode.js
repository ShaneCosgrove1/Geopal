/* eslint-disable no-var */
/* eslint-disable camelcase */



var success = function(item) {
    Geopal.setJobWorkflowValueByName('Job Name', item);
    
    var splitItem = item.split("-"); // Splits item into C588 , Midlands Water Nw Mgt Services 
    
    Geopal.setJobFieldValueByName(
       /*'Contract Number',
        item.match(/(c\d\d\d)\s(.*)/i)[1]*/
      'Contract Number', 
      splitItem[0]
     );
    Geopal.setJobFieldValueByName(
        /*'Contract Name',
        item.match(/(c\d\d\d)\s(.*)/i)[2]*/
        'Contract Name',
        splitItem[1]
    
    );
  };
  var cancel = function() {
    Geopal.showMessage('nothing was picked');
  };
  Geopal.showSingleChoiceList(
      'success',
      'cancel',
      'C588-Midlands Water Nw Mgt Services,C593-Regional New Connections LOT3 North West,C588a-Old Whitechurch Road adv Wks',
      'Select Job',
      'Plese Select Which Job This Form is For'
  );
  