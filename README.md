# Thực Tập: Hệ Thống Báo Điện Tử "Ký Ức Làm Báo" - VOV
*(Kiến trúc: ReactJS + TypeScript + Vite Single Page Application)*

> **Tóm tắt dự án:** Đây là một công trình **Migration & Refactoring** (Chuyển đổi và Tái cấu trúc) toàn diện. Dự án lấy dữ liệu đầu vào là tập hợp các tệp tĩnh rời rạc (Static HTML/CSS/JS) được trích xuất/clone từ hệ thống báo điện tử "Ký ức làm báo" của Đài Tiếng Nói Việt Nam (VOV). Mục tiêu của dự án là xây dựng lại toàn bộ giao diện này dưới dạng một ứng dụng **Single Page Application (SPA)** hiện đại, mượt mà, áp dụng mô hình Component hóa để dễ dàng mở rộng, đồng thời cải thiện hiệu suất bằng các cơ chế tự động hóa dữ liệu (Scripting) và tối ưu hóa quy trình triển khai mạng thực tế (Deployment).

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

Dự án áp dụng bộ công nghệ hiện đại nhất dành cho phát triển Frontend:
- **Core Framework:** ReactJS 18.
- **Ngôn Ngữ:** TypeScript (Bảo đảm tính chặt chẽ của dữu liệu tĩnh, dễ dàng debug các object của bài báo).
- **Trình Biên Dịch (Bundler):** ViteJS (Tối ưu hóa thời gian khởi động Dev Server và nén code cực nhẹ cho Production).
- **Bộ Điều Hướng (Routing):** React Router DOM v6 (Xử lý việc chuyển trang Client-side mượt mà, không bị chớp hay tải lại trang, xử lý triệt để các URL có đuôi `.html`).
- **Tự Động Hóa (Automation):** Node.js, File System (`fs`), Regular Expressions (Regex) dùng để phân tích và cào dữ liệu từ code HTML cũ.
- **Phong Cách Giao Diện (UI/UX Styling):** Bootstrap 5, Vanilla CSS, FontAwesome, Google Fonts, bảo tồn 100% thiết kế Parallax phức tạp của các bài E-magazine.
- **Hosting / Deployment:** Vercel (Sử dụng hệ thống Serverless tự động Build và cơ chế Rewrites Catch-All).

---

## 📂 Kiến Trúc Hệ Thống Đi Sâu Từng File (Deep-Dive Directory Architecture)

Để dễ dàng nắm bắt được khối lượng công việc đồ sộ của dự án, dưới đây là mô tả chi tiết nhiệm vụ và vai trò của **BẤT KỲ FILE NÀO** xuất hiện trong thư mục:

### 1. 🏭 Khu Vực Nguyên Liệu Gốc: `_legacy/`
> Đây là *"Nhà Kho"* lưu trữ lịch sử của website. Nó chứa các thiết kế tĩnh do người dùng thu thập/clone thô về từ trang chủ VOV. Thư mục này rất quan trọng vì nó là "Mỏ Dữ Liệu" cho các kịch bản tự động hóa (Node.js Scripts) đọc và bóc tách.
- **`trangchu.html`**: Giao diện gốc của trang lưới danh sách tin tức chứa toàn bộ thẻ Header, Footer và CSS nội tuyến cũ.
- **`[tên-bài-viết].html`**: 14 tệp tin HTML của 14 bài báo cụ thể (Bao gồm các bài E-magazine phức tạp lồng ghép hàng nghìn dòng mã CSS riêng biệt).

