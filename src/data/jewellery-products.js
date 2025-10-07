// Jewellery Products Data
// This file contains static data for 500+ jewellery products
// Can be easily replaced with API calls in the future

const categories = ["Necklace", "Earrings", "Ring", "Bangles", "Pendant", "Bracelet", "Anklet", "Mangalsutra", "Chain", "Nose Pin"];
const purities = ["22K", "18K", "24K", "18K White Gold", "18K Rose Gold", "22K Gold"];
const imageUrls = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1590122641198-a5985bcb7a5e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop"
];

const designs = [
  "Royal", "Elegant", "Classic", "Modern", "Traditional", "Contemporary",
  "Bridal", "Temple", "Antique", "Designer", "Ethnic", "Kundan",
  "Polki", "Meenakari", "Filigree", "Diamond Studded", "Pearl",
  "Ruby", "Emerald", "Sapphire", "Gemstone", "Victorian"
];

const descriptions = [
  "Exquisite design with intricate craftsmanship",
  "Perfect for special occasions and celebrations",
  "Stunning piece that adds elegance to any outfit",
  "Traditional design with modern touch",
  "Handcrafted by expert artisans",
  "Timeless beauty that never goes out of style",
  "Symbol of tradition and grace",
  "Luxurious design for the discerning connoisseur",
  "Brilliant craftsmanship with attention to detail",
  "Heritage collection with contemporary appeal"
];

// Generate 500+ products
export const jewelleryProducts = Array.from({ length: 500 }, (_, index) => {
  const id = index + 1;
  const category = categories[Math.floor(Math.random() * categories.length)];
  const design = designs[Math.floor(Math.random() * designs.length)];
  const purity = purities[Math.floor(Math.random() * purities.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  // Price ranges based on category
  const basePrices = {
    "Necklace": [80000, 250000],
    "Earrings": [30000, 120000],
    "Ring": [25000, 100000],
    "Bangles": [150000, 350000],
    "Pendant": [40000, 150000],
    "Bracelet": [60000, 180000],
    "Anklet": [45000, 120000],
    "Mangalsutra": [70000, 200000],
    "Chain": [35000, 90000],
    "Nose Pin": [8000, 35000]
  };

  const [minPrice, maxPrice] = basePrices[category];
  const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
  const discount = Math.floor(Math.random() * 20) + 5; // 5-25% discount
  const originalPrice = Math.floor(price / (1 - discount / 100));

  // Weight based on category
  const baseWeights = {
    "Necklace": [35, 75],
    "Earrings": [8, 25],
    "Ring": [5, 15],
    "Bangles": [60, 120],
    "Pendant": [10, 30],
    "Bracelet": [20, 50],
    "Anklet": [25, 60],
    "Mangalsutra": [30, 65],
    "Chain": [15, 40],
    "Nose Pin": [2, 8]
  };

  const [minWeight, maxWeight] = baseWeights[category];
  const weight = (Math.random() * (maxWeight - minWeight) + minWeight).toFixed(1);

  // Ratings between 4.3 and 5.0
  const rating = (Math.random() * 0.7 + 4.3).toFixed(1);
  const reviews = Math.floor(Math.random() * 300) + 20;

  // 10% chance to be featured
  const featured = Math.random() > 0.9;

  // 95% in stock
  const inStock = Math.random() > 0.05;

  return {
    id,
    title: `${design} ${category}${category === "Bangles" || category === "Earrings" ? " Set" : ""}`,
    description: `${description} - ${category.toLowerCase()} collection`,
    image: imageUrl,
    price,
    originalPrice,
    purity,
    weight: `${weight}g`,
    discount,
    guarantee: "Lifetime",
    rating: parseFloat(rating),
    reviews,
    inStock,
    category,
    featured
  };
});

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return jewelleryProducts.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return jewelleryProducts.filter(product => product.featured);
};

// Helper function to get products in price range
export const getProductsByPriceRange = (minPrice, maxPrice) => {
  return jewelleryProducts.filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );
};

// Helper function to get products by purity
export const getProductsByPurity = (purity) => {
  return jewelleryProducts.filter(product => product.purity === purity);
};

// Helper function to search products
export const searchProducts = (searchTerm) => {
  const term = searchTerm.toLowerCase().trim();
  return jewelleryProducts.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(term);
    const descriptionMatch = product.description.toLowerCase().includes(term);
    const categoryMatch = product.category.toLowerCase().includes(term);
    const purityMatch = product.purity.toLowerCase().includes(term);

    // Exact category match gets priority
    const exactCategoryMatch = product.category.toLowerCase() === term;

    return titleMatch || descriptionMatch || categoryMatch || purityMatch || exactCategoryMatch;
  }).sort((a, b) => {
    // Prioritize exact category matches
    const aExactMatch = a.category.toLowerCase() === term;
    const bExactMatch = b.category.toLowerCase() === term;
    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    // Then prioritize by rating
    return b.rating - a.rating;
  });
};

// Export categories for filters
export const productCategories = categories;
export const productPurities = purities;

export default jewelleryProducts;
