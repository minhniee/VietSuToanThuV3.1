"use client";
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const fakeStats = {
  totalUsers: 153 + 100,           // 253
  loggedIn: 83 + 60,               // giả sử 60/100 người mới đăng nhập → 143
  registered: 151 + 100,           // 251
  paidUsers: 57 + 50,              // 107
  basicPlanPrice: 89000,
  revenue: (57 + 50) * 89000       // 107 * 89,000 = 9,683,000
};


const barData = {
  labels: ['Tổng user', 'Đăng nhập', 'Đăng ký', 'Trả phí'],
  datasets: [
    {
      label: 'Số lượng',
      data: [fakeStats.totalUsers, fakeStats.loggedIn, fakeStats.registered, fakeStats.paidUsers],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
      borderRadius: 8,
    },
  ],
};

const pieData = {
  labels: ['User trả phí', 'User miễn phí'],
  datasets: [
    {
      data: [fakeStats.paidUsers, fakeStats.totalUsers - fakeStats.paidUsers],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

const fakeReviews = [
  {
    name: 'Lê Mai Anh',
    rating: 4,
    comment: 'Giao diện khá thân thiện, nhưng có một số bài chưa rõ ràng lắm.'
  },
  {
    name: 'Tống Quốc Đạt',
    rating: 5,
    comment: 'Giao diện đẹp, dễ sử dụng, dịch vụ hỗ trợ nhanh.'
  },
  {
    name: 'Đặng Vũ Minh',
    rating: 5,
    comment: 'Tôi rất hài lòng với gói trả phí, đáng đồng tiền.'
  },
  {
    name: 'Trịnh Quốc Toản',
    rating: 4,
    comment: 'Nội dung phong phú, nhưng có thể thêm nhiều ví dụ minh hoạ hơn.'
  },
  {
    name: 'Lê Thị Diệu Huyền',
    rating: 3,
    comment: 'Web ổn, nhưng cần cải thiện tốc độ tải và điều hướng.'
  },
  {
    name: 'Nguyễn Nhật Linh',
    rating: 5,
    comment: 'Rất phù hợp với người mới bắt đầu, trình bày dễ hiểu.'
  },
  {
    name: 'Phạm Thanh Tùng',
    rating: 4,
    comment: 'Có vài phần chưa được cập nhật, nhưng nhìn chung là tốt.'
  },
  {
    name: 'Trần Thị Kim Ngân',
    rating: 5,
    comment: 'Tôi đã học được nhiều điều mới, rất đáng thử.'
  },
  {
    name: 'Hoàng Quốc Huy',
    rating: 3,
    comment: 'Một số chức năng còn lỗi nhỏ, mong được khắc phục sớm.'
  },
  {
    name: 'Vũ Minh Trang',
    rating: 4,
    comment: 'Hệ thống học khá trực quan, nhưng phần quiz nên đa dạng hơn.'
  }
];

// Biểu đồ rating: 5 sao: 5, 4 sao: 2, 3 sao: 1, 2 sao: 0, 1 sao: 0
const ratingBarData = {
  labels: ['5 sao', '4 sao', '3 sao', '2 sao', '1 sao'],
  datasets: [
    {
      label: 'Số lượng đánh giá',
      data: [5, 3, 1, 0, 0],
      backgroundColor: [
        'rgba(255, 206, 86, 0.9)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(201, 203, 207, 0.7)',
      ],
      borderRadius: 8,
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  );
}

export default function AdminReportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Báo cáo quản trị hệ thống</h2>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold text-blue-600">{fakeStats.totalUsers}</div>
          <div className="text-gray-600">Tổng số user</div>
        </div>
        <div className="bg-green-50 p-4 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold text-green-600">{fakeStats.paidUsers}</div>
          <div className="text-gray-600">User trả phí</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold text-yellow-600">{fakeStats.loggedIn}</div>
          <div className="text-gray-600">User đang đăng nhập</div>
        </div>
        <div className="bg-pink-50 p-4 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold text-pink-600">{fakeStats.registered}</div>
          <div className="text-gray-600">User đã đăng ký</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Tỉ lệ user trả phí</h3>
          <Pie data={pieData} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Biểu đồ số lượng user</h3>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded shadow flex flex-col items-center mb-8">
        <div className="text-xl font-bold text-green-700">{fakeStats.revenue.toLocaleString('vi-VN')} đ</div>
        <div className="text-gray-600">Tổng doanh thu (gói Cơ bản 89.000đ, {fakeStats.paidUsers} user)</div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Biểu đồ rating đánh giá</h3>
        <Bar data={ratingBarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Top 5 đánh giá mới nhất</h3>
        <div className="space-y-4">
          {fakeReviews.map((review, idx) => (
            <div key={idx} className="bg-white border rounded p-4 shadow flex flex-col md:flex-row md:items-center md:gap-4">
              <div className="font-semibold text-blue-700 w-48">{review.name}</div>
              <StarRating rating={review.rating} />
              <div className="text-gray-700 mt-2 md:mt-0">{review.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 