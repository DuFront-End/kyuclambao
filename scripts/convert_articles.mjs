import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const legacyDir = path.join(__dirname, '../_legacy');
const outDir = path.join(__dirname, '../src/pages/articles');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.html') && f !== 'trangchu.html');

for (const file of files) {
  try {
    const content = fs.readFileSync(path.join(legacyDir, file), 'utf8');
    
    // Extract head styles and links
    const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    let stylesAndLinks = '';
    if (headMatch) {
      const headHtml = headMatch[1];
      const linkRegex = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
      const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
      
      const links = headHtml.match(linkRegex) || [];
      const styles = headHtml.match(styleRegex) || [];
      stylesAndLinks = [...links, ...styles].join('\n');
    }

    // Extract body content
    let bodyContent = '';
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      bodyContent = bodyMatch[1];
    } else {
      bodyContent = content;
    }

    const componentName = file
      .replace('.html', '')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    // Combine styles and body
    const fullContent = stylesAndLinks + '\\n' + bodyContent;
    
    // Replace html extensions in hrefs so React Router works smoothly (except absolute links)
    const fixedContent = fullContent.replace(/href="([^"h]+)\.html"/g, 'href="/$1"');

    // Escape backticks and dollars for template literal
    const safeHtml = fixedContent.replace(/`/g, '\\`').replace(/\\$/g, '\\$');

    const tsxTemplate = `import React from 'react';

const ${componentName} = () => {
  return (
    <div className="article-standalone" dangerouslySetInnerHTML={{ __html: \`${safeHtml}\` }} />
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
