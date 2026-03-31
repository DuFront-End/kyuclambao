const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const articles = [
    { title: 'Khi quan chức "Mua danh ba vạn, bán danh ba đồng"', url: 'https://vov.vn/emagazine/khi-quan-chuc-mua-danh-ba-van-ban-danh-ba-dong-1076115.vov', slug: 'khi-quan-chuc' },
    { title: 'Kỷ niệm đặc biệt của vị tướng phi công với Đại tướng Võ Nguyên Giáp', url: 'https://vov.vn/emagazine/ky-niem-dac-biet-cua-vi-tuong-phi-cong-voi-dai-tuong-vo-nguyen-giap-1076300.vov', slug: 'ki-niem-vi-tuong' },
    { title: 'Đón Tết ở Trường Sa', url: 'https://baoxuan.vov.vn/xa-hoi/don-tet-o-truong-sa-post1076232.vov', slug: 'don-tet-truong-sa' },
    { title: 'Sao Việt 31/3: Hoa hậu Ý Nhi công khai khoảnh khắc tình tứ bên bạn trai', url: 'https://baoxuan.vov.vn/giai-tri/sao-viet/sao-viet-313-hoa-hau-y-nhi-cong-khai-khoanh-khac-tinh-tu-ben-ban-trai-post1279951.vov', slug: 'sao-viet-313' },
    { title: 'Nhóm nhạc BTS chia sẻ: “Vị trí số 1 trên bảng xếp hạng Billboard là vinh dự lớn”', url: 'https://baoxuan.vov.vn/giai-tri/nhom-nhac-bts-chia-se-vi-tri-so-1-tren-bang-xep-hang-billboard-la-vinh-du-lon-post1280040.vov', slug: 'bts-vinh-du-lon' },
    { title: 'Quách Thu Phương: “Càng về sau, bà Dung càng cực đoan và khiến khán giả ghét hơn”', url: 'https://baoxuan.vov.vn/giai-tri/quach-thu-phuong-cang-ve-sau-ba-dung-cang-cuc-doan-va-khien-khan-gia-ghet-hon-post1279823.vov', slug: 'quach-thu-phuong' },
    { title: 'Juky San xin lỗi sau ồn ào chụp ảnh bikini tại Giếng Tiên', url: 'https://baoxuan.vov.vn/giai-tri/juky-san-xin-loi-sau-on-ao-chup-anh-bikini-tai-gieng-tien-post1279866.vov', slug: 'juky-san' },
    { title: 'Hoa hậu Hà Trúc Linh gây thương nhớ bởi vẻ đẹp trong trẻo, nhẹ nhàng', url: 'https://baoxuan.vov.vn/giai-tri/hoa-hau-ha-truc-linh-gay-thuong-nho-boi-ve-dep-trong-treo-nhe-nhang-post1279833.vov', slug: 'ha-truc-linh' },
    { title: '2 năm không hoạt động, GREY D lấy đâu ra tiền làm album?', url: 'https://baoxuan.vov.vn/giai-tri/2-nam-khong-hoat-dong-grey-d-lay-dau-ra-tien-lam-album-post1279817.vov', slug: 'grey-d' },
    { title: 'Lý do Phương Oanh đăng quang Hoa hậu dù đối thủ nói tiếng Anh tốt hơn?', url: 'https://baoxuan.vov.vn/giai-tri/ly-do-phuong-oanh-dang-quang-hoa-hau-du-doi-thu-noi-tieng-anh-tot-hon-post1279807.vov', slug: 'phuong-oanh' },
    { title: 'Học vấn của tân Hoa hậu và hai Á hậu Miss World Vietnam 2025', url: 'https://baoxuan.vov.vn/giai-tri/hoc-van-cua-tan-hoa-hau-va-hai-a-hau-miss-world-vietnam-2025-post1279722.vov', slug: 'hoc-van-hoa-hau' },
    { title: 'Sao Việt 30/3: Khương Lê "Hẹn em ngày nhật thực" gây chú ý với visual lãng tử', url: 'https://baoxuan.vov.vn/giai-tri/sao-viet/sao-viet-303-khuong-le-hen-em-ngay-nhat-thuc-gay-chu-y-voi-visual-lang-tu-post1279583.vov', slug: 'khuong-le' },
    { title: 'Bị chửi mắng khi đóng người mẹ đáng ghét nhất màn ảnh, Quách Thu Phương nói gì?', url: 'https://baoxuan.vov.vn/giai-tri/bi-chui-mang-khi-dong-nguoi-me-dang-ghet-nhat-man-anh-quach-thu-phuong-noi-gi-post1279552.vov', slug: 'quach-thu-phuong-2' }
];

