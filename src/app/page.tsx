import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-blue-100 h-[100vh] flex items-center justify-center gap-8 md:flex-row flex-col">
      <Link href="/customers">
        <Button className="bg-green-600">Customers</Button>
      </Link>
      <Link href="/items">
        <Button className="bg-green-600">Items</Button>
      </Link>
      <Link href="/invoices">
        <Button className="bg-green-600">Invoices</Button>
      </Link>
    </div>
  );
}
