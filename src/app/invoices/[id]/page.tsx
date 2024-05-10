"use client";

import { InvoiceProfileForm } from "@/components/invoice/InvoiceForm";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: number } }) {
  useEffect(() => {
    console.log("id is ", params.id);
  }, []);

  return (
    <div className="flex bg-blue-100 w-full md:h-[100vh] h-full">
      <InvoiceProfileForm invoiceid={params.id} />
    </div>
  );
}
