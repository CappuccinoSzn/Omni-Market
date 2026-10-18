// Single place to configure real contact channels for the marketplace.
// While a value is null the UI shows an honest "not configured yet" message.
export const site = {
  name: "Omni Market",
  tagline: "Discover something good",
  currency: "KSh",
  supportEmail: null as string | null,
  supportPhone: null as string | null,
};

export type Site = typeof site;
