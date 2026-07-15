export interface ItemEffects {
  effects: { emoji: string; label: string }[];
  description: string;
  metaDescription: string;
  consume: string;
}

export function getItemData(category: string, name: string): ItemEffects {
  const cat = category.toUpperCase();

  if (cat === "EDIBLES") {
    return {
      effects: [
        { emoji: "", label: "Edible" },
        { emoji: "", label: "Package Details" },
      ],
      description: `${name} is an edible category item listed for Main Kingston Cannabis. Check the current menu and package for item details.`,
      metaDescription: `Browse ${name} cannabis edibles in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
      consume: "Review the product label and package details before purchase.",
    };
  }

  if (cat.includes("VAPE")) {
    return {
      effects: [
        { emoji: "", label: "Vape" },
        { emoji: "", label: "Compatibility" },
      ],
      description: `${name} is a vape category item listed for Main Kingston Cannabis. Check the current menu for compatibility and product details.`,
      metaDescription: `Browse ${name} vape products in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
      consume: "Review the product label and compatibility details before purchase.",
    };
  }

  if (cat === "CONCENTRATES") {
    return {
      effects: [
        { emoji: "", label: "Concentrate" },
        { emoji: "", label: "Product Format" },
      ],
      description: `${name} is a concentrate category item listed for Main Kingston Cannabis. Check the current menu and package for product details.`,
      metaDescription: `Browse ${name} cannabis concentrates in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
      consume: "Review the product label and package details before purchase.",
    };
  }

  if (cat === "PREROLLS") {
    return {
      effects: [
        { emoji: "", label: "Pre-Roll" },
        { emoji: "", label: "Pack Details" },
      ],
      description: `${name} is a pre-roll category item listed for Main Kingston Cannabis. Check the current menu for strain and package-size details.`,
      metaDescription: `Browse ${name} pre-rolls in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
      consume: "Review the product label and package details before purchase.",
    };
  }

  if (cat === "MAGIC & OTHERS") {
    return {
      effects: [
        { emoji: "", label: "Specialty" },
        { emoji: "", label: "Menu Varies" },
      ],
      description: `${name} is a specialty category item listed for Main Kingston Cannabis. Listings and details may vary by menu update.`,
      metaDescription: `Browse ${name} specialty items in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
      consume: "Review the product label and package details before purchase.",
    };
  }

  return {
    effects: [
      { emoji: "", label: "Category Item" },
      { emoji: "", label: "Menu Varies" },
    ],
    description: `${name} is listed as a category item at Main Kingston Cannabis. Confirm current details before visiting.`,
    metaDescription: `Browse ${name} in Toronto at Main Kingston Cannabis. Confirm current menu details before visiting.`,
    consume: "Review the product label and package details before purchase.",
  };
}
