export const OgpCard = async ({ url }: { url: string }) => {
  let title = "";
  let description = "";
  let ogpUrl = "";

  const cheerio = require("cheerio");

  const res = await fetch(url).then((res) => res.text());

  const $ = cheerio.load(res);
  title = $("title").text();
  if ($("meta[property='og:image']").attr("content")) {
    ogpUrl = $("meta[property='og:image']").attr("content");
  } else {
    ogpUrl =
      "https://storage.googleapis.com/portfolio21-56e7e.appspot.com/articles/placeholder/lazy_with_icon.png";
  }
  description =
    $("meta[name='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    $("meta[name='zenn:description']").attr("content");

  return (
    <a
      target="_blank"
      rel="noopener"
      href={url}
      style={{
        display: "flex",
        alignItems: "center",
        margin: "16px 0 32px",
        borderRadius: "4px",
        border: "1px solid #f5f5f5",
      }}
    >
      <img
        src={ogpUrl}
        alt="OGP image"
        width={200}
        height={140}
        style={{
          display: "block",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          objectFit: "cover",
        }}
      />
      <span
        style={{
          padding: "16px 12px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.8px",
          }}
        >
          {title}
        </span>
        <span>{description}</span>
      </span>
    </a>
  );
};
