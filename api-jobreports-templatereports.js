// returns the list of all available job statuses
function findMinMax() {
  const result = Geopal.Api.get(
    'api/jobreports/templatereports',
    Geopal.Employee.getIoTEmployee().id,
    {}
  );

  const apicallinfo = JSON.parse(result.body);
  var statuses = apicallinfo.template_reports;
  var currentTemplate = [];

  // cant use map or => or let
  for (var i = 1, len = statuses.length; i < len; i++) {
    if (statuses[i].template_id == 29869) {
      // template_id
      currentTemplate.push({
        id: statuses[i].id,
        template_id: statuses[i].template_id,
      });
    }
  }
 // Geopal.Output.printString(
 //   '::::currentTemplate ' + JSON.stringify(currentTemplate)
 // );

  arr = currentTemplate;
  var min = arr[0];
  var max = arr[0];
  Geopal.Output.printString(
    '\t ::::BaseLine Min/Max:' +
      JSON.stringify(min) +
      ' /// ' +
      JSON.stringify(max)
  );

  for (var i = 1, len = arr.length; i < len; i++) {
    var v = arr[i];
    //  Geopal.Output.printString('::::v:' + JSON.stringify(v));
    min = v.id < min.id ? v : min;
    max = v.id > max.id ? v : max;
  }
  //Geopal.Output.printString('\n ::::min/Max:' + [min.id, max.id]);
  return max.id;
}
Geopal.Output.printString('\n ::::Returned Value :' + findMinMax())

// OLD

// // returns the list of all available job statuses

// const result = Geopal.Api.get(
//   'api/jobreports/templatereports',
//   Geopal.Employee.getIoTEmployee().id,
//   {}
// );

// // Geopal.Output.printString(result);
// // the above would print an object with a "body" key being a string

// const apicallinfo = JSON.parse(result.body);

// var statuses = apicallinfo.template_reports;
// var currentTemplate = [];
// //Geopal.Output.printString(statuses);

// // cant use map or =>
// // const details = res1.map(function(templateIDsRecords) {
// //   return templateIDsRecords.template_id == template_id ? templateIDsRecords.id: null ;
// //   //details = Math.max(details);

// // });

// for (var i = 1, len = statuses.length; i < len; i++) {
//   if (statuses[i].template_id == 29869) {
//     //template_id) {
//     currentTemplate.push({
//       id: statuses[i].id,
//       template_id: statuses[i].template_id
//     });
//   }
// }
// Geopal.Output.printString(
//   '::::currentTemplate ' + JSON.stringify(currentTemplate)
// );

// function findMinMax(arr) {
//   var min = arr[0];
//   var max = arr[0];
//   Geopal.Output.printString(
//     '\t ::::BaseLine Min/Max:' + JSON.stringify(min) + ' /// ' + JSON.stringify(max)
//   );

//   for (var i = 1, len = arr.length; i < len; i++) {
//     var v = arr[i];
//     Geopal.Output.printString('::::v::' + JSON.stringify(v));
//     min = v.id < min.id ? v : min;
//     max = v.id > max.id ? v : max;
//   }
//   Geopal.Output.printString('\n ::::min/Max:' + [min.id, max.id]);
//   //Geopal.Output.printString([min, max]);
// }
// findMinMax(currentTemplate);

// //Geopal.Output.printString(details);
