export const projectConfig = {
  dataBaseUrl: "https://sammlungsportal.bua-dns.de/items",
  imageBaseUrl: "https://sammlungsportal.bua-dns.de/assets",
  colonialContextsUrl: "https://ccc.bua-dns.de/items",
  fields: {
    collections: [
      // 1st level
      'id, label, current_keeper, opening_hours, phone, email, description, homepage', 'exclude_from_listing',
      'collection_portal, used_in_activity, active_collection',
      // nested
      'address.*',
      'collection_image_main.*',
      'collection_images.directus_files_id.filename_disk',
      'dns_taxonomy_subjects.taxonomy_terms_id.label',
      'dns_taxonomy_genre.taxonomy_terms_id.label',
      'dns_objects_in_external_databases',
      'dns_objects_in_own_databases',
    ],
    collectionsShortList: [
      'id', 'spws_id', 'label'
    ],
    resources: [
      'id', 'status', 'slug', 'name', 'position','url', 'description', 'main_screenshot', 
      'bua_collections.bua_collections_id.label', 'bua_collections.bua_collections_id.id',
      'resource_screenshots.directus_files_id'
    ],
    projects: [
      '*', 'title', 'id', 'slug', 'sub_line', 'description', 'affiliation', 
      'images.directus_files_id.*', 'preview_image.*.*', 'display_sidebar', 'sidebar_content', 'cooperation_partners.institutions_id.name_short','cooperation_partners.institutions_id.logo'
    ],
    events: [
      '*.*'
    ],
    colonialContexts: [
      // '*.*',
      'id', 'status', 'title', 'slug', 'contact_info','spws_collections', 'description', 'trigger_warning',
    ],
  }
};