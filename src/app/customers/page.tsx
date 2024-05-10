import CustomerList from "@/components/customer/customerList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex bg-blue-100 w-full md:h-[100vh] h-full">
      <div className="md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px] mt-6 mb-6">
        <div className="flex flex-col gap-12">
          <CustomerList />

          <Link href="/customers/add-customer">
            <Button className="bg-sky-500 hover:bg-sky-700">
              Add New Customer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
