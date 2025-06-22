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
  totalUsers: 600,
  loggedIn: 420,
  registered: 600,
  paidUsers: 200,
  basicPlanPrice: 89000,
  premiumPlanPrice: 0, // chưa có user premium
  revenue: 200 * 89000,
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

export default function AdminStats() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Thống kê tổng quan hệ thống</h2>
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
      <div className="bg-gray-50 p-4 rounded shadow flex flex-col items-center">
        <div className="text-xl font-bold text-green-700">{fakeStats.revenue.toLocaleString('vi-VN')} đ</div>
        <div className="text-gray-600">Tổng doanh thu (gói Cơ bản 89.000đ, 200 user)</div>
      </div>
    </div>
  );
} 