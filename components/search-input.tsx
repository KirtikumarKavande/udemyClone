"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import qs from "query-string";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SearchInput = () => {
    const [value,setValue]=useState("")
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
const debouncedValue= useDebounce(value,1000)

    useEffect(()=>{
        const url = qs.stringifyUrl(
            {
              url: pathName,
              query: {
                title:debouncedValue,
              },
            },
            { skipNull: true, skipEmptyString: true }
          );
          router.push(url);
    },[debouncedValue])
  return (
    <div className="relative ">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600 " />
      <Input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Search for a course" className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" />
    </div>
  );
};

export default SearchInput;
