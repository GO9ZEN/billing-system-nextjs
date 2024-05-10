"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  deleteInvoicesId,
  getInvoices,
  insertInvoice,
  updateInvoices,
} from "./invoiceActions";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { getCustomerList, getCustomers } from "../customer/customerActions";

const invoiceFormSchema = z.object({
  id: z.coerce.number().optional(),
  invoiceDate: z.date().pipe(z.coerce.string()),
  cusNameInvoice: z.string(),
  orderDate: z.date().pipe(z.coerce.string()),
  subject: z.string().optional().nullish(),
  invoiceStatus: z.string(),
});

type Invoiceprops = {
  invoiceid?: number;
};

export function InvoiceProfileForm({ invoiceid = 0 }: Invoiceprops) {
  const [id, setid] = useState<number>(0);
  const router = useRouter();

  //////////////////////////////////////////////////
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchSt = async () => {
      const res = await getCustomerList();
      console.log(res);
      setCustomerData(res.data);
    };

    fetchSt();
  }, []);
  //////////////////////////////////////////////////

  // 1. Define your form.
  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    setid(invoiceid);
    if (invoiceid != 0) {
      const fetchSt = async () => {
        const res = await getInvoices(invoiceid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof invoiceFormSchema>) {
    if (id == 0) {
      insertInvoice(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateInvoices(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteInvoicesId(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handleInvoiceId() {
    console.log("id is", id);

    router.push("/invoices/" + id + "/invoice-pdf/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px] mt-6 mb-6"
      >
        <div className="space-y-8">
          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Id</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Id"
                      type="number"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[300px] w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="cusNameInvoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="md:w-[300px] w-[200px]">
                        <SelectValue placeholder="Select Customer Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Customer Name</SelectLabel>

                          {customerData.map((row: any) => (
                            <SelectItem key={row.id} value={row.cusName}>
                              {row.cusName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Order Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[300px] w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Subject"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="md:w-[300px] w-[200px]">
                        <SelectValue placeholder="Select Item Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Invoice Status</SelectLabel>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Not Paid">Not Paid</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <Button type="submit">{id == 0 ? "Add" : "Update"}</Button>

          {id == 0 ? null : (
            <Button type="button" className="bg-red-700" onClick={handleDelete}>
              Delete
            </Button>
          )}

          {id == 0 ? null : (
            <Button
              type="button"
              className="bg-green-700"
              onClick={handleInvoiceId}
            >
              Print Invoice
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
