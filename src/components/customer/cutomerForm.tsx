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
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  deleteCustomersId,
  getCustomers,
  insertCustomer,
  updateCustomers,
} from "./customerActions";
import { useRouter } from "next/navigation";

const customerFormSchema = z.object({
  id: z.coerce.number().optional(),
  cusName: z.string(),
  cusAddress: z.string(),
  cusNIC: z.string(),
  cusOccupation: z.string(),
});

type Customerprops = {
  customerid?: number;
};

export function CustomerProfileForm({ customerid = 0 }: Customerprops) {
  const [id, setid] = useState<number>(0);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    setid(customerid);
    if (customerid != 0) {
      const fetchSt = async () => {
        const res = await getCustomers(customerid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof customerFormSchema>) {
    if (id == 0) {
      insertCustomer(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateCustomers(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteCustomersId(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
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
                  <FormLabel>Id</FormLabel>
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
              name="cusName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Customer Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="cusAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Address</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Customer Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cusNIC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer NIC</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Customer NIC"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="cusOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Occupation</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Customer Occupation"
                      {...field}
                    />
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
        </div>
      </form>
    </Form>
  );
}
