export function parseCakeMail(content: string) {
  // Regex lấy mã giao dịch, số tiền, thời gian, ...
  const transactionId = content.match(/Mã giao dịch\s+([0-9]+)/)?.[1] || '';
  const amount = content.match(/Số tiền\s+\+([0-9.,]+) đ/)?.[1] || '';
  const time = content.match(/Ngày giờ giao dịch\s+([0-9/,: ]+)/)?.[1] || '';
  return { transactionId, amount, time };
} 