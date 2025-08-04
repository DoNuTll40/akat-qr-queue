"use client";

import { getPatient } from "@/lib/db";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/th";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Timeline, Spin } from "antd"; // <-- import antd components

export default function ClientPage() {
  const searchParams = useSearchParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(120);
  const queryVn = searchParams.get("vn");

  useEffect(() => {
    if (queryVn) {
      document.title = `QR Kiosk | ${queryVn}`;
      fetchPatientData(queryVn);
    } else {
      document.title = "QR Kiosk";
    }
  }, [queryVn]);

  const fetchPatientData = async (vn) => {
    try {
      setLoading(true);
      setPatient(null);
      const rows = await getPatient(vn);
      setPatient(rows.data[0] || null);
      setCountdown(120);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (queryVn) fetchPatientData(queryVn);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [queryVn]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spin size="large" />
        <p className="text-xl mt-2">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!patient || !patient.fullname) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-2xl">ไม่พบหมายเลข</p>
      </div>
    );
  }

  const vsttime = patient.vsttime;
  const department = patient.department;
  const lastSendTime = patient["TIME(st.last_send_time)"];

  let timelineData = [];

  // ✅ 1. เพิ่มจุดเริ่มต้นจาก vsttime
  timelineData.push({
    key: "start",
    time: vsttime,
    dep: "เริ่มต้น",
    label: "เริ่มต้น",
  });

  // ✅ 2. วน service1-20 (ยกเว้น service3 และ vsttime)
  for (let i = 1; i <= 20; i++) {
    if (i === 3) continue; // ❌ ข้าม service3

    const time = patient[`service${i}`];
    if (time && time !== vsttime) {
      const dep = patient[`service${i}_dep`] || "-";
      timelineData.push({
        key: `service${i}`,
        time,
        dep,
        label: `service${i}`,
      });
    }
  }

  // ✅ 3. ถ้า "กลับบ้าน" ให้เพิ่มสิ้นสุดการรับบริการ
  if (department === "กลับบ้าน" && lastSendTime) {
    timelineData.push({
      key: "end",
      time: lastSendTime,
      dep: "สิ้นสุดการรับบริการ",
      label: "สิ้นสุด",
    });
  }

  // ✅ 4. เรียงตามเวลา
  timelineData.sort((a, b) => a.time.localeCompare(b.time));

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="max-w-md mx-auto">
      <p className="mt-2 -mb-2 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">
        ข้อมูลผู้ป่วย
      </p>
      <div className="border-b border-gray-200 p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon size="lg" icon={faUserInjured} />
            <p className="font-semibold text-lg">{patient?.fullname}</p>
          </div>
          <p className="block sm:hidden font-bold text-xs">
            {moment()
              .locale("th")
              .add(543, "year")
              .format("วันที่ DD MMM YYYY")}
          </p>
        </div>
      </div>

      <div>
        <p className="mt-2 -mb-2 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">
          รายละเอียด
        </p>
        <div className="border-b border-gray-200 p-4 w-full">
          <p className="text-xl text-center font-bold">
            คิวที่ <span className="underline text-2xl">{patient?.depq}</span>
          </p>
          <p className="text-lg">
            แผนกรับบริการ: <span className="underline">{patient?.department}</span>
          </p>
          <p className="text-lg">
            สถานะ: <span className="underline font-bold">{patient?.NAME}</span>
          </p>
          <p className="text-sm text-right text-gray-500 mt-2">
            รีเฟรชอัตโนมัติใน {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      <div>
        <p className="mt-4 mb-6 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">
          Timeline การให้บริการ
        </p>
        <Timeline>
          {timelineData.map(({ key, time, dep, label }) => (
            <Timeline.Item key={key} color={dep === "เริ่มต้น" ? "blue" : dep === "สิ้นสุดการรับบริการ" ? "gray" : "green"}>
              <strong>เวลา {time} - {dep}</strong>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
