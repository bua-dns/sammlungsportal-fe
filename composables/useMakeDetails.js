export function useMakeDetails(content, summaryTag = "H1") {
  if (!content) return content;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;

  const sections = [];
  let currentSection = null;
  let currentContent = "";
  let betweenHrAndSummaryTagContent = "";

  // Process each child element
  Array.from(tempDiv.children).forEach((element) => {
    if (element.tagName === summaryTag) {
      // Save previous section if it exists
      if (currentSection) {
        sections.push({
          title: currentSection,
          content: currentContent.trim(),
        });
      }

      // Add any content that was between HR and this summaryTag
      if (betweenHrAndSummaryTagContent.trim()) {
        sections.push({
          title: null,
          content: betweenHrAndSummaryTagContent.trim(),
        });
        betweenHrAndSummaryTagContent = "";
      }

      // Start new section
      currentSection = element.innerHTML;
      currentContent = "";
    } else if (element.tagName === "HR") {
      // End current section at HR
      if (currentSection) {
        sections.push({
          title: currentSection,
          content: currentContent.trim(),
        });
        currentSection = null;
        currentContent = "";
      }
      // Reset content collector for content after HR
      betweenHrAndSummaryTagContent = "";
    } else if (currentSection) {
      // Add content to current section
      currentContent += element.outerHTML;
    } else {
      // Content outside of sections (before first summaryTag or after HR)
      betweenHrAndSummaryTagContent += element.outerHTML;
    }
  });

  // Handle last section if no HR at end
  if (currentSection) {
    sections.push({
      title: currentSection,
      content: currentContent.trim(),
    });
  }

  // Handle any remaining content after last HR
  if (betweenHrAndSummaryTagContent.trim()) {
    sections.push({
      title: null,
      content: betweenHrAndSummaryTagContent.trim(),
    });
  }

  // Generate dropdown HTML
  let formattedContent = "";

  // Create dropdowns for each section
  sections.forEach((section, index) => {
    if (section.title) {
      formattedContent += `
        <div class="program-section">
          <details class="program-dropdown">
            <summary class="program-dropdown-header">
              ${section.title}
            </summary>
            <div class="program-dropdown-content">
              ${section.content}
            </div>
          </details>
        </div>
      `;
    } else {
      // Content without title (before first summaryTag or between HR and summaryTag)
      formattedContent += section.content;
    }
  });

  return formattedContent;
}