export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="https://noidung.dhcongdoan.vn`,
      `link rel="canonical" href="https://dhcongdoan.vn`
    )
    .replace(
      `meta property="og:url" content="https://noidung.dhcongdoan.vn`,
      `meta property="og:url" content="https://dhcongdoan.vn`
    )
    .replace(
      `"@id":"https://noidung.dhcongdoan.vn/#organization"`,
      `"@id":"https://dhcongdoan.vn/#organization"`
    )
    .replace(
      `https://noidung.dhcongdoan.vn/#logo`,
      `https://dhcongdoan.vn/#logo`
    )
    .replace(
      `https://noidung.dhcongdoan.vn/#website`,
      `https://dhcongdoan.vn/#website`
    )
    .replace(
      `https://noidung.dhcongdoan.vn/#webpage`,
      `https://dhcongdoan.vn/#webpage`
    )
    .replace(
      `"url":"https://noidung.dhcongdoan.vn"`,
      `"url":"https://dhcongdoan.vn"`
    )
    .replace(
      `"@type":"WebPage","@id":"https://noidung.dhcongdoan.vn`,
      `"@type":"WebPage","@id":"https://dhcongdoan.vn`
    )
    .replace(
      `#webpage","url":"https://noidung.dhcongdoan.vn`,
      `#webpage","url":"https://dhcongdoan.vn`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"https://noidung.dhcongdoan.vn`,
      `"mainEntityOfPage":{"@id":"https://dhcongdoan.vn/`
    )
    .replace(
      `"worksFor":{"@id":"https://noidung.dhcongdoan.vn/#organization`,
      `"worksFor":{"@id":"https://dhcongdoan.vn/#organization`
    )
    .replace(
      `"sameAs":["https://noidung.dhcongdoan.vn"]`,
      `"sameAs":["https://dhcongdoan.vn"]`
    );
};