### 2. ⚙️ Bộ Não Tự Động Hóa: `scripts/`
> Là một kỹ sư phần mềm thực tập, không thể chấp nhận việc "Code bằng tay" (Copy-Paste) chuyển đổi 15 trang HTML khổng lồ sang React. Tui đã thiết kế 3 Script Node.js siêu việt để thay con người làm việc này:
- **`convert_articles.mjs`**: Kịch bản xử lý Tin Tức. Quét sạch 14 file HTML. Sử dụng Regex để nhổ chính xác khối `<body>`, hút giữ nguyên cấu trúc các thẻ `<style>` và `<link rel="stylesheet">` cụ thể lẻ tẻ nằm trên `<head>` của từng file gốc, sau đó ghép lại, đẩy chuỗi String này tạc ra thành 14 file Component `.tsx`. Nhờ Script này, các siêu bài báo E-Magazine như "Kỷ niệm vị tướng" không hề bị rụng một dòng CSS đặc thủ nào, đảm bảo mức độ Parallax đúng 100% không vỡ nét.
- **`convert_homepage.mjs`**: Kịch bản xử lý Trang Chủ. File này mổ xẻ `trangchu.html`, tự động dò tìm đến vùng `<!-- Footer -->`, cắt chính xác mảng `<section class="category-page">` to khổng lồ của trang chủ mà không làm rớt 15 bài báo, bọc nó vào thành 1 React Component siêu sạch.
- **`extract_data.mjs`**: Cỗ máy Cào Dữ Liệu (Crawler). Quét ngược lại mã DOM HTML của `trangchu.html`. Vét sạch các thông tin: URL, Link Hình Ảnh, Tiêu Đề Bài Báo, Khúc dạo đầu mô tả và nén chúng vào thành Mảng 15 đối tượng JSON. Đây chính là xương sống cho "Mini-Database" offline của ứng dụng.

### 3. 💻 Bộ Mã Trọng Tâm: `src/`
Đây là vùng hoạt động chính của thư viện React. Nơi mọi giao diện Component được phát triển:

#### 🧩 Nhóm Các Giao Diện Tái Sử Dụng (`src/components/`)
Thay vì copy mã Menu và Chân trang lặp lại ở 15 trang web, dự án tách chúng ra thành các Module độc lập kết nối logic:
- **`Header.tsx`**: Khối thanh Điều hướng trên cùng. Không chỉ chứa HTML Logo VOV mà tui đã tiêm thêm React State Hook (`useState`). Hook này quản lý sự kiện thu/mở của thanh gõ Tìm Kiếm (Kính lúp), và tương tác Form Submit để đẩy bộ định tuyến `useNavigate` sang trang kết quả nhanh chóng. Đồng thời nó cũng lo liệu tương thích trên Menu điện thoại (Offcanvas).
- **`Footer.tsx`**: Khối Thông tin Tòa soạn đóng đinh ở đáy trang. Gom gọn lại thành mã TSX thuần túy.
- **`Layout.tsx`**: HOC Component (Màng Bọc Giao Diện). Dùng kỹ thuật `<Slot>` (`children` trong React) để ôm trọn bất cứ một khối nội dung nào chui vào giữa `Header` và `Footer`. Cực kỳ tối ưu để mở rộng dự án.

#### 🗄️ Nhóm Quản Trị CSDL Offline (`src/data/`)
- **`articles.ts`**: Được sinh ra tự động bởi `extract_data.mjs`. Chứa Interface TypeScript mảng 15 báo. Không cần phải gọi API Fetch Backend, ứng dụng vẫn có kho dữ liệu để tra cứu và lập chỉ mục nội bộ lập tức. Tối thượng hóa tốc độ phản hồi.

#### 📄 Nhóm Giao Diện Hiển Thị Xuyên Suốt (`src/pages/`)
Đây là những vùng đất được Render phụ thuộc vào đường Link (Router) người dùng truy cập.
- **`HomePage.tsx`**: Căn cứ địa của Website. Nơi lưới bài báo được đẩy lên dựa theo tệp chuyển hóa tĩnh. Mọi `href="/abc.html"` bên trong nó đã được Regex hô biến thành `href="/abc"` tương thích SPA.
- **`SearchPage.tsx`**: Khối Óc Chức Năng. Sử dụng Hook `useSearchParams` để bắt lấy tham số `?q=...` từ URL. Nạp thẳng vào thuật toán lọc phi-phân-biệt-chữ-hoa-thường thông qua `useMemo`. Render ra bộ list thẻ bài viết (Tái sử dụng chung mã CSS class của trang chủ). Tốc độ trả kết quả đo được là <1ms. Hiển thị UI logic "Không tìm thấy" chuyên nghiệp nếu gõ sai chuẩn.
- **`articles/*.tsx`** *(14 Tệp tin tự động hóa sinh ra)*: Bao gồm các component nhúng chuyên biệt lấy mã gốc nguyên tảng (`KiNiemViTuong.tsx`, `BtsVinhDuLon.tsx`...). Các tệp này đứng hoàn toàn độc lập với Layout chung để tự chưng diện Layout gốc tự thân.

