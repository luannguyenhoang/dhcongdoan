import React from "react";

export const TimeSeparator = ({
  light = false,
  textSize = "text-5xl md:text-6xl"
}: {
  light?: boolean;
  textSize?: string;
}) => {
  return (
    <div
      className={`mx-4 ${textSize} flex items-center justify-center font-bold ${light ? "text-white" : "text-yellow-500"} pb-5`}
    >
      :
    </div>
  );
};
