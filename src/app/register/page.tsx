"use client";
import { useState } from "react";
import RegistrationForm from "@/components/registrationForm";
import RegistrationForm2 from "@/components/registrationForm2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import register from "../api/auth/register";
import { redirect, usePathname } from "next/navigation";

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);

  const pathName = usePathname();

  const formAction = async (data: FormData) => {
    const res = await register(data);
    if (res.success) {
      redirect("/login");
    } else {
      // TODO: Error Handling
      if (res.message === "mismatch") redirect(`${pathName}?error=mismatch`);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center min-h-screen bg-gradient-to-b from-emerald-100 from-0% via-slate-50 via-30% to-gray-50 to-100%">
      <form
        className="max-w-5xl w-full p-8 flex justify-between space-x-8"
        action={formAction}
      >
        <div className="w-1/2">
          <h1 className="text-left font-semibold text-black text-2xl mb-4">
            สร้างบัญชีใหม่
          </h1>
          <div className="p-4">
            {" "}
            <RegistrationForm />{" "}
          </div>
        </div>

        <div className="w-1/2 p-4 mt-14">
          <div className="mb-6">
            <RegistrationForm2 />
          </div>

          <Card className="max-w-md mx-auto px-4 py-2 bg-white rounded-2xl bg-opacity-50 border border-gray-200">
            <CardContent>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 cursor-pointer"
                  required
                />
                <label className="text-gray-700 text-sm">
                  ข้าพเจ้าได้อ่านและยอมรับ
                  <a href="#" className="underline text-black font-medium">
                    ข้อตกลงการใช้งานและนโยบายความเป็นส่วนบุคคล
                  </a>
                </label>
              </div>

              <div className="flex flex-row w-full items-center justify-center">
                <Button
                  type="submit"
                  className="w-36 bg-emerald-500 text-white py-2 rounded-lg mt-6 text-sm"
                  disabled={!isChecked}
                >
                  สมัครใช้งาน
                </Button>
              </div>

              
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
