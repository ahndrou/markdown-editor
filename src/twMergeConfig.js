import { extendTailwindMerge } from "tailwind-merge";

// A function used in place of the regular twMerge. Set up to recognize my custom theme Tailwind theme.
// Without this, tw-merge does not recognize the given classes as font sizes.
export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-preview-h1",
        "text-preview-h2",
        "text-preview-h3",
        "text-preview-h4",
        "text-preview-p",
      ],
    },
  },
});
