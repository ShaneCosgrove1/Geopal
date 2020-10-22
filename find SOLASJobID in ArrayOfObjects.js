let asset_fields = [
  {
    id: 57,
    name: 'Annulus Volume/m',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 56,
    name: 'Annulus Width',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 58,
    name: 'Drive Name',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 55,
    name: 'Excavated Volume/m',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 51,
    name: 'External Diameter',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 50,
    name: 'Internal Diameter',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 53,
    name: 'Nr. Pipes',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 52,
    name: 'Overall Length',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 54,
    name: 'Pipe Length',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 40,
    name: 'Contract Name',
    asset_company_field: {},
    action_value_entered: 'Test Job IE',
    s3file_id: 0,
  },
  {
    id: 41,
    name: 'Contract Number',
    asset_company_field: {},
    action_value_entered: 'C000',
    s3file_id: 0,
  },
  {
    id: 49,
    name: 'Lifting Equipment',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 60,
    name: 'Master Latitude',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 62,
    name: 'Master Longitude',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 42,
    name: 'Parent ID',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 43,
    name: 'Pour Names',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 44,
    name: 'Pour Number',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 61,
    name: 'Site URL',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 46,
    name: 'Structure ID',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 47,
    name: 'Traffic Management Plan',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 48,
    name: 'Company Address',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
  {
    id: 59,
    name: 'SOLASJobID',
    asset_company_field: {},
    action_value_entered: '5241728',
    s3file_id: 0,
  },
  {
    id: 45,
    name: 'Structure ID',
    asset_company_field: {},
    action_value_entered: '',
    s3file_id: 0,
  },
];

result = asset_fields.find(findInAsset_fields);

function findInAsset_fields(element) {
  // console.log(index);
  return element.name == 'SOLASJobID';
}

console.log(result.action_value_entered);



var result2 = asset_fields.find(function(element) {
  console.log(element)
  return element.name == 'SOLASJobID';
});

// function findInAsset_fields(function(element) {
//   return element.name == 'SOLASJobID';
// });

console.log(result2.action_value_entered);