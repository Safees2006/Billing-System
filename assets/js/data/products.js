const catalog = [
  {
    category: "Fruits",
    items: ["Apple", "Banana", "Orange", "Mango", "Grapes", "Watermelon", "Pineapple", "Strawberry", "Kiwi", "Pomegranate"]
  },
  {
    category: "Vegetables",
    items: ["Potato", "Tomato", "Onion", "Carrot", "Cabbage", "Spinach", "Garlic", "Ginger", "Cauliflower", "Peas"]
  },
  {
    category: "Dairy Products",
    items: ["Milk", "Butter", "Cheese", "Yogurt", "Ghee", "Cream", "Paneer", "Buttermilk", "Whipped Cream", "Condensed Milk"]
  },
  {
    category: "Bakery Items",
    items: ["Bread", "Bun", "Cake", "Muffin", "Croissant", "Doughnut", "Cookie", "Biscuit", "Pastry", "Rusk"]
  }, 
    items: ["Rice", "Wheat Flour", "Cornflakes", "Oats", "Muesli", "Semolina", "Barley", "Porridge", "Ragi Flour", "Millet"]
  },
  {
    category: "Pulses and Lentils",
    items: [
      "Red Lentils (Masoor Dal)",
      "Green Gram (Moong Dal)",
      "Chickpeas (Chana)",
      "Kidney Beans (Rajma)",
      "Black Gram (Urad Dal)",
      "Pigeon Peas (Toor Dal)",
      "White Peas",
      "Cowpeas",
      "Split Peas",
      "Soybeans"
    ]
  },
  {
    category: "Cooking Essentials",
    items: [
      "Salt",
      "Sugar",
      "Cooking Oil",
      "Ghee",
      "Vinegar",
      "Soy Sauce",
      "Baking Powder",
      "Spices (Turmeric, Cumin, Coriander, etc.)",
      "Mustard Seeds",
      "Asafoetida"
    ]
  },
  {
    category: "Snacks and Ready-to-Eat Items",
    items: ["Chips", "Popcorn", "Instant Noodles", "Crackers", "Energy Bars", "Nachos", "Cookies", "Trail Mix", "Pretzels", "Dried Fruits"]
  },
  {
    category: "Beverages and Drinks",
    items: ["Tea", "Coffee", "Juice", "Soda", "Bottled Water", "Milkshake", "Soft Drinks", "Energy Drinks", "Iced Tea", "Lassi"]
  },
  {
    category: "Frozen and Packaged Foods",
    items: [
      "Frozen Vegetables",
      "Frozen Meat",
      "Frozen Pizza",
      "Ice Cream",
      "Ready Meals",
      "Frozen Snacks",
      "Instant Pasta",
      "Packaged Gravy",
      "Packaged Soups",
      "Frozen Paratha"
    ]
  },
  {
    category: "Condiments and Sauces",
    items: ["Tomato Ketchup", "Mayonnaise", "Mustard", "Hot Sauce", "Soy Sauce", "Pickles", "Chutney", "Jam", "Honey", "Peanut Butter"]
  },
  {
    category: "Personal Care Items",
    items: [
      "Toothpaste",
      "Toothbrush",
      "Soap",
      "Shampoo",
      "Conditioner",
      "Body Lotion",
      "Deodorant",
      "Face Wash",
      "Hair Oil",
      "Razor"
    ]
  },
  {
    category: "Household and Cleaning Products",
    items: [
      "Detergent Powder",
      "Dishwashing Liquid",
      "Floor Cleaner",
      "Toilet Cleaner",
      "Bleach",
      "Disinfectant Spray",
      "Air Freshener",
      "Garbage Bags",
      "Paper Towels",
      "Sponges"
    ]
  },
  {
    category: "Baby Products",
    items: [
      "Baby Powder",
      "Baby Lotion",
      "Baby Shampoo",
      "Diapers",
      "Baby Wipes",
      "Baby Food",
      "Formula Milk",
      "Feeding Bottles",
      "Teething Gel",
      "Bibs"
    ]
  }
];

const categoryBasePrice = {
  Fruits: 80,
  Vegetables: 50,
  "Dairy Products": 95,
  "Bakery Items": 60,
  "Grains and Cereals": 75,
  "Pulses and Lentils": 85,
  "Cooking Essentials": 90,
  "Snacks and Ready-to-Eat Items": 70,
  "Beverages and Drinks": 55,
  "Frozen and Packaged Foods": 120,
  "Condiments and Sauces": 65,
  "Personal Care Items": 110,
  "Household and Cleaning Products": 130,
  "Baby Products": 140
};

const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72";

function icon(hex) {
  return `${TWEMOJI_BASE}/${hex}.png`;
}