#### ⚙️ Các Tệp Cấu Hình React Cốt Lõi (Core Source)
- **`App.tsx`**: Giao lộ trung tâm (Router Switcher). Bọc toàn bộ đồ án bằng `<Router>`. Dùng nghệ thuật Cấu hình Tuyến Đường Kép (Dual-Path Routing) để gom tất cả Link cũ (`path="/abc.html"`) và Link mới (`path="/abc"`) vào chung một Component, đảm bảo 100% Back-Link chéo bên trong các tệp nội dung cũ vẫn không gây Lỗi Trắng 404. Còn cấu hình thêm biến cờ báo tương lai (Future Flags) như `v7_startTransition` để làm trong sạch mã Console của React Router v7.
- **`main.tsx`**: Trục Cẩu chính. Gọi hàm `createRoot` render `<App />` vào thân của File DOM gốc (`index.html`).
- **`index.css`**: Nơi gộp tất cả Typography, biến màu `:root` (#ce1628 - Đỏ VOV), Style đặc trưng toàn cục. Chỉ gọi đúng 1 lần nhưng hưởng sái trên mọi layout con.

### 4. 🛠️ Khu Vực Móng Cấu Hình Hệ Thống (Root Files)
- **`index.html`**: Nơi trình duyệt tiếp cận đầu tiên. Nhúng các CDN thiết yếu của Bootstrap, FontAwesome và Google Fonts để tiết kiệm băng thông khi Load ban đầu.
- **`vercel.json`**: Trái tim chiến lược của kỹ thuật Deploy Serverless. Tệp tin này ra lệnh cho máy chủ Vercel áp dụng cơ chế điều hướng bù đắp (Rewrites Rules): Bất kì URL ảo nào do người dùng gõ (VD: `/search`) đều phải trả về file tĩnh bù trừ là `/index.html`. Không có file này, khi F5 lại Trang Tìm kiếm trên Host Vercel, người dùng sẽ bị sập trang báo lỗi 404.
- **`vite.config.ts`**: Hệ thống cày bừa Compile siêu đẳng `vite`. Nạp React Plugin để hiểu cú pháp `<tag>` của TSX. 
- **`package.json`**: Hộ Chiếu dự án. Định nghĩa mọi thư viện mã nguồn mở khổng lồ liên đới (VD: `react-router-dom`, `typescript`, `vite`). Thiết lập các câu lệnh `npm run dev` để chạy Server nhà và `npm run build` để đóng gói gửi đi.
- **`tsconfig.json`**: Sổ Tay Khai Báo Kiểu Dữ Liệu. Dạy cho Visual Studio Code thuộc nằm lòng cách phát hiện lỗi logic của TypeScript từ sớm.
- **`.gitignore`**: Chốt Cửa Hải Quan. Ra lệnh cho phần mềm Version Control (Git) KHÔNG được phép bốc toàn bô rác, các thư mục nặng rùng rợn như `node_modules/`, `/dist/` lên kho Github.

---

## 🖱️ Hướng Dẫn Vận Hành Hệ Thống (Installation & Deployment)

1. **Khởi Tạo Môi Trường:** Cần phải cài đặt ứng dụng Node.js (v18+) vào máy.
2. **Kéo Source Code về Không Gian Làm Việc:**
   ```bash
   git clone https://github.com/DuFront-End/kyuclambao.git
   cd kyuclambao
   ```
3. **Giải Nén Khối Dependencies:**
   ```bash
   npm install
   ```
4. **Bật Chế Độ Phát Triển (Local Server):**
   ```bash
   npm run dev
   ```
   *Quá trình này siêu nhẹ, bạn chỉ cần một cú Click chuột thẳng vào link `http://localhost:5173` là giao diện lập tức hiện hình mướt rượt.*

5. **Đóng Gói Nén Code Mức Production (Xuất File Thực Tế):**
   ```bash
   npm run build
   ```
   *Thư mục `/dist` được sinh ra tự động. Lúc này Project của bạn đã sẵn sáng để chuyển giao gắn vào Vercel hoạt động như một Website Online Quốc Tế.*
