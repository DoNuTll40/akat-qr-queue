"use client";

import { getPatient } from "@/lib/db";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientPage() {
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(120); // 5 นาที = 300 วินาที
  const queryVn = searchParams.get("vn");

  useEffect(() => {
    if (queryVn) {
      document.title = `QR Kiosk | ${queryVn}`;
      fetchPatientData(queryVn);
    } else {
      document.title = "QR Kiosk";
    }
  }, [queryVn]);

  // โหลดข้อมูล
  const fetchPatientData = async (vn) => {
    try {
      setLoading(true);
      setPatient(null); // รีเซ็ตข้อมูลผู้ป่วยก่อนโหลดใหม่
      const rows = await getPatient(vn);
      console.log(rows)
      setPatient(rows.data[0] || null);
      setCountdown(120); // รีเซ็ตนับถอยหลังหลังโหลดใหม่
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ตั้งนับถอยหลังและรีเฟรชทุก 5 นาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (queryVn) fetchPatientData(queryVn); // รีเฟรช
          return 120; // เริ่มใหม่
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // ล้าง timer เมื่อ component unmount
  }, [queryVn]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!patient || !patient.fullname) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl">ไม่พบหมายเลข</p>
      </div>
    );
  }

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div>
      <p className="mt-2 -mb-2 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">ข้อมูลผู้ป่วย</p>
      <div className="border-b border-gray-200 p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FontAwesomeIcon size="lg" icon={faUserInjured} />
            <p className="font-semibold text-lg">{patient?.fullname}</p>
          </div>
          <p className="block sm:hidden font-bold text-xs">
            {moment().locale("th").add(543, "year").format("วันที่ DD MMM YYYY")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="border px-1 py-1 rounded-sm text-xs font-bold bg-black dark:bg-white text-white dark:text-[#1E2939] flex items-center justify-center">VN</p>
          <p className="font-bold">{queryVn}</p>
        </div>
      </div>

      <div>
        <p className="mt-2 -mb-2 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">รายละเอียด</p>
        <div className="border-b border-gray-200 p-4 w-full">
          <p className="text-lg text-center font-bold">คิวที่ <span className="underline text-xl">{patient?.depq}</span></p>
          <p className="text-lg">แผนกรับบริการ: <span className="underline">{patient?.department}</span></p>
          <p className="text-lg">สถานะ: <span className="underline">{patient?.NAME}</span></p>
          <p className="text-sm text-right text-gray-500 mt-2">
            รีเฟรชอัตโนมัติใน {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
