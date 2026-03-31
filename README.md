# 📰 Đồ Án Chuyển Đổi Kỹ Thuật Số: Ký Ức Làm Báo - VOV 
*(ReactJS + TypeScript Single Page Application)*

> **Mô Tả Tổng Quan:** Mục tiêu chính của dự án này là tái cấu trúc (Refactoring & Migration) một tập hợp các tệp tĩnh rời rạc (Static HTML/CSS/JS) được trích xuất từ chuyên trang "Ký ức làm báo" của Đài Tiếng Nói Việt Nam (VOV). Sản phẩm đầu ra là một hệ thống **Single Page Application (SPA)** hiện đại, mượt mà, tối ưu hóa tái sử dụng mã (Componentization) và tự động hóa quy trình triển khai lên môi trường máy chủ Serverless (Vercel).

---

## 🎯 Mục Tiêu Lõi Của Dự Án Thực Tập

Là một lập trình viên thực tập đảm nhận việc "hiện đại hóa" một bộ source code quá khổ (Legacy Code), tui đã đặt ra các tiêu chí khắt khe:
1. **Zero Layout Breakage:** Tuyệt đối không làm vỡ các thiết kế cực kỳ phức tạp của gốc (đặc biệt là thể loại E-magazine Parallax đa tầng).
2. **Component Độc Lập:** Phân tách rõ ràng các vùng dùng chung (Header, Footer) để có thể "kế thừa" mà không code lại ở từng ngóc ngách.
3. **Hiệu Suất Tính Năng:** Xây dựng hệ thống tìm kiếm Client-Side tức thì thay vì phải mất thời gian nạp lại trang lưới tin tức.
4. **Tự Động Hóa (Automation):** Từ chối việc gõ thủ công từng dòng mã cho hàng tá bài báo, áp dụng Scripting để máy móc tự chuyển đổi.

---

## 🚀 Công Nghệ Ứng Dụng (Tech Stack)

- **Frontend Core:** ReactJS 18, TypeScript (Giúp xác định kiểu dữ liệu chặt chẽ cho mảng lưu trữ bài viết).
- **Trình Biên Dịch:** ViteJS (Cam kết tốc độ khởi động server chưa tới 1s và Hot-Module-Replacement theo thời gian thực).
- **Cơ Chế Điều Hướng:** React Router DOM v6 (Client-side routing mượt mà, không giật trang).
- **Hành Trang Tự Động:** Node.js, Regular Expression (Regex), File System (`fs`).
- **Giao Diện:** Bootstrap 5 (Responsive Layout), Vanilla CSS, FontAwesome, Google Fonts.
- **Môi Trường Host:** Vercel (CI/CD Deploy tự động với `vercel.json` định tuyến SPA).

---

## 📂 Miêu Tả Chức Năng Từng Tệp Tin (Deep-Dive Directory)

Dưới đây là sơ đồ kiến trúc và diễn giải chức năng chi tiết của TỪNG file tui đã trực tiếp xây dựng trong dự án:

### 1. Khu Vực Nguyên Liệu Gốc (`/_legacy`)
- Thư mục này là **"Nhà Kho"**. Chứa các thiết kế tĩnh (14 bài viết `.html`, file `trangchu.html` nguyên bản) được tải thô trực tiếp về máy. Đây chính là dữ liệu đầu vào chân thực nhất của dự án. Không có thư mục này, quy trình Automation không thể hoạt động.

### 2. Bộ Não Tự Động Hóa (`/scripts`)
Hạt nhân thể hiện kỹ năng lập trình giải quyết vấn đề bằng NodeJS thay vì "Làm-Tay":
- `convert_articles.mjs`: Script làm nhiệm vụ quét sạch 14 file HTML ở thư mục legacy. Bằng logic Regex, script tự động nhổ khối nội dung `<body>`, trích xuất toàn bộ CSS riêng lẻ hiển thị trên `<head>`, cuối cùng "nhào nặn" tất cả cho ra đời 14 file React Component (`.tsx`). Giữ được 100% dáng vẻ thiết kế của Parallax E-magazine.
- `convert_homepage.mjs`: "Cỗ máy" giải phẫu trang chủ. Tìm và cắt exacly khối `<section class="category-page">` chứa danh sách 15 tin tức mà không làm rớt Footer. Gắn chúng vào thẻ `<Layout>` của React một cách tỉ mỉ.
- `extract_data.mjs`: Crawler Script. Đi vào trang chủ cũ, phân tích chuỗi DOM, tìm bằng được các cú pháp: Title, Href, Image, Description và nén chúng lại thành một mảng JSON xuất vào `articles.ts`. Đây là xương sống cho tính năng Tìm kiếm tí hon.

