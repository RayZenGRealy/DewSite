export type Category = "Браслеты" | "Бусы" | "Из бисера" | "Комплекты";
export type JewelryArt = "bracelet" | "necklace" | "beads" | "set";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  stone: string;
  material: string;
  description: string;
  sizes: string[];
  accent: string;
  art: JewelryArt;
  label?: string;
};

export const categories: Category[] = ["Браслеты", "Бусы", "Из бисера", "Комплекты"];

export const products: Product[] = [
  {
    id: "noir-orbit",
    name: "Noir Orbit",
    category: "Браслеты",
    price: 2400,
    stone: "Оникс",
    material: "Натуральный оникс, металлическая фурнитура",
    description: "Выразительный браслет из глубоких тёмных бусин. Минимализм формы и природный рисунок каждого камня.",
    sizes: ["16 см", "17 см", "18 см", "19 см"],
    accent: "#696767",
    art: "bracelet",
    label: "Бестселлер",
  },
  {
    id: "moon-thread",
    name: "Moon Thread",
    category: "Бусы",
    price: 3800,
    stone: "Лунный камень",
    material: "Натуральный лунный камень, фурнитура",
    description: "Мягкое сияние природных камней и тонкая линия бус, которая выглядит по-разному в каждом свете.",
    sizes: ["42 см", "46 см", "50 см"],
    accent: "#c4c2b9",
    art: "necklace",
    label: "Новая коллекция",
  },
  {
    id: "violet-dust",
    name: "Violet Dust",
    category: "Из бисера",
    price: 1950,
    stone: "Аметист",
    material: "Бисер, натуральный аметист, фурнитура",
    description: "Деликатное переплетение бисера и фиолетовых акцентов. Лёгкое авторское украшение.",
    sizes: ["Универсальный"],
    accent: "#8c708f",
    art: "beads",
  },
  {
    id: "forest-echo",
    name: "Forest Echo",
    category: "Браслеты",
    price: 2650,
    stone: "Малахит",
    material: "Натуральный малахит, металлическая фурнитура",
    description: "Зелёный цвет, словно природный узор леса. Каждая бусина имеет неповторимые прожилки.",
    sizes: ["16 см", "17 см", "18 см", "19 см"],
    accent: "#407562",
    art: "bracelet",
  },
  {
    id: "garnet-hour",
    name: "Garnet Hour",
    category: "Бусы",
    price: 3450,
    stone: "Гранат",
    material: "Натуральный гранат, фурнитура",
    description: "Тёмно-винный оттенок граната в элегантном украшении для вечерних образов.",
    sizes: ["42 см", "46 см", "50 см"],
    accent: "#834650",
    art: "necklace",
  },
  {
    id: "pearl-code",
    name: "Pearl Code",
    category: "Из бисера",
    price: 1790,
    stone: "Стеклянный бисер",
    material: "Качественный бисер, металлическая фурнитура",
    description: "Лаконичный бисерный ритм и почти архитектурная геометрия. Ручная сборка.",
    sizes: ["Универсальный"],
    accent: "#c9b798",
    art: "beads",
  },
  {
    id: "solstice",
    name: "Solstice",
    category: "Комплекты",
    price: 4900,
    stone: "Оникс и лунный камень",
    material: "Натуральные камни, бисер, фурнитура",
    description: "Комплект из контрастных фактур: светлый камень и тёмный оникс, объединённые одной идеей.",
    sizes: ["S", "M", "L"],
    accent: "#a19888",
    art: "set",
  },
  {
    id: "amethyst-line",
    name: "Amethyst Line",
    category: "Браслеты",
    price: 2550,
    stone: "Аметист",
    material: "Натуральный аметист, металлическая фурнитура",
    description: "Чистая форма и насыщенный цвет аметиста. Украшение на каждый день и для особых моментов.",
    sizes: ["16 см", "17 см", "18 см", "19 см"],
    accent: "#8b6597",
    art: "bracelet",
  },
];

export const productById = (id: string): Product | undefined =>
  products.find((product) => product.id === id);

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
