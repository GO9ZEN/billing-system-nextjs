"use client";

import { CustomerProfileForm } from "@/components/customer/cutomerForm";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: number } }) {
  useEffect(() => {
    console.log("id is ", params.id);
  }, []);

  return (
    <div className="flex bg-blue-100 w-full md:h-[100vh] h-full">
      <CustomerProfileForm customerid={params.id} />
    </div>
  );
}
