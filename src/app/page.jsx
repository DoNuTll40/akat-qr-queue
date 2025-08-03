import Home from "@/components/Home";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}