### 3. Vùng Code Chính Của Ứng Dụng (`/src`)

#### 🧱 `src/components/` (Kiến Trúc Tái Sử Dụng)
- **`Header.tsx`:** Thanh thanh quản lý chóp gác trên cùng. Không chỉ chứa Logo, Social Media, Offcanvas dọc trên Mobile. Tui đã tự thiết kế tích hợp "Mở rộng/Đóng" thanh nhập dữ liệu Search thông minh bằng React State (`useState`) lúc bấm kính lúp.
- **`Footer.tsx`:** Footer tĩnh, thông tin liên lạc và chân trang.
- **`Layout.tsx`:** Bộ Wrapper thông minh. Bao gói lấy `Header` và `Footer` để bất kỳ lúc nào cần một trang mới (Profile, Contact), chỉ việc nhét `children` vào là ứng dụng hiển thị hoàn hảo.

#### 💽 `src/data/` (Kho Dữ Liệu Offline)
- **`articles.ts`:** Một bản "CSDL Mạng diện hẹp" mô phỏng Interface TypeScript cực chuẩn với 15 đối tượng bài báo. Không cần dùng lệnh `fetch()`, không cần tới SQL, ứng dụng vẫn có thể đọc và tra cứu keyword cực nhạy.

#### 📄 `src/pages/` (Các Trang Đại Diện Đường Dẫn)
- **`HomePage.tsx`:** Giao diện Trái tim của Website. Nhận Layout bao bọc và thả thẳng toàn bộ Code giao diện Bootstrap trang lưới vào.
- **`SearchPage.tsx`:** Nơi ma thuật xảy ra. Hook `useSearchParams` hút lấy chữ `?q=...` trên thanh URL trình duyệt, đẩy từ khóa vào `useMemo` và trả về ngay kết quả bài viết trùng khớp mà không bao giờ bị re-render thừa thãi.
- **`articles/*.tsx`:** 14 file độc lập với đầy đủ tên gọi rành mạch (`KiNiemViTuong.tsx`, `BtsVinhDuLon.tsx`,...). Khiến cho việc chia nhánh, kiểm thử giao diện các tin cũ dễ dàng như trở bàn tay.

#### ⚙️ Các Tệp Nòng Cốt
- **`App.tsx`:** Trụ sở phân luồng mạng. Bao thầu hệ thống `<Routes>` tới vô số trang phụ và cả định dạng Fallback `.html` (cho phép back-link nội bộ tương thích 100%).
- **`main.tsx`:** Cổng vào (Entry point), móc luồng Code React ảo vào `<div id="root">` của file `index.html`.
- **`index.css`:** Tệp rác tái chế toàn năng. Chứa các dòng cấu hình Typography của Bootstrap, custom color biến tấu từ nền đỏ cờ `VOV`.

### 4. Thiết Lập Môi Trường (Root Configs)
- **`vercel.json`:** Luật định tuyến quan trọng nhất để SPA được tồn tại trên máy chủ. Mọi nỗ lực truy cập đường link "/abc-xyz" sai quy tắc đều sẽ được đẩy ngầm về `/index.html` cho React tự bắt lõi và điều hướng bên trong Client thay vì báo lỗi 404 trắng màn hình.
- **`vite.config.ts`:** Bản phác thảo biên dịch, đẩy tiến độ nén Code siêu nhẹ.
- **`.gitignore`:** Chỉ huy trưởng rào cản, chặn đứng rác `node_modules/` và bản dịch cục bộ `/dist` trôi lơ lửng lên kho chứa GitHub.

---

## 💻 Trải Nghiệm Và Triển Khai (Installation)

Sẵn sàng chạy thực tế với chỉ vài lệnh Console đơn giản:

1. **Clone Tác Phẩm Phân Tích Gốc:**
   ```bash
   git clone https://github.com/DuFront-End/kyuclambao.git
   cd kyuclambao
   ```

2. **Dọn Đường Kéo Thư Viện:**
   ```bash
   npm install
   ```

3. **Chạy Trực Tiếp Ở Môi Trường Máy Nhà (Dev):**
   ```bash
   npm run dev
   ```
   *Nhấp link máy chủ ảo `http://localhost:5173` để cảm nhận tốc độ SPA.*

4. **Sản Xuất Build "Duy Nhất" Dành Cho Production:**
   ```bash
   npm run build
   ```
   *Quá trình Vite đóng gói toàn bộ thư mục `/src` xuống thành tĩnh cực nhẹ bên trong `/dist` sẵn sàng bay lên **Vercel**.*
