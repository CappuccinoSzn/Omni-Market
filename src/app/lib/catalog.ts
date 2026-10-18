export type ProductCondition = "New" | "Like new" | "Good";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  condition: ProductCondition;
  seller: string;
  location: string;
  image: string;
  color: string;
  badge: string | null;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  highlights: string[];
};

export type Category = {
  name: string;
  slug: string;
  emoji: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    name: "Electronics",
    slug: "electronics",
    emoji: "🎧",
    blurb: "Audio, gaming and everyday tech from verified sellers.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Fashion",
    slug: "fashion",
    emoji: "👟",
    blurb: "Shoes, watches and bags that still have plenty of life left.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Home & Living",
    slug: "home-living",
    emoji: "🪴",
    blurb: "Lighting, storage and small upgrades for any space.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Books",
    slug: "books",
    emoji: "📚",
    blurb: "Study sets, readers and reference titles at fair prices.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Sports",
    slug: "sports",
    emoji: "⚽",
    blurb: "Gear for the pitch, the gym and everything in between.",
    image:
      "https://images.unsplash.com/photo-1614632537190-23e4b2e69c29?auto=format&fit=crop&w=700&q=85",
  },
];

export const products: Product[] = [
  {
    id: 1,
    slug: "wireless-headphones",
    name: "Wireless headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3200,
    condition: "Like new",
    seller: "Tech Corner",
    location: "Nairobi",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    color: "#f1e9df",
    badge: "Popular",
    rating: 4.7,
    reviews: 42,
    stock: 3,
    description:
      "Over-ear wireless headphones with a comfortable fit for long listening. Used gently for a few months, comes with the original cable.",
    highlights: [
      "Bluetooth pairing works on first try",
      "Roughly 20 hours per charge",
      "Includes aux cable and pouch",
    ],
  },
  {
    id: 2,
    slug: "everyday-sneakers",
    name: "Everyday sneakers",
    category: "Fashion",
    price: 3200,
    oldPrice: null,
    condition: "New",
    seller: "Urban Finds",
    location: "Kisumu",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    color: "#f7e5e1",
    badge: "New arrival",
    rating: 4.5,
    reviews: 18,
    stock: 6,
    description:
      "Brand new pair of low-top sneakers in a classic colourway. Cushioned sole suited to daily walking and campus life.",
    highlights: [
      "Unworn, still in the box",
      "Breathable knit upper",
      "Sizes available on request",
    ],
  },
  {
    id: 3,
    slug: "minimal-desk-lamp",
    name: "Minimal desk lamp",
    category: "Home & Living",
    price: 1850,
    oldPrice: null,
    condition: "Like new",
    seller: "Home Edit",
    location: "Nairobi",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
    color: "#e9ece4",
    badge: null,
    rating: 4.3,
    reviews: 9,
    stock: 2,
    description:
      "A slim LED desk lamp that fits small tables without crowding them. Warm light, adjustable arm, low power draw.",
    highlights: [
      "Three brightness levels",
      "Sturdy weighted base",
      "USB powered",
    ],
  },
  {
    id: 4,
    slug: "classic-wristwatch",
    name: "Classic wristwatch",
    category: "Fashion",
    price: 2750,
    oldPrice: 3500,
    condition: "Good",
    seller: "Style Studio",
    location: "Mombasa",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    color: "#e9e7df",
    badge: "Great deal",
    rating: 4.6,
    reviews: 27,
    stock: 1,
    description:
      "Analog wristwatch with a leather strap and a clean dial. Light wear on the strap from regular use, crystal is unmarked.",
    highlights: [
      "Keeps accurate time",
      "Strap easily replaceable",
      "Water resistant for splashes",
    ],
  },
  {
    id: 5,
    slug: "study-essentials",
    name: "Study essentials",
    category: "Books",
    price: 1200,
    oldPrice: null,
    condition: "Good",
    seller: "Book Haven",
    location: "Nakuru",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",
    color: "#e8e9e3",
    badge: null,
    rating: 4.1,
    reviews: 12,
    stock: 8,
    description:
      "A starter set of revised course readers plus notebooks. Pages are intact with only light highlighting in two chapters.",
    highlights: [
      "Current edition covers",
      "Four ruled notebooks included",
      "No missing pages",
    ],
  },
  {
    id: 6,
    slug: "wireless-game-controller",
    name: "Wireless game controller",
    category: "Electronics",
    price: 2100,
    oldPrice: null,
    condition: "Like new",
    seller: "Pixel Store",
    location: "Nairobi",
    image:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=700&q=85",
    color: "#e8e8e8",
    badge: "Popular",
    rating: 4.8,
    reviews: 33,
    stock: 4,
    description:
      "Wireless controller with responsive triggers and no stick drift. Charged and tested before listing.",
    highlights: [
      "Rechargeable battery",
      "No stick drift",
      "Pairs with console and PC",
    ],
  },
  {
    id: 7,
    slug: "everyday-backpack",
    name: "Everyday backpack",
    category: "Fashion",
    price: 1600,
    oldPrice: null,
    condition: "New",
    seller: "Carry Co.",
    location: "Eldoret",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    color: "#e7e9e2",
    badge: null,
    rating: 4.4,
    reviews: 21,
    stock: 5,
    description:
      "Water-resistant backpack with a padded laptop sleeve and enough room for a change of clothes. Never used.",
    highlights: [
      "Fits a 15-inch laptop",
      "Padded shoulder straps",
      "Hidden front pocket",
    ],
  },
  {
    id: 8,
    slug: "football",
    name: "Football",
    category: "Sports",
    price: 950,
    oldPrice: 1200,
    condition: "New",
    seller: "Play Zone",
    location: "Thika",
    image:
      "https://images.unsplash.com/photo-1614632537190-23e4b2e69c29?auto=format&fit=crop&w=700&q=85",
    color: "#f2e9dc",
    badge: "Great deal",
    rating: 4.2,
    reviews: 7,
    stock: 10,
    description:
      "Size 5 match ball with stitched panels, suitable for grass and turf. Arrives inflated and ready to play.",
    highlights: [
      "Size 5, regulation weight",
      "Stitched for durability",
      "Grass and turf friendly",
    ],
  },
];

export const money = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug) ?? null;

export const getProduct = (id: number) =>
  products.find((product) => product.id === id) ?? null;

export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug) ?? null;

export const countByCategory = (name: string) =>
  products.filter((product) => product.category === name).length;

export const featuredProducts = products.filter(
  (product) => product.badge !== null
);

export const latestProducts = [...products].reverse().slice(0, 4);

export const relatedProducts = (product: Product) =>
  products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .concat(
      products.filter(
        (item) => item.category !== product.category && item.id !== product.id
      )
    )
    .slice(0, 4);

export const deals = products.filter((product) => product.oldPrice !== null);

export const discountPercent = (product: Product) =>
  product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
