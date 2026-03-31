import React from 'react';
import Layout from '../components/Layout';
import '../index.css';

const HomePage = () => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: `<section class="category-page pt-3">
        <div class="container-xxl">
            <div class="row justify-content-center">
                <div class="col-12 col-md-12 col-lg-12">
                    <div class="custom-article mb-4">
                        <div class="row g-0">
                            <div class="col-12 col-md-4">
                                <h2 class="px-4 py-2"><span>Ký ức làm báo</span></h2>
                            </div>
                            <div class="col-12 col-md-8 position-relative">
                                <div class="triangle-wrap"></div>
                                <div class="w-100 h-100" style="background:#f6ebd1; border-radius:16px 16px 0 0"></div>
                            </div>
                        </div>

                        <section class="p-4 fix-border-radius-16px" style="background:#f6ebd1; border-radius:16px 0 16px 16px">
                            <div class="row g-3">
                                <!-- Top Left Big Article -->
                                <div class="col-12 col-md-6">
                                    <div class="cart-article">
                                        <a href="/article"><img class="img-fluid border-radius-8px w-100" src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2025-12/2665117610010589545_11.jpg" alt="Giải báo chí Diên Hồng"></a>
                                        <div class="mt-2">
                                            <a class="title-highlight d-block" href="/article">Giải báo chí Diên Hồng lần thứ 4: VOV xuất sắc giành 2 giải thưởng</a>
                                        </div>
                                        <div class="mt-2">
                                            <a class="description d-block text-2-line" href="/article">VOV.VN - Lễ trao Giải Báo chí toàn quốc về Quốc hội và Hội đồng nhân dân (Giải Diên Hồng) lần thứ tư năm 2026 đã được tổ chức tối 18/12 tại Cung Văn hóa Lao động Hữu nghị Việt - Xô (Hà Nội).</a>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="cart-article">
                                        <div class="row gx-3 gy-2">
                                            <div class="col-12">
                                                <a class="title-highlight d-block" href="khi-quan-chuc.html">Khi quan chức "Mua danh ba vạn, bán danh ba đồng"</a>
                                            </div>
                                            <div class="col-7 col-md-6 order-2 order-md-1">
                                                <a class="description text-2-line d-block" href="khi-quan-chuc.html">VOV.VN - Khi thực thi công vụ, có những cán bộ hay "lên mặt làm quan cách mạng" để vòi vĩnh, rồi lúc hầu tòa thì tìm đủ mọi lý do biện minh cho việc làm sai trái.</a>
                                            </div>
                                            <div class="col-5 col-md-6 order-1 order-md-2">
                                                <img class="img-fluid border-radius-8px w-100 mt-1" src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2024-02/khi quan chức mua danh ba vạn bánh danh ba đồng.png" alt="Quan chức">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Top Right Articles -->
                                <div class="col-12 col-md-6">
                                    <div class="cart-article mb-4">
                                        <div class="row gx-3 gy-2">
                                            <div class="col-12">
                                                <a class="title-highlight d-block" href="/ki-niem-vi-tuong">Kỷ niệm đặc biệt của vị tướng phi công với Đại tướng Võ Nguyên Giáp</a>
                                            </div>
                                            <div class="col-7 col-md-6 order-2 order-md-1">
                                                <a class="description text-2-line d-block" href="/ki-niem-vi-tuong">VOV.VN - Việc hai cha con cùng là phi công đối với Thượng tướng Võ Văn Tuấn là sự tiếp nối, kế tục rất tự hào.</a>
                                            </div>
                                            <div class="col-5 col-md-6 order-1 order-md-2">
                                                <img class="img-fluid border-radius-8px w-100 mt-1" src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2024-02/Vị tướng phi công.png" alt="Vị tướng phi công">
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="d-block d-md-none">
                                    <div class="cart-article mb-4">
                                        <div class="row gx-3 gy-2">
                                            <div class="col-12">
                                                <a class="title-highlight d-block" href="/don-tet-truong-sa">Đón Tết ở Trường Sa</a>
                                            </div>
                                            <div class="col-7 col-md-6 order-2 order-md-1">
                                                <a class="description text-2-line d-block" href="/don-tet-truong-sa">VOV.VN - Tiếng chuông chùa, mùi khói hương, sự háo hức vui tươi của trẻ thơ khi diện bộ quần áo mới ngày Tết ở Trường Sa.</a>
                                            </div>
                                            <div class="col-5 col-md-6 order-1 order-md-2">
                                                <img class="img-fluid border-radius-8px w-100 mt-1" src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2024-02/di chua dau nam o truong sa.jpg" alt="Trường Sa">
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="d-block d-md-none">
                                    <div class="cart-article">
                                        <div class="row gx-3 gy-2">
                                            <div class="col-12">
                                                <a class="title-highlight d-block" href="cay-nuoc-biet-nghe-loi.html">Cây nước biết nghe lời và lời tạm biệt bình 20 lít</a>
                                            </div>
                                            <div class="col-7 col-md-6 order-2 order-md-1">
                                                <a class="description text-2-line d-block" href="cay-nuoc-biet-nghe-loi.html">VOV.VN - Khách vừa bước vào nhà, bạn đang ngồi trên sofa. Thay vì đứng dậy đi bấm nút đun nước như bao lần, bạn chỉ cần nói "Xin chào FujiHOME, bật chế độ pha trà".</a>
                                            </div>
                                            <div class="col-5 col-md-6 order-1 order-md-2">
                                                <img class="img-fluid border-radius-8px w-100 mt-1" src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-01/fu1.jpg" alt="Cây nước">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Articles List -->
                    <div class="views-element-container mt-4 p-4" style="background-color:#F8F1E1; border-radius:16px;">
                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="bts-vinh-du-lon.html" style="text-decoration:none"><h5>Nhóm nhạc BTS chia sẻ: “Vị trí số 1 trên bảng xếp hạng Billboard là vinh dự lớn”</h5></a>
                                <p class="mb-0 description">VOV.VN - Nhóm nhạc K-pop đình đám BTS cho biết họ vô cùng vinh dự khi đứng đầu bảng xếp hạng Billboard của Mỹ với album mới “Arirang”, đồng thời bày tỏ hy vọng album và ca khúc chủ đề “Swim” sẽ mang đến sự can đảm và an ủi cho người nghe trên toàn thế giới.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="bts-vinh-du-lon.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/bts_8.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Nhóm nhạc BTS chia sẻ: “Vị trí số 1 trên bảng xếp hạng Billboard là vinh dự lớn”">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="/sao-viet-313" style="text-decoration:none"><h5>Sao Việt 31/3: Hoa hậu Ý Nhi công khai khoảnh khắc tình tứ bên bạn trai</h5></a>
                                <p class="mb-0 description">VOV.VN - Sao Việt 31/3: Hoa hậu Ý Nhi thoải mái thể hiện cử chỉ thân mật với Anh Kiệt khi bạn trai đến ủng hộ tinh thần cô tại chung kết Miss World Vietnam 2025 ở TP HCM.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="/sao-viet-313">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/y-nhi-anh-kiet-1-1774840673-7412-1774842848.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Sao Việt 31/3: Hoa hậu Ý Nhi công khai khoảnh khắc tình tứ bên bạn trai">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="quach-thu-phuong.html" style="text-decoration:none"><h5>Quách Thu Phương: “Càng về sau, bà Dung càng cực đoan và khiến khán giả ghét hơn”</h5></a>
                                <p class="mb-0 description">VOV.VN - Từ một “mỹ nhân màn ảnh” với vẻ đẹp đài các trong các bộ phim như “Của để dành”, “Hà Nội mùa đông năm 46”, NSƯT Quách Thu Phương gây tranh cãi dữ dội khi trở thành "người mẹ đáng ghét nhất màn ảnh" trong bộ phim "Bước chân vào đời".</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="quach-thu-phuong.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2026-03/21ce365c02e08cbed5f1.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Quách Thu Phương">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="/juky-san" style="text-decoration:none"><h5>Juky San xin lỗi sau ồn ào chụp ảnh bikini tại Giếng Tiên</h5></a>
                                <p class="mb-0 description">VOV.VN - Sau loạt ảnh chụp bikini tại Giếng Tiên (Gia Lai) gây tranh cãi, Juky San đã lên tiếng xin lỗi, thừa nhận thiếu sót trong quá trình thực hiện bộ ảnh và mong nhận được sự thông cảm từ khán giả cùng người dân địa phương.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="/juky-san">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/658141667_1415679453690488_6469220858727257557_n.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Juky San">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="ha-truc-linh.html" style="text-decoration:none"><h5>Hoa hậu Hà Trúc Linh gây thương nhớ bởi vẻ đẹp trong trẻo, nhẹ nhàng</h5></a>
                                <p class="mb-0 description">VOV.VN - Sau gần 1 năm đăng quang ngôi vị cao nhất tại cuộc thi Hoa hậu Việt Nam 2024, Hà Trúc Linh vẫn là cái tên thu hút sự chú ý của công chúng nhờ vẻ ngoài ngọt ngào và lối sống kín tiếng.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="ha-truc-linh.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/c4d727cf208aa1d4f89b.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Hà Trúc Linh">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="/grey-d" style="text-decoration:none"><h5>2 năm không hoạt động, GREY D lấy đâu ra tiền làm album?</h5></a>
                                <p class="mb-0 description">VOV.VN - Giai đoạn trước khi tạm ngưng, GREY D sở hữu danh xưng "hoàng tử nhạc số" với vị thế vững chắc trên thị trường. Tuy nhiên, nam ca sĩ tiết lộ anh đã chủ động xin công ty chủ quản cho phép tạm dừng hoạt động trong 2 năm.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="/grey-d">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/8c25e0b1bcf43daa64e5.jpg" class="img-fluid w-100" style="border-radius:16px" alt="GREY D">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="phuong-oanh.html" style="text-decoration:none"><h5>Lý do Phương Oanh đăng quang Hoa hậu dù đối thủ nói tiếng Anh tốt hơn?</h5></a>
                                <p class="mb-0 description">VOV.VN - Sau chung kết Miss World Vietnam 2025, việc một số thí sinh có khả năng tiếng Anh tốt nhưng không đăng quang đã gây tranh luận. Trước ý kiến này, ban tổ chức khẳng định ngoại ngữ không phải yếu tố quyết định, thay vào đó là sự đánh giá toàn diện về nhan sắc, kỹ năng, bản lĩnh và hành trình của thí sinh.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="phuong-oanh.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/2422929684962373132.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Phương Oanh">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="hoc-van-hoa-hau.html" style="text-decoration:none"><h5>Học vấn của tân Hoa hậu và hai Á hậu Miss World Vietnam 2025</h5></a>
                                <p class="mb-0 description">VOV.VN - Không chỉ nổi bật về nhan sắc, Top 3 Miss World Vietnam 2025 còn gây chú ý với nền tảng học vấn ấn tượng, khả năng ngoại ngữ tốt và nhiều thành tích nổi bật trong học tập, hoạt động xã hội.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="hoc-van-hoa-hau.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/765313786392878284_1.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Top 3 Miss World Vietnam">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="khuong-le.html" style="text-decoration:none"><h5>Sao Việt 30/3: Khương Lê "Hẹn em ngày nhật thực" gây chú ý với visual lãng tử</h5></a>
                                <p class="mb-0 description">VOV.VN - Từng là vận động viên góp mặt trong đội hình vô địch giải bóng rổ trẻ toàn quốc U19, nam diễn viên Khương Lê bắt đầu được chú ý trong "Hẹn em ngày nhật thực" với vai diễn anh thợ điện An Thiên.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="khuong-le.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large/public/2026-03/khuong-le-10-side.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Khương Lê">
                            </a></div>
                        </article>

                        <article class="row g-2 align-items-center article-item">
                            <div class="col-7 col-md-7 order-2 order-md-1">
                                <a href="quach-thu-phuong-2.html" style="text-decoration:none"><h5>Bị chửi mắng khi đóng người mẹ đáng ghét nhất màn ảnh, Quách Thu Phương nói gì?</h5></a>
                                <p class="mb-0 description">VOV.VN - Hóa thân thành bà Dung trong Bước chân vào đời, NSƯT Quách Thu Phương gây tranh cãi dữ dội khi trở thành “người mẹ đáng ghét nhất màn ảnh”. Nữ nghệ sĩ thừa nhận bị khán giả mắng chửi, thậm chí dọa “nghiệp quật”, nhưng xem đó là phản ứng cho thấy vai diễn đã chạm tới cảm xúc người xem.</p>
                            </div>
                            <div class="col-5 col-md-5 order-1 order-md-2"><a href="quach-thu-phuong-2.html">
                                <img src="https://baoxuan.vov.vn/sites/default/files/styles/front_large_watermark/public/2026-03/656930176_122278313984082504_1916979019174689219_n.jpg" class="img-fluid w-100" style="border-radius:16px" alt="Quách Thu Phương dọa nghiệp quật">
                            </a></div>
                        </article>

                        <!-- Pagination -->
                        <nav class="mt-4 text-center">
                            <ul class="pagination justify-content-center">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#">Trước</a>
                                </li>
                        
                                <li class="page-item active">
                                    <a class="page-link" href="/sao-viet-313">1</a>
                                </li>
                        
                                <li class="page-item">
                                    <a class="page-link" href="hoc-van-hoa-hau.html">2</a>
                                </li>
                        
                                <li class="page-item">
                                    <a class="page-link" href="khuong-le.html">3</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">4</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="hoc-van-hoa-hau.html">5</a>
                                </li>
                        
                                <li class="page-item disabled">
                                    <span class="page-link" style="background:transparent;border:none;">...</span>
                                </li>
                        
                                <li class="page-item">
                                    <a class="page-link" href="#">3546</a>
                                </li>
                        
                                <li class="page-item">
                                    <a class="page-link" href="/juky-san">Sau</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>

    ` }} />
    </Layout>
  );
};

export default HomePage;
