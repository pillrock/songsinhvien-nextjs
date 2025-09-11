import { conn } from "@/lib/db";
import { handleError } from "@/lib/utils/api/handleError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await conn`TRUNCATE transactions RESTART IDENTITY CASCADE`;
    await conn`TRUNCATE users RESTART IDENTITY CASCADE`;
    await conn`TRUNCATE rooms RESTART IDENTITY CASCADE`;

    await conn`
      INSERT INTO rooms (name)
      VALUES 
        ('Phòng A'),
        ('Phòng B'),
        ('Phòng C')
    `;

    await conn`
      INSERT INTO users (room_id, name, username, password_hash)
      VALUES
        (1, 'Nguyễn Văn A', 'vana', 'hash1'),
        (1, 'Trần Thị B', 'thib', 'hash2'),
        (1, 'Phạm Văn C', 'vanc', 'hash3'),

        (2, 'Lê Thị D', 'thid', 'hash4'),
        (2, 'Hoàng Văn E', 'vane', 'hash5'),
        (2, 'Đỗ Thị F', 'thif', 'hash6'),

        (3, 'Vũ Văn G', 'vang', 'hash7'),
        (3, 'Ngô Thị H', 'thih', 'hash8'),
        (3, 'Phan Văn I', 'vani', 'hash9'),
        (3, 'Bùi Thị J', 'thij', 'hash10')
    `;

    await conn`
      INSERT INTO transactions (room_id, user_id, price, note)
      VALUES
        (1, 1, 50000, 'Mua sách giáo khoa'),
        (1, 2, 120000, 'Đóng tiền điện'),
        (1, 3, 75000, 'Ăn trưa căn tin'),
        (1, 1, 300000, 'Mua đồ gia dụng'),
        (1, 2, 200000, 'Đóng tiền nước'),
        (1, 3, 45000, 'Uống cà phê'),

        (2, 4, 100000, 'Mua thẻ điện thoại'),
        (2, 5, 80000, 'Ăn tối nhà hàng'),
        (2, 6, 250000, 'Mua quần áo'),
        (2, 4, 150000, 'Đóng học phí'),
        (2, 5, 90000, 'Đi siêu thị'),
        (2, 6, 50000, 'Mua đồ văn phòng phẩm'),

        (3, 7, 200000, 'Mua giày thể thao'),
        (3, 8, 120000, 'Đóng tiền internet'),
        (3, 9, 60000, 'Ăn sáng'),
        (3, 10, 180000, 'Mua balo'),
        (3, 7, 220000, 'Đóng tiền phòng'),
        (3, 8, 30000, 'Uống trà sữa'),
        (3, 9, 150000, 'Mua tai nghe'),
        (3, 10, 110000, 'Mua sách tham khảo')
    `;

    return NextResponse.json({
      status: "ok",
      message: "data added success: 3 rooms, 10 users, 20 transactions!",
    });
  } catch (error: unknown) {
    return handleError(error, "Seed data error", 500005);
  }
}
