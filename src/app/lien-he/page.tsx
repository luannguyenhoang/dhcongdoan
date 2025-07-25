import dynamic from "next/dynamic";

const Contac = dynamic(() =>
  import("@/app/components/organisms/Contac").then((mod) => mod.Contac)
);

export default function LienHe() {
  return <Contac />;
}
