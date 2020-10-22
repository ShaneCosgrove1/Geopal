
var validate= 0;

for (var i = 15; i <= 46; i++){
    var currentValue = parseFloat(Geopal.getJobWorkflowValueByPosition(i - 1));
    if (!currentValue || currentValue === "" )
    {
        validate = i + 1
    }
}

if (validate >0 )
{
    gotoJobWorkflowByPosition (validate)
    Geopal.showMessage('Please Complete all questions to Calculate score');
}