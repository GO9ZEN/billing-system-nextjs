import InvoicePdf from "@/components/invoice/invoicePdf";
import React from "react";

export default function Page() {
  return (
    <div className="flex bg-blue-100 w-full md:h-[100vh] h-full">
      <InvoicePdf />
    </div>
  );
}
