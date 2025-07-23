<script setup>
const theme = useState("theme")
const { locale } = useI18n();
const w = computed(() => theme.value.data.wording[locale.value]);


// config for specific page

// DEV: replace by slug from path
const slug = 'programm-sammlungstagung-2025'

const { data } = await useFetchPage(slug)
const page = data.value.data[0]

function formatContent(content) {
  if (!content) return content;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;

  const sections = [];
  let currentSection = null;
  let currentContent = '';

  // Process each child element
  Array.from(tempDiv.children).forEach(element => {
    if (element.tagName === 'H1') {
      // Save previous section if it exists
      if (currentSection) {
        sections.push({
          title: currentSection,
          content: currentContent.trim()
        });
      }

      // Start new section
      currentSection = element.innerHTML;
      currentContent = '';
    } else if (element.tagName === 'HR') {
      // End current section at HR
      if (currentSection) {
        sections.push({
          title: currentSection,
          content: currentContent.trim()
        });
        currentSection = null;
        currentContent = '';
      }
    } else if (currentSection) {
      // Add content to current section
      currentContent += element.outerHTML;
    } else {
      // Content before first H1 - keep as is
      currentContent += element.outerHTML;
    }
  });

  // Handle last section if no HR at end
  if (currentSection) {
    sections.push({
      title: currentSection,
      content: currentContent.trim()
    });
  }

  // Generate dropdown HTML
  let formattedContent = '';

  // Add any content before first H1
  if (sections.length > 0 && currentContent && !sections[0].title) {
    formattedContent += currentContent;
  }

  // Create dropdowns for each section
  sections.forEach((section, index) => {
    if (section.title) {
      formattedContent += `
        <div class="program-section">
          <details class="program-dropdown">
            <summary class="program-dropdown-header">
              <h1>${section.title}</h1>
              <span class="dropdown-icon">▼</span>
            </summary>
            <div class="program-dropdown-content">
              ${section.content}
            </div>
          </details>
        </div>
      `;
    } else {
      // Content without title (before first H1)
      formattedContent += section.content;
    }
  });

  return formattedContent;
}

let content = ref('');
onBeforeMount(() => {
  content = formatContent(useGetTranslatedContent('page_content', locale, page));
});

const sidebarContent = useGetTranslatedContent('sidebar_content', locale, page);

</script>

<template>

  <Head>
    <Title>Sammlungstagung 2025</Title>
  </Head>
  <div class="page collection-conference" v-if="data">
    <pre v-if="false">{{ page }}</pre>
    <!--  -->
    <h3>Jahrestagung für Universitätssammlungen</h3>
    <h1 class="page-header text-center mb-5">{{ useGetTranslatedContent('title', locale, page) }}</h1>
    <template v-if="!page.display_sidebar">
      <div class="page-content" v-html="content" />
    </template>
    <template v-if="page.display_sidebar">
      <div class="page-container">
        <div class="page-content" v-html="content" />
        <div class="sidebar">
          <div class="mb-5 sidebar-header" v-if="page.sidebar_header_image">
            <img :src="projectConfig.imageBaseUrl + '/' + page.sidebar_header_image + '?key=sidebar-header-contain'"
              alt="sidebar image" />
          </div>
          <div class="sidebar-content" v-if="sidebarContent" v-html="sidebarContent" />
        </div>
      </div>
    </template>
    <!-- -->
  </div>
</template>

<style scoped lang='scss'>
.collection-conference {
  h1 {
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .page-container {
    display: block;

    .page-content {
      // Program section dropdowns
      .program-section {
        margin-bottom: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
      }

      .program-dropdown {
        summary {
          list-style: none;
          cursor: pointer;
          padding: 1rem;
          background-color: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.2s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &::-webkit-details-marker {
            display: none;
          }

          &:hover {
            background-color: #e9ecef;
          }

          h1 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
          }

          .dropdown-icon {
            transition: transform 0.2s ease;
            font-size: 0.8rem;
            color: #6c757d;
          }
        }

        &[open] summary .dropdown-icon {
          transform: rotate(180deg);
        }

        .program-dropdown-content {
          padding: 1.5rem;
          background-color: white;

          h2 {
            margin-top: 0;
            margin-bottom: 1rem;
            font-size: 1rem;
            font-weight: 600;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;

            td {
              padding: 0.75rem;
              border-bottom: 1px solid #f0f0f0;
              vertical-align: top;

              &:first-child {
                font-weight: 600;
                white-space: nowrap;
                width: 150px;
              }
            }

            tr:last-child td {
              border-bottom: none;
            }
          }
        }
      }
    }

    .sidebar {
      font-size: var(--font-size-text-small);

      .sidebar-header {
        display: block;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .collection-conference {
    .page-container {
      display: flex;
      gap: 2.5rem;

      .page-content {
        flex: 2;

        .program-dropdown-content {
          table td:first-child {
            width: 200px;
          }
        }
      }

      .sidebar {
        flex: 1;

        .sidebar-header {
          display: block;
        }
      }
    }
  }
}
</style>
