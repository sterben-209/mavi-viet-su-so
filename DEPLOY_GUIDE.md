# --- BACKEND ---
PORT=5005
# Copy toàn bộ nội dung file JSON vào đây dưới dạng chuỗi (hoặc dùng path nếu deploy VPS)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
FIREBASE_STORAGE_BUCKET=your-app.appspot.com
OPENROUTER_API_KEY=your_key_here

# Link sau khi deploy frontend
FRONTEND_URL=https://vietsuso.com
ADMIN_URL=https://admin.vietsuso.com

# --- FRONTEND (Người dùng) ---
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# --- ADMIN (Quản trị) ---
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
# Dùng chung config Firebase với Frontend
