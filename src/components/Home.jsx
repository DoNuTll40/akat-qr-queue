"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { faSquare, faUserInjured } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClientPage() {
  const searchParams = useSearchParams();
  
  const queryHn = searchParams.get('hn')

  useEffect(() => {
    if (queryHn) {
      document.title = `QR Kiosk | ${queryHn}`;
    } else {
      document.title = "QR Kiosk";
    }
  }, [queryHn]);

  if (!queryHn) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl">ไม่พบหมายเลข</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mt-2 -mb-2 px-2 py-1 bg-[#0e8c66] text-white font-semibold w-fit rounded-md shadow-sm">ข้อมูลผู้ป่วย</p>
      <div className="border-b border-gray-200 p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FontAwesomeIcon size="lg" icon={faUserInjured} />
            <p className="font-semibold">ผู้ป่วย : ชื่อ - นามสกุล</p>
          </div>
          <p className="block sm:hidden font-bold text-xs">{moment().locale("th").add(543, "year").format("วันที่ DD MMM YYYY")}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="border px-1 py-1 rounded-sm text-xs font-bold bg-black dark:bg-white text-white dark:text-[#1E2939] flex items-center justify-center">HN</p>
          <p className="font-bold">{queryHn}</p>
        </div>
      </div>
    </div>
  );
}
