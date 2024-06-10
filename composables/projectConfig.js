export const projectConfig = {
  dataBaseUrl: "https://sammlungsportal.bua-dns.de/items",
  imageBaseUrl: "https://sammlungsportal.bua-dns.de/assets",
  fields: {
    resources: [
      'id', 'name', 'url', 'description', 'main_screenshot', 
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
  }
};