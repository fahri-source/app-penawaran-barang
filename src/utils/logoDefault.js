import defaultLogo from "../assets/logo-ajs.png";

export const getLogoPerusahaan = (logoCustom) => {
  return logoCustom || defaultLogo;
};