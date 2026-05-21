# Báo cáo Hệ thống Quản trị & Bảo mật (RBAC)

Tài liệu này tổng kết các công việc đã thực hiện để thiết lập hệ thống phân quyền (Role-Based Access Control) cho dự án Việt Sử Số.

## 1. Những gì đã thực hiện (What's Done)

- **Cấu hình Quyền hạn (RBAC):** Tạo file `src/config/roles.js` định nghĩa các vai trò (Admin, Editor, User) theo mô hình **kế thừa**.
- **Middleware Bảo mật:** Triển khai `src/middlewares/auth.js` để:
    - Xác thực Firebase ID Token (người dùng thật).
    - Kiểm tra quyền hạn (Permission) của người dùng trước khi cho phép vào Controller.
- **Quản lý Role bằng Custom Claims:** Sử dụng cơ chế Custom Claims của Firebase (Lựa chọn A) để lưu quyền hạn trực tiếp trong Token, giúp bảo mật cao và tốc độ truy xuất nhanh.
- **Bảo vệ API:**
    - Các Route thêm/sửa/xóa dữ liệu và upload file đã được khóa bởi Middleware.
    - Các Route xem dữ liệu vẫn để công khai (Public).
- **Công cụ khởi tạo:** Tạo script `src/scripts/initAdmin.js` để cấp quyền Admin ban đầu mà không cần thông qua giao diện.

## 2. Các Nhiệm vụ (Tasks)

### ✅ Đã hoàn thành
- [x] Thiết lập bảng ma trận quyền hạn (Roles Matrix).
- [x] Triển khai logic kế thừa quyền (Inheritance).
- [x] Viết Middleware xác thực Token và kiểm tra Role.
- [x] Tạo API gán quyền cho người dùng (`/api/auth/set-role`).
- [x] Áp dụng bảo mật cho `dataRoutes.js` và `fileRoutes.js`.
- [x] Tạo script khởi tạo Admin đầu tiên.
- [x] Triển khai Hệ thống Kiểm duyệt (Queue Review) tích hợp AI.

## 4. Cấu trúc Database Firestore (Mới nhất)

Hệ thống sử dụng cấu trúc liên kết để hỗ trợ kiểm duyệt nhiều tầng:
- **`users`**: Thông tin người dùng & Role.
- **`posts`**: Nội dung bài viết & Trạng thái.
- **`post_media`**: Hình ảnh/Tài liệu đính kèm (Quan hệ 1-N).
- **`moderation_histories`**: Log chi tiết quá trình duyệt (AI/Con người).
- **`ai_assessments`**: Chi tiết điểm số & bằng chứng từ AI.

## 5. Quy trình Trạng thái Bài viết (Post Lifecycle)

Bài viết đi qua 3 trạng thái chính:
1. **`UNMODERATED`**: Mới tạo, chờ AI xử lý.
2. **`AI_MODERATED`**: AI đã duyệt nhưng điểm thấp, chờ Admin/Editor duyệt thủ công.
3. **`PUBLISHED` / `REJECTED`**: Trạng thái cuối cùng sau khi hoàn tất kiểm duyệt.

## 6. Các Nhiệm vụ (Tasks)
- [x] Thiết lập bảng ma trận quyền hạn (Roles Matrix).
- [x] Triển khai Hệ thống Kiểm duyệt (Queue Review) tích hợp OpenRouter AI.
- [x] Khởi tạo cấu trúc Database chuyên sâu (Posts, Media, Moderation).
- [x] Triển khai API đăng bài & duyệt bài đa tầng.
- [x] Triển khai API AI chuyên dụng.
- [ ] Xây dựng giao diện Admin Dashboard trên Front-end.

## 3. Nguy cơ tiềm ẩn (Potential Risks)

1. **Lộ Token ở Front-end:** Nếu máy tính người dùng bị dính mã độc (XSS), Token có thể bị đánh cắp. Cần đảm bảo Front-end sử dụng các biện pháp bảo mật như `HttpOnly Cookies` (nếu dùng session) hoặc quản lý Token cẩn thận.
2. **Lộ file `serviceAccountKey.json`:** Đây là "chìa khóa vạn năng". Nếu file này bị đẩy lên GitHub hoặc bị lộ, hacker sẽ có toàn quyền xóa sạch Database. **Tuyệt đối không commit file này.**
3. **Độ trễ cập nhật Token:** Khi Admin cấp quyền mới cho một người dùng, người dùng đó phải đăng nhập lại hoặc làm mới Token thì quyền mới mới có hiệu lực (do thông tin Role nằm trong Token).
4. **UID sai khi chạy script:** Nếu chạy script `initAdmin.js` với UID sai, bạn có thể vô tình cấp quyền cho nhầm người hoặc không thể truy cập quyền Admin của chính mình.

---
*Ngày cập nhật: 14/05/2026*
