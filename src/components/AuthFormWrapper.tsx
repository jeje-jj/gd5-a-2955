"use client";

import { ReactNode } from "react";

export default function AuthFormWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          {title}
        </h1>

        {children}

      </div>
    </div>
  );
}