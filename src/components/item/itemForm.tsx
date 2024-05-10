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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  deleteItemsId,
  getItems,
  insertItem,
  updateItems,
} from "./itemActions";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

const itemFormSchema = z.object({
  id: z.coerce.number().optional(),
  itemName: z.string(),
  itemType: z.string(),
  itemPricePerUnit: z.coerce.number(),
});

type Itemprops = {
  itemid?: number;
};

export function ItemProfileForm({ itemid = 0 }: Itemprops) {
  const [id, setid] = useState<number>(0);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    setid(itemid);
    if (itemid != 0) {
      const fetchSt = async () => {
        const res = await getItems(itemid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof itemFormSchema>) {
    if (id == 0) {
      insertItem(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateItems(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteItemsId(id)
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
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Item Name"
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
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="md:w-[300px] w-[200px]">
                        <SelectValue placeholder="Select Item Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Item Type</SelectLabel>
                          <SelectItem value="Sample 01">Sample 01</SelectItem>
                          <SelectItem value="Sample 02">Sample 02</SelectItem>
                          <SelectItem value="Sample 03">Sample 03</SelectItem>
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
              name="itemPricePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Unit (Rs.)</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Price Per Unit"
                      type="number"
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
