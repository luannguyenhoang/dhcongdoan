import dynamic from "next/dynamic";

const FormWrapper = dynamic(() =>
  import("@/app/components/molecules/FormWrapper").then(
    (mod) => mod.FormWrapper
  )
);

export const Form = () => {
  return (
    <>
      <div className="mb-8 border border-gray-200 py-7 px-5 h-fit z-10">
        <h2 className="text-[#002147] text-2xl font-medium mb-2">Đăng Kí</h2>
        <div className="border-b-4 border-yellow-400 w-12 mb-4"></div>
        <FormWrapper type="form-main" />
      </div>
    </>
  );
};
