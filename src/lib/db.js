// lib/db.js
"use server";

import mysql from "mysql2/promise";

export async function getPatient(vn) {
  const connection = await mysql.createConnection({
    host: "10.10.10.5",
    user: "sa",
    password: "sa",
    database: "hos",
  });

  const [rows] = await connection.execute(
    `SELECT
  o.vn,
  o.hn,
  oqs.depq,
  CONCAT(pt.pname, pt.fname, ' ', pt.lname) AS fullname,
  kskd.department,
  oo.NAME
FROM
  ovst AS o
  LEFT OUTER JOIN ovstost AS oo ON o.ovstost = oo.ovstost
  LEFT OUTER JOIN ovst_queue_server AS oqs ON o.vn = oqs.vn
  LEFT OUTER JOIN kskdepartment AS kskd ON o.cur_dep = kskd.depcode
  INNER JOIN patient AS pt ON o.hn = pt.hn
WHERE
  o.vstdate = CURDATE()
  AND o.vn = ?
ORDER BY
  oqs.depq`, [vn]
  );

  await connection.end();

  return rows;
}
