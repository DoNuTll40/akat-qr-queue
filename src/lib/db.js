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
  o.vstdate,
  o.vsttime,
  o.vn,
  o.hn,
  oqs.depq,
  CONCAT(pt.pname, pt.fname, ' ', pt.lname) AS fullname,
  kskd.department,
  oo.NAME,
  st.service1,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service1_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service1_dep,
  st.service2,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service2_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service2_dep,
  st.service3,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service3_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service3_dep,
  st.service4,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service4_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service4_dep,
  st.service5,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service5_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service5_dep,
  st.service6,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service6_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service6_dep,
  st.service7,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service7_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service7_dep,
  st.service8,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service8_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service8_dep,
  st.service9,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service9_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service9_dep,
  st.service10,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service10_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service10_dep,
  st.service11,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service11_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service11_dep,
  st.service12,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service12_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service12_dep,
  st.service13,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service13_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service13_dep,
  st.service14,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service14_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service14_dep,
  st.service15,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service15_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service15_dep,
  st.service16,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service16_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service16_dep,
  st.service17,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service17_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service17_dep,
  st.service18,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service18_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service18_dep,
  st.service19,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service19_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service19_dep,
  st.service20,
  (
    SELECT 
      kskd1.department
    FROM service_time AS st1
    LEFT OUTER JOIN kskdepartment AS kskd1 ON st1.service20_dep = kskd1.depcode
    WHERE st1.vn = o.vn
  ) AS service20_dep,
  TIME(st.last_send_time)
FROM
  ovst AS o
  LEFT OUTER JOIN ovstost AS oo ON o.ovstost = oo.ovstost
  LEFT OUTER JOIN ovst_queue_server AS oqs ON o.vn = oqs.vn
  LEFT OUTER JOIN kskdepartment AS kskd ON o.cur_dep = kskd.depcode
  LEFT OUTER JOIN service_time AS st ON o.vn = st.vn
  INNER JOIN patient AS pt ON o.hn = pt.hn
WHERE
  o.vn = ?
ORDER BY
  oqs.depq;`,
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
