const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = require('../../serviceAccountKey.json');

if (!process.env.FIREBASE_STORAGE_BUCKET) {
  console.warn('CẢNH BÁO: FIREBASE_STORAGE_BUCKET không được định nghĩa trong .env');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();

let bucket = null;
try {
  if (process.env.FIREBASE_STORAGE_BUCKET) {
    bucket = admin.storage().bucket();
  } else {
    console.warn('CẢNH BÁO: Không có FIREBASE_STORAGE_BUCKET. Tính năng upload file sẽ bị vô hiệu hóa.');
  }
} catch (error) {
  console.error('Lỗi khởi tạo Storage:', error.message);
}

module.exports = { admin, db, bucket };