export function getProductImageByName(name, category = "") {
  const text = `${name} ${category}`.toLowerCase();

  if (text.includes("apple")) return icon("1f34e");
  if (text.includes("banana")) return icon("1f34c");
  if (text.includes("orange")) return icon("1f34a");
  if (text.includes("mango")) return icon("1f96d");
  if (text.includes("grape")) return icon("1f347");
  if (text.includes("watermelon")) return icon("1f349");
  if (text.includes("pineapple")) return icon("1f34d");
  if (text.includes("strawberry")) return icon("1f353");
  if (text.includes("kiwi")) return icon("1f95d");
  if (text.includes("pomegranate")) return icon("1f95d");

  if (text.includes("potato")) return icon("1f954");
  if (text.includes("tomato")) return icon("1f345");
  if (text.includes("onion")) return icon("1f9c5");
  if (text.includes("carrot")) return icon("1f955");
  if (text.includes("cabbage") || text.includes("spinach")) return icon("1f96c");
  if (text.includes("garlic")) return icon("1f9c4");
  if (text.includes("ginger")) return icon("1f9c4");
  if (text.includes("cauliflower") || text.includes("peas")) return icon("1f966");

  if (text.includes("milk")) return icon("1f95b");
  if (text.includes("butter")) return icon("1f9c8");
  if (text.includes("cheese")) return icon("1f9c0");
  if (text.includes("yogurt") || text.includes("cream")) return icon("1f963");
  if (text.includes("paneer")) return icon("1f9c0");

  if (text.includes("bread") || text.includes("bun") || text.includes("rusk")) return icon("1f35e");
  if (text.includes("cake") || text.includes("pastry")) return icon("1f370");
  if (text.includes("muffin")) return icon("1f9c1");
  if (text.includes("croissant")) return icon("1f950");
  if (text.includes("doughnut")) return icon("1f369");
  if (text.includes("cookie") || text.includes("biscuit")) return icon("1f36a");

  if (text.includes("rice")) return icon("1f35a");
  if (text.includes("flour") || text.includes("wheat") || text.includes("millet")) return icon("1f33e");
  if (text.includes("cornflakes") || text.includes("muesli") || text.includes("oats") || text.includes("porridge")) return icon("1f95c");
  if (text.includes("barley") || text.includes("semolina") || text.includes("ragi")) return icon("1f35a");

  if (text.includes("lentil") || text.includes("dal") || text.includes("chickpeas") || text.includes("beans") || text.includes("peas") || text.includes("soy")) return icon("1fadb");

  if (text.includes("salt")) return icon("1f9c2");
  if (text.includes("sugar") || text.includes("honey") || text.includes("jam")) return icon("1f36f");
  if (text.includes("oil") || text.includes("ghee")) return icon("1fad2");
  if (text.includes("vinegar") || text.includes("sauce") || text.includes("ketchup") || text.includes("mustard") || text.includes("mayo") || text.includes("chutney") || text.includes("pickles") || text.includes("peanut butter")) return icon("1f96b");
  if (text.includes("spice") || text.includes("turmeric") || text.includes("cumin")) return icon("1f9c2");

  if (text.includes("chips") || text.includes("nachos") || text.includes("pretzels") || text.includes("crackers")) return icon("1f35f");
  if (text.includes("popcorn")) return icon("1f37f");
  if (text.includes("noodles") || text.includes("pasta")) return icon("1f35d");
  if (text.includes("energy bar") || text.includes("trail mix") || text.includes("dried fruits")) return icon("1f96c");

  if (text.includes("tea") || text.includes("lassi")) return icon("1f375");
  if (text.includes("coffee")) return icon("2615");
  if (text.includes("juice") || text.includes("milkshake")) return icon("1f9c3");
  if (text.includes("soda") || text.includes("soft drink") || text.includes("energy drink")) return icon("1f964");
  if (text.includes("water")) return icon("1f6b0");

  if (text.includes("frozen") || text.includes("ice cream")) return icon("1f368");
  if (text.includes("pizza")) return icon("1f355");
  if (text.includes("meat")) return icon("1f969");
  if (text.includes("soup") || text.includes("gravy") || text.includes("meal")) return icon("1f372");
  if (text.includes("paratha")) return icon("1f95e");

  if (text.includes("toothpaste") || text.includes("toothbrush")) return icon("1faa5");
  if (text.includes("soap")) return icon("1f9fc");
  if (text.includes("shampoo") || text.includes("conditioner") || text.includes("lotion") || text.includes("deodorant") || text.includes("face wash") || text.includes("hair oil")) return icon("1f9f4");
  if (text.includes("razor")) return icon("1fa92");

  if (text.includes("detergent") || text.includes("dishwashing") || text.includes("cleaner") || text.includes("bleach") || text.includes("disinfectant") || text.includes("freshener") || text.includes("sponges")) return icon("1f9fd");
  if (text.includes("garbage bag")) return icon("1f5d1");
  if (text.includes("paper towel")) return icon("1f9fb");

  if (text.includes("baby") || text.includes("diaper") || text.includes("feeding bottle") || text.includes("formula") || text.includes("bibs") || text.includes("teething")) return icon("1f37c");

  if (category.toLowerCase().includes("fruit")) return icon("1f34e");
  if (category.toLowerCase().includes("vegetable")) return icon("1f955");
  if (category.toLowerCase().includes("dairy")) return icon("1f95b");
  if (category.toLowerCase().includes("bakery")) return icon("1f35e");
  if (category.toLowerCase().includes("beverage")) return icon("1f964");
  if (category.toLowerCase().includes("personal")) return icon("1f9f4");

  return icon("1f6d2");
}

export const defaultProducts = catalog.flatMap((section, sectionIndex) =>
  section.items.map((name, itemIndex) => ({
    id: `p-${sectionIndex + 1}-${itemIndex + 1}`,
    name,
    category: section.category,
    price: categoryBasePrice[section.category] + itemIndex * 3,
    stock: 40 + ((sectionIndex + itemIndex) % 6) * 10,
    image: getProductImageByName(name, section.category)
  }))
);
