export const getCategoryDisplayName = (slug?: string): string => {
  if (!slug) return "Y học";
  const categoryMap: { [key: string]: string } = {
    "y-hoc-co-truyen": "Y học cổ truyền",
    "y-hoc-cong-dong": "Y học cộng đồng",
    "nhi-khoa": "Nhi khoa",
    "san-phu-khoa": "Sản phụ khoa",
    "y-hoc-the-thao": "Y học thể thao",
    "tuyen-dung": "Tuyển dụng"
  };

  const displayName = categoryMap[slug] || "Y học";
  return displayName;
};
