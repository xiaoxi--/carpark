import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 获取项目根目录
const rootDir = path.resolve(__dirname, '..', '..');
// 确保上传目录存在
const uploadPath = path.join(rootDir, 'src', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 设置存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // 设置上传文件的保存路径
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // 设置上传文件的文件名
  },
});

// 创建 multer 实例
const upload = multer({ storage: storage });

export default upload;
