# 📰 Dự án "Ký ức làm báo" - VOV (ReactJS + TypeScript SPA)

> **Mô tả dự án:** Quá trình Chuyển đổi/Tái cấu trúc (Refactoring & Migration) một tập hợp các tệp tĩnh (Static HTML/CSS/JS) được clone từ trang tĩnh của Đài Tiếng Nói Việt Nam (VOV) thành một ứng dụng **Single Page Application (SPA)** hiện đại. Dự án giúp dễ dàng quản lý code theo mô hình Component, tối ưu trải nghiệm điều hướng, hỗ trợ công cụ tìm kiếm và tự động hóa quy trình cho phép đưa website lên serverless hosting như **Vercel**.

---

## 🚀 Các Công Nghệ Sử Dụng

- **Frontend Core:** ReactJS 18, TypeScript.
- **Build Tool:** Vite (Super fast dev server & bundler).
- **Routing:** React Router DOM v6 (Xử lý điều hướng Client-side).
- **Automation / Scripting:** Node.js (Module File System `fs`, Regex để parse/chuyển đổi mã nguồn Legacy).
- **UI & Styling:** Bootstrap 5, Vanilla CSS, FontAwesome, Google Fonts, đặc trưng xử lý Layout E-magazine thuần gốc của VOV.
- **Deployment:** Vercel (kèm cấu hình điều hướng routing fallback `vercel.json`).

---

## 📂 Tổ Chức Cấu Trúc Thư Mục (Folder Structure)

```text
📁 kyuclambao
├── 📁 _legacy/            # Nơi lưu trữ toàn bộ các tệp HTML (Trang chủ, bài báo, emagazine) nguyên bản đã thu thập/clone (Static Template gốc dùng làm đầu vào dữ liệu).
├── 📁 scripts/            # Các mã tự động hóa do chính dự án tạo ra nhằm tối ưu sức lao động:
│   ├── convert_articles.mjs # Script tự động chuyển hóa file HTML tĩnh thành React TSX Component.
│   └── extract_data.mjs     # Script cào (parse) nội dung trang chủ ra mảng JSON nhằm làm CSDL nội bộ. 
├── 📁 src/
│   ├── 📁 components/     # Các thành phần giao diện tái sử dụng: Header.tsx, Footer.tsx, Layout.tsx.
│   ├── 📁 data/           # Chứa modules database offline giả lập: articles.ts (Lưu trữ data tìm kiếm).
│   ├── 📁 pages/          # Thành phần của các Trang chính (Routing Pages): 
│   │   ├── 📁 articles/   # Chứa toàn bộ 14 Article Components do Script tự động phát sinh.
│   │   ├── HomePage.tsx   # Giao diện Trang chủ liệt kê báo.
│   │   └── SearchPage.tsx # Giao diện Trang tìm kiếm từ khóa.
│   ├── App.tsx          # Định nghĩa toàn bộ Node Routes của ứng dụng.
│   └── index.css        # Bảng thiết kế CSS CSS tĩnh dung hợp (Global Configs).
├── vercel.json          # Thiết lập cấu hình SPA cho Server Vercel khi Deploy.
└── vite.config.ts       # Quy tắc build source code biên dịch.
```

---

## 💡 Quá Trình Thực Hiện Của Sinh Viên (Báo cáo thực tập)

Trong quá trình tiếp nhận bộ giao diện báo chí kỹ thuật số của dự án này, tui (`Sinh viên / Lập trình viên`) đã tự xây dựng và triển khai một quy trình gồm **5 giai đoạn trọng tâm** nhằm nâng cấp cấu trúc mà vẫn đảm bảo 100% tính nguyên bản trong mặt thiết kế:

### 1. Bóc Tách Theo Mô Hình Component (Componentization)
Thay vì code thô hàng chục tệp tin HTML lặp đi lặp lại một vùng `Head` và vùng `Foot`. Tui đã phân tách và chuẩn hóa cụm Menu (Hỗ trợ Offcanvas Mobile) thành file `Header.tsx`, phần thông tin tòa soạn thành `Footer.tsx`. Sau đó, xây dựng HOC (Higher-Order Component) là `Layout.tsx` để bao bọc các nội dung cần hiển thị chung.

