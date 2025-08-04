// lib/db.js
"use server";

import mysql from "mysql2/promise";

export async function getPatient(vn) {
  try {
    const connection = await mysql.createConnection({
        host: process.env.NEXT_PUBLIC_DB_HOST,
        user: process.env.NEXT_PUBLIC_DB_USER,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        port: process.env.NEXT_PUBLIC_DB_PORT,
        connectionLimit: process.env.NEXT_PUBLIC_DB_CONNECTION_LIMIT,
    });

    const [rows] = await connection.execute(
      `SELECT
        o.vn,
        o.hn,
        oqs.depq,
        CONCAT(pt.pname, pt.fname, ' ', pt.lname) AS fullname,
        kskd.department,
        oo.NAME
      FROM ovst AS o
      LEFT OUTER JOIN ovstost AS oo ON o.ovstost = oo.ovstost
      LEFT OUTER JOIN ovst_queue_server AS oqs ON o.vn = oqs.vn
      LEFT OUTER JOIN kskdepartment AS kskd ON o.cur_dep = kskd.depcode
      INNER JOIN patient AS pt ON o.hn = pt.hn
      WHERE o.vstdate = CURDATE() AND o.vn = ?
      ORDER BY oqs.depq`,
      [vn]
    );

    await connection.end();

    return {
      success: true,
      data: rows,
      message: rows.length > 0 ? "พบข้อมูลผู้ป่วย" : "ไม่พบข้อมูลผู้ป่วย",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูลหรือ query",
      error: error.message, // หรือเก็บ log เท่านั้นก็ได้
    };
  }
}
