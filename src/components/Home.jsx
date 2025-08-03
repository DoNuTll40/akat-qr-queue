"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

export default function ClientPage() {
  const searchParams = useSearchParams();

  const queryHn = searchParams.get('hn')

  if (!queryHn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <p className="text-2xl">ไม่พบหมายเลข</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <p className="text-center">HN : {queryHn}</p>
      <Footer />
    </div>
  );
}
