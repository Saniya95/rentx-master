"use client";

export default function SectionDivider() {
  return (
    <div className="relative h-[2px] w-full my-10">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
    </div>
  );
}
