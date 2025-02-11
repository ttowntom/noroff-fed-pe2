import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

export default function SEO({
  title = "Holidaze | Your Next Adventure Awaits",
  description = "Find and book unique accommodations on Holidaze. Experience memorable stays across the world.",
  name = "Holidaze",
  type = "website",
  image,
  url = typeof window !== "undefined" ? window.location.href : "",
  locale = "en_US",
  keywords = "accommodation, hotels, venues, travel, booking",
  robots = "index, follow",
  jsonLd,
  canonical,
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}
      <meta name="language" content={locale.split("_")[0]} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={locale} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {name && <meta property="og:site_name" content={name} />}

      {/* Twitter Card */}
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {name && <meta name="twitter:creator" content={name} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["website", "article", "product"]),
  image: PropTypes.string,
  url: PropTypes.string,
  locale: PropTypes.string,
  keywords: PropTypes.string,
  robots: PropTypes.string,
  jsonLd: PropTypes.object,
  canonical: PropTypes.string,
};
