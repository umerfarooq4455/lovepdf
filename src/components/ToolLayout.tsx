import React from "react";

export default function ToolLayout({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string; }) {
  return (
    <div className={`container mx-auto px-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div>{children}</div>
    </div>
  );
}
