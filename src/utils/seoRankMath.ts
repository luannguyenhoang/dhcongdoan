export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="https://admindhcd.devlab.info.vn`,
      `link rel="canonical" href="http://10.10.92.6:3055`
    )
    .replace(
      `meta property="og:url" content="https://admindhcd.devlab.info.vn`,
      `meta property="og:url" content="http://10.10.92.6:3055`
    )
    .replace(
      `"@id":"https://admindhcd.devlab.info.vn/#organization"`,
      `"@id":"http://10.10.92.6:3055/#organization"`
    )
    .replace(
      `https://admindhcd.devlab.info.vn/#logo`,
      `http://10.10.92.6:3055/#logo`
    )
    .replace(
      `https://admindhcd.devlab.info.vn/#website`,
      `http://10.10.92.6:3055/#website`
    )
    .replace(
      `https://admindhcd.devlab.info.vn/#webpage`,
      `http://10.10.92.6:3055/#webpage`
    )
    .replace(
      `"url":"https://admindhcd.devlab.info.vn"`,
      `"url":"http://10.10.92.6:3055"`
    )
    .replace(
      `"@type":"WebPage","@id":"https://admindhcd.devlab.info.vn`,
      `"@type":"WebPage","@id":"http://10.10.92.6:3055`
    )
    .replace(
      `#webpage","url":"https://admindhcd.devlab.info.vn`,
      `#webpage","url":"http://10.10.92.6:3055`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"https://admindhcd.devlab.info.vn`,
      `"mainEntityOfPage":{"@id":"http://10.10.92.6:3055/`
    )
    .replace(
      `"worksFor":{"@id":"https://admindhcd.devlab.info.vn/#organization`,
      `"worksFor":{"@id":"http://10.10.92.6:3055/#organization`
    )
    .replace(
      `"sameAs":["https://admindhcd.devlab.info.vn"]`,
      `"sameAs":["http://10.10.92.6:3055"]`
    );
};
