import markdownParser from '@nuxt/content/transformers/markdown';
export const parseMarkdown = md => markdownParser.parse('custom.md', md);