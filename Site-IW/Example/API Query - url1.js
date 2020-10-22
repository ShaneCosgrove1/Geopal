function setJson() {
  return (data = {
    collection: {
      paging: {
        limit: 25,
        page: 1,
        page_total: 1,
        range_max: 1,
        range_min: 1,
        result_header_string: 'Results 1 to 1 of 1 sorted by Relevance',
        total_count: 1,
      },
      searching: {
        cache_id: 1174060861,
        result_title: 'Search Results for: OTSubType:202 and C588',
      },
      sorting: {
        links: {
          asc_OTObjectDate: {
            body: '',
            content_type: '',
            href:
              '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861&sort=asc_OTObjectDate',
            method: 'GET',
            name: 'Date (Ascending)',
          },
          asc_OTObjectSize: {
            body: '',
            content_type: '',
            href:
              '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861&sort=asc_OTObjectSize',
            method: 'GET',
            name: 'Size (Ascending)',
          },
          desc_OTObjectDate: {
            body: '',
            content_type: '',
            href:
              '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861&sort=desc_OTObjectDate',
            method: 'GET',
            name: 'Date (Descending)',
          },
          desc_OTObjectSize: {
            body: '',
            content_type: '',
            href:
              '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861&sort=desc_OTObjectSize',
            method: 'GET',
            name: 'Size (Descending)',
          },
          relevance: {
            body: '',
            content_type: '',
            href:
              '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861',
            method: 'GET',
            name: 'Relevance',
          },
        },
      },
    },
    links: {
      data: {
        self: {
          body: '',
          content_type: '',
          href:
            '/api/v2/search?where=OTSubType:202 and C588&cache_id=1174060861',
          method: 'GET',
          name: '',
        },
      },
    },
    results: [
      {
        data: {
          properties: {
            container: true,
            container_size: 0,
            create_date: '2017-06-20T15:29:31Z',
            create_user_id: 40278,
            description: '',
            description_multilingual: {
              en_GB: '',
            },
            due_date: null,
            external_create_date: null,
            external_identity: '',
            external_identity_type: '',
            external_modify_date: null,
            external_source: '',
            favorite: false,
            goals: '',
            id: 2223229,
            initiatives: '',
            mime_type: null,
            mission: '',
            modify_date: '2018-04-06T10:23:31Z',
            modify_user_id: 453469,
            name: 'C588 Midlands Water Nw Mgt Services(16-010)',
            name_multilingual: {
              en_GB: 'C588 Midlands Water Nw Mgt Services(16-010)',
            },
            objectives: '',
            owner: 'Harney, Tracy',
            owner_group_id: 2223230,
            owner_user_id: 40278,
            parent_id: 31970,
            permissions_model: 'simple',
            reserved: false,
            reserved_date: null,
            reserved_shared_collaboration: false,
            reserved_user_id: 0,
            short_summary: '',
            size: 0,
            size_formatted: '0 Sub-Projects',
            start_date: '2017-06-20T16:28:41',
            status: 0,
            summary: '',
            type: 202,
            type_name: 'Project',
            versions_control_advanced: false,
            volume_id: -2000,
          },
        },
        links: {
          ancestors: [
            {
              href: 'api/v1/nodes/2000',
              name: 'SOLAS',
            },
            {
              href: 'api/v1/nodes/30065',
              name: '02 Ireland',
            },
            {
              href: 'api/v1/nodes/31970',
              name: '02 Contract',
            },
          ],
          ancestors_nodes: [
            {
              href: 'api/v1/nodes/2000/nodes',
              name: 'SOLAS',
            },
            {
              href: 'api/v1/nodes/30065/nodes',
              name: '02 Ireland',
            },
            {
              href: 'api/v1/nodes/31970/nodes',
              name: '02 Contract',
            },
          ],
          parent: {
            href: 'api/v1/nodes/31970',
            name: '02 Contract',
          },
          parent_nodes: {
            href: 'api/v1/nodes/31970/nodes',
            name: '02 Contract',
          },
        },
        search_result_metadata: {
          current_version: null,
          object_href: null,
          object_id: 'DataId=2223229&Version=0',
          result_type: '264',
          source_id: '754524',
          version_type: null,
        },
      },
    ],
  });
}
blob = setJson(); // httpRes returned as body object


console.log(typeof blob.results, blob.results);
console.log(typeof JSON.stringify(blob.results), JSON.stringify(blob.results))

var results = JSON.stringify(blob.results)
results = blob.results
console.log(results)

data = results[0].data.properties   ;
//
data

//
data1 = {
  collection: {
    paging: {
      limit: 25,
    },
  },
};
type = typeof data1;
console.log(type);

stringd = JSON.stringify(data1);
type = typeof stringd;
console.log(type);
console.log(stringd);

parsed = JSON.parse(d1);
type = typeof parsed;
console.log(type);
console.log(parsed);