async function main() {
    console.log('--- Bắt đầu xây dựng các bài viết ---');

    // Load original template
    const templatePath = path.join(__dirname, 'article.html');
    let templateHTML = '';
    try {
        templateHTML = fs.readFileSync(templatePath, 'utf8');
    } catch (e) {
        console.error('Không tìm thấy file article.html làm template');
        return;
    }

    const templateDom = cheerio.load(templateHTML);
    const originalContentHtml = templateDom('.article-content-vov').first().html();
    const originalSapoHtml = templateDom('.article-sapo-v2').first().html();

    let trangchuHtml = fs.readFileSync(path.join(__dirname, 'trangchu.html'), 'utf8');
    const $trangchu = cheerio.load(trangchuHtml);

    for (let article of articles) {
        process.stdout.write(`Đang tải: ${article.slug}... `);
        try {
            const res = await axios.get(article.url, { timeout: 10000 });
            const html = res.data;
            const $ = cheerio.load(html);

            // Fetch metadata with multiple selectors
            let h1 = $('h1.article-title').text().trim() || 
                     $('h1').first().text().trim() || 
                     article.title;

            let datetime = $('.article-date').text().trim() || 
                           $('.date-public').text().trim() || 
                           $('.date').text().trim() || 
                           'Thứ năm, 18/12/2025';

            let author = $('.article-author').text().trim() || 
                         $('.author-name').text().trim() || 
                         $('.vov-author').text().trim() || 
                         'PV/VOV.VN';

            let sapo = $('.article-sapo').text().trim() || 
                       $('.sapo').text().trim() || 
                       $('.vov-sapo').text().trim() || 
                       '';

            // Special handling for eMagazine
            let content = '';
            if ($('article.article-content').length) {
                content = $('article.article-content').html();
            } else if ($('#article-body').length) {
                content = $('#article-body').html();
            } else if (article.url.includes('emagazine')) {
                // eMagazine parsing is complex, grab all <p> and <img>
                let sections = [];
                $('p, .emagazine-img img, figure img').each((i, el) => {
                    if (el.tagName === 'p') sections.push(`<p>${$(el).text()}</p>`);
                    if (el.tagName === 'img') {
                        const src = $(el).attr('src') || $(el).attr('data-src');
                        if (src) sections.push(`<figure><img src="${src}" class="img-fluid border-radius-8px w-100" /></figure>`);
                    }
                });
                content = sections.join('');
            }

            // Fallbacks to default template layout if scraping fails
            if (!content || content.length < 100) {
                content = `<p><i>(Nội dung bài viết đang được cập nhật...)</i></p>` + originalContentHtml;
            }
            if (!sapo) sapo = originalSapoHtml;

            // Generate the new file
            let $template = cheerio.load(templateHTML);
            $template('title').text(`${h1} | Báo Xuân VOV`);
            $template('.header-tier-2 h1.article-title-v2').text(`"${h1}"`);
            $template('.header-datetime').text(datetime);
            $template('.header-author-v2').text(author);
            $template('.article-sapo-v2').html(`<strong>VOV.VN -</strong> ${sapo.replace('VOV.VN -', '')}`);
            $template('.reading-container .article-content-vov').html(content);

            const outFileName = `${article.slug}.html`;
            fs.writeFileSync(path.join(__dirname, outFileName), $template.html());
            console.log(`✅ Đã lưu ${outFileName}`);

            // Replace href in trangchu.html
            $trangchu('a.title-highlight').each((i, el) => {
                const aText = $trangchu(el).text().trim().toLowerCase();
                const targetText = article.title.toLowerCase().replace(/['"“”,:]/g, '');
                if (aText.replace(/['"“”,:]/g, '').includes(targetText) || targetText.includes(aText.replace(/['"“”,:]/g, ''))) {
                    // Update this A tag
                    $trangchu(el).attr('href', outFileName);
                    // Also update any previous A tag that wraps an image representing this article
                    let prevA = $trangchu(el).parent().prev('a'); // <a href="#"><img ...></a>
                    if (prevA.length && prevA.find('img').length) {
                        prevA.attr('href', outFileName);
                    } else {
                         // Some articles use .row > .col-12 where image is in a sibling col
                         let row = $trangchu(el).closest('.row');
                         row.find('img').closest('div').prev('div').find('a').attr('href', outFileName); // Text part
                    }
                }
            });

        } catch (e) {
            console.log(`❌ Lỗi tải bài viết: ${e.message}`);
        }
    }

    // Advanced replacement logic for trangchu.html: Just string matching inside the HTML
    let updatedTrangChuContent = trangchuHtml;
    // Replace href="#" to href="somefile.html" for the specific block
    for (const item of articles) {
         const cleanQuote = str => str.replace(/['"“”]/g, '');
         // Find block in original text
         const titleSnippet = item.title;
         // Since Cheerio manipulates DOM, we can output cheerio directly.
    }
    
    // We will do a generic regex replace for each article in string form to be 100% safe
    // as cheerio outputting might mess up some `<br/>` or specific formatting
    let stringHTML = fs.readFileSync(path.join(__dirname, 'trangchu.html'), 'utf8');
    for (let item of articles) {
        // Find the title in HTML, grab its preceding <a href="#"> and change it.
        // Complex, so let's stick to cheerio's manipulated output, but format it cleanly.
    }
    
    // Save trangchu.html
    fs.writeFileSync(path.join(__dirname, 'trangchu.html'), $trangchu.html());
    console.log('✅ Đã cập nhật link trangchu.html');
}

main();
