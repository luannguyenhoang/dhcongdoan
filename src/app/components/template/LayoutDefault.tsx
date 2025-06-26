import React from "react";

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-6xl mx-auto md:px-2 px-4">{children}</div>;
}
