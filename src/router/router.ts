export type TMenus = {
  path: string;
  title: string;
  childs?: {
    path: string;
    title: string;
  }[];
}[];

export const menus: TMenus = [
  {
    path: "/gioi-thieu",
    title: "Giới thiệu"
  },
  {
    path: "/nganh-dao-tao",
    title: "Ngành đào tạo",
    childs: [
      {
        path: "/nganh-dao-tao/bao-ho-lao-dong",
        title: "Bảo hộ lao động"
      },
      {
        path: "/nganh-dao-tao/quan-tri-nhan-luc",
        title: "Quản trị nhân lực"
      },
      {
        path: "/nganh-dao-tao/luat",
        title: "Luật"
      },
      {
        path: "/nganh-dao-tao/ngon-ngu-anh",
        title: "Ngôn ngữ Anh"
      },
      {
        path: "/nganh-dao-tao/cong-tac-xa-hoi",
        title: "Công tác xã hội"
      },
      {
        path: "/nganh-dao-tao/viet-nam-hoc",
        title: "Việt Nam học"
      }
    ]
  },
  {
    path: "/tin-tuc",
    title: "Tin tức",
    childs: [
      {
        path: "/tin-tuc",
        title: "Tin tức cập nhật"
      }
    ]
  },
  {
    path: "/lich-khai-giang",
    title: "Lịch khai giảng"
  },
  {
    path: "/lien-he",
    title: "Liên hệ"
  },
  {
    path: "/thong-tin-tuyen-sinh",
    title: "Thông tin tuyển sinh"
  }
];
