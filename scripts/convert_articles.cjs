const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const legacyDir = path.join(__dirname, '../_legacy');
const outDir = path.join(__dirname, '../src/pages/articles');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.html') && f !== 'trangchu.html');

for (const file of files) {
  try {
    const content = fs.readFileSync(path.join(legacyDir, file), 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });
    
    // Extract main article section
    let articleContent = '';
    const detailWrap = $('.detail-wrap');
    if (detailWrap.length > 0) {
      articleContent = detailWrap.parent().parent().parent().html();
    } else {
      const section = $('section.page-detail');
      if (section.length > 0) {
        articleContent = section.html() || '';
      } else {
        articleContent = $('body').html();
      }
    }

    // Clean up unwanted tags
    if (articleContent) {
      articleContent = articleContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      articleContent = articleContent.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    }

    if(!articleContent) {
      articleContent = "<div>Article Content Here</div>";
    }

    const componentName = file
      .replace('.html', '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    // Escape backticks and dollars for template literal
    const safeHtml = articleContent.replace(/`/g, '\\`').replace(/\\$/g, '\\$');

    const tsxTemplate = `import React from 'react';
import Layout from '../../components/Layout';

const ${componentName} = () => {
  return (
    <Layout>
      <section className="page-detail article-page pt-3" dangerouslySetInnerHTML={{ __html: \`${safeHtml}\` }} />
    </Layout>
  );
};

export default ${componentName};
`;

    fs.writeFileSync(path.join(outDir, `${componentName}.tsx`), tsxTemplate);
    console.log(`Generated ${componentName}.tsx from ${file}`);
  } catch (e) {
    console.error('Error on ' + file, e);
  }
}
