import { createElement } from "react";
import * as HIconsSolid from "@heroicons/react/24/solid";
import * as HIconsOutline from "@heroicons/react/24/outline";

const validIconNames = [
  ...Object.keys(HIconsSolid),
  ...Object.keys(HIconsOutline),
];
const validIconVariants = ["outline", "solid"];
const iconRegex = new RegExp(
  `^(${validIconNames.join("|")}):(${validIconVariants.join("|")})$`
);

const AppIcons = ({ icon, className }) => {
  if (!iconRegex.test(icon)) {
    console.error(
      `Invalid icon format: "${icon}". The icon prop should be in the format "${validIconNames[0]}:outline" or "${validIconNames[0]}:solid".`
    );
    return null;
  }

  const [iconName, variant] = icon.split(":");
  const icons = variant === "outline" ? HIconsOutline : HIconsSolid;
  const TheIcon = icons[iconName];
  return createElement(TheIcon, { className, "aria-hidden": true });
};

export default AppIcons;
