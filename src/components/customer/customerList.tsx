"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getCustomerList } from "./customerActions";
import { useRouter } from "next/navigation";

export default function CustomerList() {
  const [customerData, setCustomerData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getCustomerList();
      console.log(res);
      setCustomerData(res.data);
    };

    fetchSt();
  }, []);

  const handleGetId = (id: number) => {
    console.log("id is", id);

    router.push("/customers/" + id);
  };

  return (
    <div>
      <Table>
        <TableCaption>Customer SAVED DATA</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>NIC</TableHead>
            <TableHead>Occupation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-100">
          {customerData.map((row: any) => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              onClick={() => handleGetId(row.id)}
            >
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.cusName}</TableCell>
              <TableCell>{row.cusAddress}</TableCell>
              <TableCell className="text-right">{row.cusNIC}</TableCell>
              <TableCell className="text-right">{row.cusOccupation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
