const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const articles = [
    { title: 'Nhóm nhạc BTS chia sẻ: “Vị trí số 1 trên bảng xếp hạng Billboard là vinh dự lớn”', slug: 'bts-vinh-du-lon' },
    { title: 'Sao Việt 31/3: Hoa hậu Ý Nhi công khai khoảnh khắc tình tứ bên bạn trai', slug: 'sao-viet-313' },
    { title: 'Quách Thu Phương: “Càng về sau, bà Dung càng cực đoan và khiến khán giả ghét hơn”', slug: 'quach-thu-phuong' },
    { title: 'Juky San xin lỗi sau ồn ào chụp ảnh bikini tại Giếng Tiên', slug: 'juky-san' },
    { title: 'Hoa hậu Hà Trúc Linh gây thương nhớ bởi vẻ đẹp trong trẻo, nhẹ nhàng', slug: 'ha-truc-linh' },
    { title: '2 năm không hoạt động, GREY D lấy đâu ra tiền làm album?', slug: 'grey-d' },
    { title: 'Lý do Phương Oanh đăng quang Hoa hậu dù đối thủ nói tiếng Anh tốt hơn?', slug: 'phuong-oanh' },
    { title: 'Học vấn của tân Hoa hậu và hai Á hậu Miss World Vietnam 2025', slug: 'hoc-van-hoa-hau' },
    { title: 'Sao Việt 30/3: Khương Lê "Hẹn em ngày nhật thực" gây chú ý với visual lãng tử', slug: 'khuong-le' },
    { title: 'Bị chửi mắng khi đóng người mẹ đáng ghét nhất màn ảnh, Quách Thu Phương nói gì?', slug: 'quach-thu-phuong-2' }
];

let trangchuHtml = fs.readFileSync(path.join(__dirname, 'trangchu.html'), 'utf8');
const $trangchu = cheerio.load(trangchuHtml);

$trangchu('a').each((i, el) => {
    const aText = $trangchu(el).text().trim().toLowerCase();
    if (!aText) return;
    
    for (let article of articles) {
        const targetText = article.title.toLowerCase().replace(/['"“”,:]/g, '');
        const cleanA = aText.replace(/['"“”,:]/g, '');
        
        if (cleanA.includes(targetText) || targetText.includes(cleanA)) {
            $trangchu(el).attr('href', `${article.slug}.html`);
            
            // Fix image sibling wrapper. In `.article-item`, the image is in another column:
            // `.row` > col text > a (which we just fixed)
            // `.row` > col img > img
            let rowWrapper = $trangchu(el).closest('.article-item');
            if (rowWrapper.length) {
                // Wrap the img with a link if it doesn't already have one
                let imgCol = rowWrapper.find('.col-5');
                let linkCheck = imgCol.find('a');
                if (linkCheck.length === 0) {
                     let imgHtml = imgCol.html();
                     imgCol.html(`<a href="${article.slug}.html">${imgHtml}</a>`);
                } else {
                     linkCheck.attr('href', `${article.slug}.html`);
                }
            }
        }
    }
});

fs.writeFileSync(path.join(__dirname, 'trangchu.html'), $trangchu.html());
console.log('✅ Đã sửa tất cả link trong trangchu.html');
