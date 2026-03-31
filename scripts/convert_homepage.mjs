import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const legacyDir = path.join(__dirname, '../_legacy');
const content = fs.readFileSync(path.join(legacyDir, 'trangchu.html'), 'utf8');

const startIndex = content.indexOf('<section class="category-page pt-3">');
const endIndex = content.indexOf('<!-- Footer -->');

if (startIndex !== -1 && endIndex !== -1) {
  let inner = content.substring(startIndex, endIndex);

  // Replace html extensions in hrefs so React Router works correctly
  inner = inner.replace(/href="([^"h]+)\.html"/g, 'href="/$1"');
  
  // Also we want to preserve ALL inner content!
  const safeHtml = inner.replace(/`/g, '\\`').replace(/\\$/g, '\\$');

  const tsxTemplate = `import React from 'react';
import Layout from '../components/Layout';
import '../index.css';

const HomePage = () => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: \`${safeHtml}\` }} />
    </Layout>
  );
};

export default HomePage;
`;

  fs.writeFileSync(path.join(__dirname, '../src/pages/HomePage.tsx'), tsxTemplate);
  console.log('HomePage.tsx generated!');
} else {
  console.error("Could not find section or footer in trangchu.html");
}
