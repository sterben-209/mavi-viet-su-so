# Tài liệu Tích hợp Frontend - Việt Sử Số

Tài liệu này cung cấp cái nhìn tổng quan về cấu trúc, công nghệ và các yêu cầu tích hợp giữa Frontend và Backend cho dự án Việt Sử Số.

## 1. Công nghệ sử dụng
- **Framework:** Next.js (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Quản lý trạng thái:** Hiện đang sử dụng Local State (React Hooks).

## 2. Cấu trúc thư mục (Folder Structure)
```text
front end/
├── app/                  # Next.js App Router (Routes & Pages)
│   ├── library/          # Trang Thư viện ký ức
│   │   └── [slug]/       # Chi tiết ký ức
│   ├── map/              # Trang Bản đồ ký ức
│   ├── layout.tsx        # Layout tổng của ứng dụng
│   └── page.tsx          # Trang chủ (Landing Page)
├── components/           # Các Component dùng lại
│   ├── home/             # Components cho trang chủ
│   ├── library/          # Components cho trang thư viện
│   ├── map/              # Components cho trang bản đồ
│   ├── contribute/       # Modal đóng góp ký ức (Form)
│   └── shared/           # Components dùng chung (Navbar, Footer, etc.)
├── lib/                  # Tiện ích và dữ liệu tĩnh
│   └── data.ts           # Mock data (Cần chuyển sang gọi API)
├── types/                # Định nghĩa TypeScript interfaces
│   └── index.ts          # Các kiểu dữ liệu chính (Post, MapPin, etc.)
└── public/               # Assets tĩnh (Images, Fonts)
```

## 3. Các thực thể dữ liệu chính (Data Models)

### Ký ức (Post / Library)
Được định nghĩa trong `types/index.ts` interface `Post`.
- `id`: string
- `slug`: string (URL friendly)
- `title`: string
- `excerpt`: string (Mô tả ngắn)
- `category`: string (Loại: Ký ức nhân chứng, Tư liệu ảnh, ...)
- `grades`: string[] (Khối lớp: Lớp 8, Lớp 9, ...)
- `author`: string
- `date`: string
- `attachments`: Danh sách file đính kèm (PDF, Video, Image)

### Điểm trên bản đồ (MapPin)
- `lat`, `lng`: Tọa độ địa lý.
- `title`, `location`: Thông tin hiển thị.
- `slug`: Liên kết đến trang chi tiết ký ức.

### Đóng góp ký ức (ContributeFormData)
Dữ liệu từ form đóng góp:
- Thông tin người đóng góp: `name`, `email`, `role`, `province`.
- Nội dung ký ức: `memoryTitle`, `period`, `content`.
- Files: Danh sách các tệp đính kèm.

## 4. Kế hoạch tích hợp Backend

Hiện tại Frontend đang sử dụng dữ liệu tĩnh từ `front end/lib/data.ts`. Backend cần triển khai các API sau:

### API Endpoints cần thiết:
1.  **GET `/api/posts`**: Lấy danh sách ký ức (hỗ trợ filter theo `category`, `grade`).
2.  **GET `/api/posts/:slug`**: Lấy chi tiết một ký ức.
3.  **GET `/api/map-pins`**: Lấy danh sách các điểm ghim trên bản đồ.
4.  **POST `/api/submissions`**: Gửi form đóng góp ký ức (kèm upload file).
5.  **GET `/api/stats`**: Lấy các số liệu thống kê (Số ký ức đã số hóa, chủ đề, ...).

### Công việc ưu tiên:
- Chuyển đổi các biến `POSTS`, `MAP_PINS`, `HERO_STATS` trong `lib/data.ts` thành các lời gọi API.
- Cấu hình Firebase Storage để lưu trữ các file đính kèm (Attachments).
- Xây dựng hệ thống Admin (đã có trong Backend hiện tại) để duyệt và quản lý các `submissions`.

## 5. Lưu ý cho Backend
- Cấu trúc `slug` cần duy nhất để định danh ký ức trên URL.
- Dữ liệu `attachments` cần bao gồm URL tải về từ Firebase Storage.
- Phân quyền (Roles) cần khớp với các loại người dùng đã định nghĩa trong Frontend.
