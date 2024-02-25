"use client";
import DashboardLayout from "@/components/dashboardLayout/page";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <>
      <DashboardLayout>
        <div className="flex items-center gap-8">
            
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;
