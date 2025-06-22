import React from 'react';
import { User } from '@/lib/auth';

interface DepositInfoProps {
  user: User;
}

const DepositInfo: React.FC<DepositInfoProps> = ({ user }) => {
  // Ưu tiên lấy số điện thoại nếu có, nếu không lấy email hoặc name
  const identifier = user.email || user.name || user.id;
  const qrImg = `https://img.vietqr.io/image/cake-0393312336-compact2.png?amount=&addInfo=NAP%20${encodeURIComponent(identifier)}&accountName=THIEU%20DUC%20DUNG`;
  return (
    <div className="p-4 border rounded max-w-md mx-auto bg-white shadow">
      <h2 className="font-bold text-lg mb-2">Nạp tiền vào tài khoản</h2>
      <div className="space-y-2">
        <div><b>Ngân hàng:</b> Cake by VPBank</div>
        <div><b>Số tài khoản:</b> 0393312336</div>
        <div><b>Tên tài khoản:</b> THIEU DUC DUNG</div>
        <div>
          <b>Nội dung chuyển khoản:</b>
          <span className="bg-gray-100 px-2 py-1 rounded ml-2 text-blue-700 font-mono">
            NAP {identifier}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Vui lòng chuyển khoản đúng nội dung để hệ thống tự động cộng tiền!
        </div>
        <div className="mt-4 text-base">
          <b>Số dư hiện tại:</b> <span className="text-green-600 font-semibold">{user.balance?.toLocaleString('vi-VN')} đ</span>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <b className="mb-2">Mã QR chuyển khoản nhanh:</b>
          <img
            src={qrImg}
            alt="QR chuyển khoản Cake"
            width={180}
            height={180}
            className="border rounded bg-white"
          />
          <div className="text-xs text-gray-500 mt-2 text-center">
            Quét mã QR bằng app ngân hàng, thông tin sẽ tự động điền sẵn.<br/>
            Kiểm tra lại nội dung chuyển khoản trước khi xác nhận!
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositInfo; 