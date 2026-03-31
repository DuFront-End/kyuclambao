import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const legacyDir = path.join(__dirname, '../_legacy');
const content = fs.readFileSync(path.join(legacyDir, 'trangchu.html'), 'utf8');

// I'll extract articles manually because there are only 14-15 articles
// But let me try simple regex on .cart-article and .article-item

const articles = [];

// 1. match small article-items in the list
const listRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
let match;
while ((match = listRegex.exec(content)) !== null) {
  const itemHtml = match[1];
  
  const linkMatch = itemHtml.match(/href="([^"]+\.html)"/);
  const titleMatch = itemHtml.match(/<h5>([\s\S]*?)<\/h5>/);
  const descMatch = itemHtml.match(/<p[^>]*description[^>]*>([\s\S]*?)<\/p>/);
  const imgMatch = itemHtml.match(/<img[^>]*src="([^"]+)"/);

  if (linkMatch && titleMatch && descMatch) {
    let link = linkMatch[1];
    link = link.replace('.html', '');
    
    articles.push({
      id: link.replace('/', ''),
      title: titleMatch[1].trim().replace(/<[^>]+>/g, ''),
      description: descMatch[1].trim().replace(/<[^>]+>/g, ''),
      link: "/" + link.split('/').pop(),
      imageUrl: imgMatch ? imgMatch[1] : ''
    });
  }
}

// 2. match .cart-article blocks at the top
const topRegex = /<div class="cart-article[^"]*">([\s\S]*?)<\/div>\s*(?:<hr[^>]*>|<\/div>)/gi;
while ((match = topRegex.exec(content)) !== null) {
  const itemHtml = match[1];
  
  const linkMatch = itemHtml.match(/href="([^"]+\.html)"/);
  const titleMatch = itemHtml.match(/class="title-highlight[^"]*"[^>]*>([\s\S]*?)<\/a>/);
  const descMatch = itemHtml.match(/class="description[^"]*"[^>]*>([\s\S]*?)<\/a>/);
  const imgMatch = itemHtml.match(/<img[^>]*src="([^"]+)"/);

  if (linkMatch && titleMatch && descMatch) {
    let link = linkMatch[1];
    link = link.replace('.html', '');

    // Avoid duplicates if same link
    const existing = articles.find(a => a.link === "/" + link.split('/').pop());
    if (!existing) {
      articles.push({
        id: link.replace('/', ''),
        title: titleMatch[1].trim().replace(/<[^>]+>/g, ''),
        description: descMatch[1].trim().replace(/<[^>]+>/g, ''),
        link: "/" + link.split('/').pop(),
        imageUrl: imgMatch ? imgMatch[1] : ''
      });
    }
  }
}

// 3. For the very first top-left big article, it might end with hr differently
// Let's do a hardcoded check for the first article just in case:
const firstArticleRegex = /<a href="([^"]+\.html)"><img class="img-fluid border-radius-8px w-100" src="([^"]+)"[^>]*><\/a>\s*<div class="mt-2">\s*<a class="title-highlight d-block" href="[^"]+">([^<]+)<\/a>\s*<\/div>\s*<div class="mt-2">\s*<a class="description d-block text-2-line" href="[^"]+">([^<]+)<\/a>/;
const firstMatch = content.match(firstArticleRegex);
if(firstMatch) {
    let link = firstMatch[1].replace('.html', '');
    const existing = articles.find(a => a.link === "/" + link.split('/').pop());
    if (!existing) {
       articles.push({
        id: link.replace('/', ''),
        title: firstMatch[3].trim(),
        description: firstMatch[4].trim(),
        link: "/" + link.split('/').pop(),
        imageUrl: firstMatch[2]
      });
    }
}

const dirPath = path.join(__dirname, '../src/data');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const tsContent = `export interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

export const articles: Article[] = ${JSON.stringify(articles, null, 2)};
`;

fs.writeFileSync(path.join(dirPath, 'articles.ts'), tsContent);
console.log('src/data/articles.ts generated with ' + articles.length + ' articles!');
