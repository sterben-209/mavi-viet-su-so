# Danh sách Task Backend - Việt Sử Số

Dựa trên yêu cầu từ Frontend, dưới đây là danh sách các đầu việc cần thực hiện cho Backend.

## 1. Quản lý Bài viết (Post/Library)
- [ ] **API Lấy danh sách bài viết:** Cần hỗ trợ phân trang (pagination), tìm kiếm và lọc theo `category`, `grade`.
    - Hiện tại `postController.js` mới chỉ có logic tạo và kiểm duyệt, chưa có logic GET.
- [ ] **API Chi tiết bài viết:** Lấy bài viết theo `slug` (Frontend sử dụng slug cho URL).
- [ ] **Data Seeding:** Chuyển dữ liệu mẫu từ `front end/lib/data.ts` vào Firestore để Frontend có thể gọi API ngay.
- [ ] **Xử lý Attachments:** Đảm bảo khi trả về bài viết, các trường trong `attachments` khớp với cấu trúc Frontend yêu cầu (`type`, `name`, `size`, `action`).

## 2. Bản đồ ký ức (Map Data)
- [ ] **API Map Pins:** Tạo endpoint trả về danh sách `MapPin` (lat, lng, title, slug, ...).
    - Có thể mở rộng `dataController.js` hoặc tạo `mapController.js`.
- [ ] **Lọc điểm trên bản đồ:** Hỗ trợ lọc theo `grade` và `period` (Giai đoạn lịch sử).

## 3. Đóng góp ký ức (Submissions)
- [ ] **Tích hợp Form Đóng góp:** Cập nhật `submissionController.js` để xử lý đúng các trường từ `ContributeFormData`.
    - `name`, `email`, `role`, `province`, `memoryTitle`, `period`, `content`.
- [ ] **Upload File:** Tích hợp Firebase Storage để lưu các tệp đính kèm từ form đóng góp và lưu URL vào database.
- [ ] **Workflow Duyệt tự động:** Đảm bảo `processAiCheck` hoạt động ổn định và thông báo trạng thái về cho người dùng (nếu cần).

## 4. Thống kê (Statistics)
- [ ] **API Stats:** Tạo endpoint trả về các con số thống kê cho trang chủ.
    - Số lượng ký ức đã số hóa.
    - Số lượng chủ đề.
    - Số trường thí điểm.

## 5. Hệ thống Admin & Phân quyền
- [ ] **API Duyệt bài nâng cao:** Cho phép Admin xem danh sách `submissions`, xem kết quả AI check và thực hiện Duyệt/Từ chối.
- [ ] **Phân quyền Middleware:** Đảm bảo các route Admin chỉ có `ADMIN` hoặc `REVIEWER` mới truy cập được.

## 6. Kỹ thuật & Hạ tầng
- [ ] **Environment Variables:** Đảm bảo `OPENROUTER_API_KEY` và Firebase config đã được cấu hình đúng trên môi trường production.
- [ ] **CORS:** Cấu hình CORS để cho phép Frontend (Next.js) gọi API từ domain khác.
