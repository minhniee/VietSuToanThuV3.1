const { google } = require('googleapis');
import { authorize, getUnreadCakeMails, markMailAsRead } from './gmailClient';
import { parseCakeMail } from './cakeParser';
import { AuthService, User } from '../../lib/auth';

const LABEL_NAME = 'Ngân hàng số Cake by VPBank'; // Đổi thành tên label bạn tạo trong Gmail

// Hàm lấy danh sách user từ mockUsers (tạm thời, do không export mockUsers)
function getAllUsers(): User[] {
  // Lấy từ localStorage (giả lập)
  const users: User[] = [];
  const demo = localStorage.getItem('currentUser');
  if (demo) {
    try {
      users.push(JSON.parse(demo));
    } catch {}
  }
  // Có thể mở rộng lấy từ API hoặc DB thật
  return users;
}

async function processCakeMails() {
  const auth = await authorize();
  const gmail = google.gmail({ version: 'v1', auth });
  const mails = await getUnreadCakeMails(gmail, LABEL_NAME);
  const users = getAllUsers();
  for (const mail of mails) {
    const info = parseCakeMail(mail.body);
    console.log('Mail body:', mail.body);
    console.log('Parsed info:', info);
    console.log('All users:', users);
    // Tìm user theo nội dung chuyển khoản (ưu tiên email, sau đó id)
    const matchedUser = users.find((u: User) => info && (mail.body.includes(u.email) || mail.body.includes(u.id)));
    if (matchedUser && info.amount) {
      const amount = parseInt(info.amount.replace(/\D/g, ''));
      if (amount > 0) {
        await AuthService.addBalance(matchedUser.id, amount);
        console.log(`Đã cộng ${amount}đ cho user ${matchedUser.email}`);
      }
    }
    await markMailAsRead(gmail, mail.id);
  }
}

// Chạy mỗi 1 phút (hoặc dùng cron job ngoài)
setInterval(processCakeMails, 60 * 1000); 