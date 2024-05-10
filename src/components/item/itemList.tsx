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
import { getItemList } from "./itemActions";
import { useRouter } from "next/navigation";

export default function ItemList() {
  const [itemData, setItemData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getItemList();
      console.log(res);
      setItemData(res.data);
    };

    fetchSt();
  }, []);

  const handleGetId = (id: number) => {
    console.log("id is", id);

    router.push("/items/" + id);
  };

  return (
    <div>
      <Table>
        <TableCaption>Item SAVED DATA</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price Per Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-100">
          {itemData.map((row: any) => (
            <TableRow
              key={row.id}
              className="cursor-pointer"
              onClick={() => handleGetId(row.id)}
            >
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>{row.itemType}</TableCell>
              <TableCell className="text-right">
                {row.itemPricePerUnit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
