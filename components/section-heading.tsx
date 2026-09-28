import React from "react";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  children: React.ReactNode;
};

export default function SectionHeading({ index, kicker, children }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="label mb-3 flex items-center gap-3">
        <span className="text-up">{index}</span>
        <span className="h-px w-10 bg-white/15" />
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{children}</h2>
    </div>
  );
}
