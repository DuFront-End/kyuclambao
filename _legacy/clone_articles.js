const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const articles = [
    { title: 'Giải báo chí Diên Hồng lần thứ 4: VOV xuất sắc giành 2 giải thưởng', url: 'https://baoxuan.vov.vn/chinh-tri/giai-bao-chi-dien-hong-lan-thu-4-vov-xuat-sac-gianh-2-giai-thuong-post1254990.vov', slug: 'article' },
    { title: 'Khi quan chức "Mua danh ba vạn, bán danh ba đồng"', url: 'https://vov.vn/emagazine/khi-quan-chuc-mua-danh-ba-van-ban-danh-ba-dong-1076115.vov', slug: 'khi-quan-chuc' },
    { title: 'Kỷ niệm đặc biệt của vị tướng phi công với Đại tướng Võ Nguyên Giáp', url: 'https://vov.vn/emagazine/ky-niem-dac-biet-cua-vi-tuong-phi-cong-voi-dai-tuong-vo-nguyen-giap-1076300.vov', slug: 'ki-niem-vi-tuong' },
    { title: 'Đón Tết ở Trường Sa', url: 'https://baoxuan.vov.vn/xa-hoi/don-tet-o-truong-sa-post1076232.vov', slug: 'don-tet-truong-sa' },
    { title: 'Cây nước biết nghe lời và lời tạm biệt bình 20 lít', url: 'https://baoxuan.vov.vn/doanh-nghiep/thong-tin-doanh-nghiep/cay-nuoc-biet-nghe-loi-va-loi-tam-biet-binh-20-lit-post1263175.vov', slug: 'cay-nuoc-biet-nghe-loi' },
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
    console.log('--- Bắt đầu nhân bản 100% trang web VOV ---');

    for (let article of articles) {
        process.stdout.write(`Đang tải trang đầy đủ: ${article.slug}... `);
        try {
            const res = await axios.get(article.url, { timeout: 15000 });
            const html = res.data;
            const $ = cheerio.load(html);

            // Determine base URl to fix absolute paths
            const urlObj = new URL(article.url);
            const baseUrl = urlObj.origin; // e.g. https://baoxuan.vov.vn or https://vov.vn

            // Fix all css files and links
            $('link[href]').each((i, el) => {
                let href = $(el).attr('href');
                if (href && href.startsWith('/')) {
                    $(el).attr('href', baseUrl + href);
                } else if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('data:')) {
                    $(el).attr('href', baseUrl + '/' + href);
                }
            });

            // Fix all JS files
            $('script[src]').each((i, el) => {
                let src = $(el).attr('src');
                if (src && src.startsWith('/')) {
                    $(el).attr('src', baseUrl + src);
                } else if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
                     $(el).attr('src', baseUrl + '/' + src);
                }
            });

            // Fix all internal images
            $('img[src]').each((i, el) => {
                let src = $(el).attr('src');
                if (src && src.startsWith('/')) {
                   // Sometimes they use data-src for lazy load or vov specific classes
                   $(el).attr('src', baseUrl + src);
                } else if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
                   $(el).attr('src', baseUrl + '/' + src);
                }
            });

            // Some VOV elements use data-src or data-original
            $('[data-src]').each((i, el) => {
                let src = $(el).attr('data-src');
                 if (src && src.startsWith('/')) {
                   $(el).attr('data-src', baseUrl + src);
                } else if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
                   $(el).attr('data-src', baseUrl + '/' + src);
                }
            });

            // Replace homepage and internal VOV links to the local 'trangchu.html' to keep navigation loop closed
            // Match exactly with the base domain or `/`
            $('a[href]').each((i, el) => {
                 let href = $(el).attr('href');
                 if (href === '/' || href === baseUrl || href === baseUrl + '/') {
                     $(el).attr('href', 'trangchu.html');
                 } else if (href && href.startsWith('/')) {
                     $(el).attr('href', baseUrl + href);
                 }
            });

            // Optional: Hardcode internal links pointing to subcategories locally
            // e.g. "Ký ức làm báo" from VOV to our trangchu.html
            $('a:contains("Ký ức làm báo"), a:contains("Đất nước vào xuân"), a:contains("Trang chủ")').each((i, el) => {
                 $(el).attr('href', 'trangchu.html');
            });

            const outFileName = `${article.slug}.html`;
            fs.writeFileSync(path.join(__dirname, outFileName), $.html());
            console.log(`✅ Đã nhân bản xong: ${outFileName}`);

        } catch (e) {
            console.log(`❌ Lỗi tải bài viết (${article.slug}): ${e.message}`);
        }
    }
}

main();