### 2. Xây Dựng Script Tự Động Hóa (Automation File-Parsing)
Thay vì phải tốn thời gian "copy/paste" hơn 14 trang báo (bao gồm các file E-Magazine khổng lồ với cấu trúc lồng nhau rất phức tạp) thành React Component, tui đã viết hệ thống mã Script bằng Node.js (`scripts/convert_articles.mjs`). Bằng sự tinh tế và cơ chế chạy bằng Biểu thức chính quy (Regex):
- Trích xuất toàn bộ phần thân Bài viết `<body>`.
- Tách, gom riêng toàn bộ các bộ thẻ chứa `<link>` stylesheet và `<style>` trên `<head>`.
- Gộp nội dung và thiết code chúng tự động qua chuỗi Template Literal vào file mã đuôi `.tsx`.
> Kết quả: Việc này đã tránh làm rò rỉ (leak) CSS tĩnh cục bộ ra ngoài và ngăn "phá vỡ Layout nguyên gốc của trang E-Magazine" so với cách thức chỉ include thô vào `index.css`.

### 3. Tái Thuật Toán Đồng Bộ Hóa Route (SPA Routing Engine)
Mã HTML thô của dự án đều xài thẻ chuyển hướng truyền thống với đuôi URL dạng `/abc.html`. Để xây dựng Web app siêu mượt, không hề load hay giật màn hình. Tui sử dụng `react-router-dom`:
- Cấu hình bắt đồng thời các route dạng Dual-Paths: `/tieu-de-abc` và `/tieu-de-abc.html`.
- Triệt tiêu 100% các lỗi "Page Not Found", hỗ trợ tính backward-compatibility ở mọi nơi khi người dùng nhấn nút. Tránh xung đột cảnh báo State Transitions của React Router phiên bản hiện hành.

### 4. Triển Khai Tính Năng Tìm Kiếm Client-Side
Tui đã phát triển riêng một hệ thống Mini-Search Engine Offline (hoạt động không cần Backend hay Database Server).
- Sử dụng mô đun script mới để quét ngược vào mã DOM HTML trang chủ nhằm Crawl tất tần tật Data: Tiêu đề, Hình ảnh, Tóm tắt, URL (để khởi tạo thư viện `articles.ts`).
- Tích hợp 2 hệ thống thanh nhập liệu Search mượt trên máy tính (sử dụng State Component thu gọn gõ thả) và thiết bị Mobile.
- Dựng thuật toán lọc từ khóa phi phân biệt hoa-thường ngay trong Logic React (Hooks `useSearchParams`, `useMemo`). Giúp tốc độ tìm kiếm bài báo nhanh như chớp.

### 5. Cấu Hình & Chuẩn Bị Triển Khai Thực Tế (Deployment Setup)
Kiểm tra tính chịu tải của TS Compiler `npm run build` và ViteJS. Đồng thời thêm cấu hình Rewrites Rules (hướng thẳng mọi Request URL về cho `index.html`) qua thư viện tĩnh `vercel.json` phục vụ thuật toán Deploy trên nền tảng máy chủ Serverless - Vớ mục tiêu sẵn sàng 100% cho Production Môi trường Internet thực tế.

---

## 🖱️ Hướng Dẫn Cài Đặt (Local Development)

Yêu cầu môi trường có cài sẵn Node.js (18+).

1. Tải source code của dự án về máy:
   ```bash
   git clone https://github.com/DuFront-End/kyuclambao.git
   cd kyuclambao
   ```

2. Cài đặt các thư viện liên quan:
   ```bash
   npm install
   ```

3. Khởi động máy chủ ảo Local:
   ```bash
   npm run dev
   ```
   *Trình duyệt sẽ mở chạy tại địa chỉ http://localhost:5173*

4. Kết xuất Bundle để đóng gói ra Production (thư mục `/dist`):
   ```bash
   npm run build
   ```
