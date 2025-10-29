import React from "react";
import Image from "next/image";

// TODO: Currently hitting the fallback URL every time in development.
// This needs to be cleaned up and resolved with the DNS setup for local dev inside of docker containers.
// The api.mysnowclub.local domain should be properly resolvable from within the vendors container.

type VendorLogoProps = {
  logoUrl?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  renderFallback?: boolean;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.STRAPI_URL ||
  "http://localhost:1337";

const constructImageUrl = (logoUrl: string | undefined): string | null => {
  return !logoUrl ? null : `${API_URL}${logoUrl}`;
};

const constructFallbackImageUrl = (
  logoUrl: string | undefined,
): string | null => {
  return !logoUrl ? null : `${API_FALLBACK_URL}${logoUrl}`;
};

const defaultStyle = { objectFit: "contain" as const };

export const VendorLogo: React.FC<VendorLogoProps> = ({
  logoUrl,
  width = 40,
  height = 40,
  style = defaultStyle,
  renderFallback = true,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [fallbackLoading, setFallbackLoading] = React.useState(true);
  const [useFallbackUrl, setUseFallbackUrl] = React.useState(false);

  const fullImageUrl = useFallbackUrl
    ? constructFallbackImageUrl(logoUrl)
    : constructImageUrl(logoUrl);

  const handleImageError = () => {
    if (!useFallbackUrl && process.env.NODE_ENV === "development") {
      setUseFallbackUrl(true);
      setImageLoading(true);
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  if (!logoUrl || imageError) {
    if (renderFallback) {
      return (
        <Image
          src="/assets/images/snowgroup.svg"
          alt="Vendor logo"
          width={width}
          height={height}
          style={{
            ...style,
            opacity: fallbackLoading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          onError={() => setFallbackLoading(false)}
          onLoad={() => setFallbackLoading(false)}
        />
      );
    }
    return <div style={{ width, height }} />;
  }

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={fullImageUrl || ""}
        alt="Vendor logo"
        width={width}
        height={height}
        style={{
          ...style,
          opacity: imageLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
        onError={handleImageError}
        onLoad={() => setImageLoading(false)}
      />
    </div>
  );
};

export default VendorLogo;
