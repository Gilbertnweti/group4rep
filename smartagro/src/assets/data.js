import { ref } from "vue";

import logo from '../assets/images/smartlogo.png';

import soyabean from "../assets/images/soya-bean-product.jpg";
import corn from "../assets/images/sweet-corn.webp";
import plantain from "../assets/images/unripe-plantain.webp";

// Original products
let products = [
    {
        id: 1,
        name: 'Corn',
        short: 'High-quality corn for various needs.',
        description: 'Our corn is sourced from the best farms and undergoes rigorous quality control to ensure freshness and nutritional value. Suitable for a variety of uses, including animal feed, human consumption, and industrial purposes.',
        image: corn,
        price: 5000, // Price in XAF
    },
    {
        id: 2,
        name: 'Soya',
        short: 'Premium-grade soya beans.',
        description: 'We offer top-quality soya beans that are rich in protein and essential nutrients. Ideal for producing soy milk, tofu, and other soy-based products. Perfect for both commercial and personal use.',
        image: soyabean,
        price: 6000, // Price in XAF
    },
    {
        id: 3,
        name: 'Plantain',
        short: 'Fresh plantains directly from the farm.',
        description: 'Our plantains are handpicked at the peak of ripeness to ensure great taste and quality. They are perfect for cooking a variety of dishes, from fried plantains to plantain chips and more.',
        image: plantain,
        price: 4000, // Price in XAF
    },
];

// Processed products
let pro_products = [
    // Corn-based products
    { id: 4, name: 'Corn Flour', short: 'Finely milled corn flour.', description: 'Ideal for baking and cooking.', price: 3000, image: corn },
    { id: 5, name: 'Cornflakes', short: 'Delicious breakfast cereal.', description: 'Perfect for a quick and healthy meal.', price: 3500, image: corn },
    { id: 6, name: 'Corn Oil', short: 'High-quality corn oil.', description: 'Great for cooking and frying.', price: 7000, image: corn },

    // Soya bean-based products
    { id: 7, name: 'Soy Milk', short: 'Nutritious soy milk.', description: 'Rich in protein and great for lactose-intolerant individuals.', price: 4000, image: soyabean },
    { id: 8, name: 'Soy Flour', short: 'Healthy soy flour.', description: 'Perfect for baking and adding to meals.', price: 3000, image: soyabean },
    { id: 9, name: 'Tofu', short: 'Plant-based protein.', description: 'Perfect for vegan meals.', price: 4500, image: soyabean },

    // Plantain-based products
    { id: 10, name: 'Plantain Chips', short: 'Crispy plantain chips.', description: 'Perfect as a snack or a treat.', price: 2500, image: plantain },
    { id: 11, name: 'Plantain Flour', short: 'Gluten-free flour.', description: 'Ideal for healthy baking and cooking.', price: 3500, image: plantain },
    { id: 12, name: 'Plantain Bread', short: 'Freshly baked bread.', description: 'Made from 100% plantain flour.', price: 5000, image: plantain },

    // Mixed products
    { id: 13, name: 'Soy-Corn Snack', short: 'Healthy soy-corn blend snack.', description: 'A delicious and nutritious snack.', price: 3000, image: soyabean },
    { id: 14, name: 'Plantain-Soy Flour', short: 'Nutritious blended flour.', description: 'A mix of plantain and soy for versatile cooking.', price: 4000, image: plantain },
    { id: 15, name: 'Corn-Plantain Chips', short: 'Crispy chips blend.', description: 'A mix of corn and plantain chips for the perfect snack.', price: 3500, image: corn },
];

export default { products, pro_products, logo };

 export const users = ref([
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Wilson" },
    { id: 5, name: "Ethan Clark" },
    { id: 6, name: "Fiona Martinez" },
    { id: 7, name: "George Lee" },
    { id: 8, name: "Hannah White" },
    { id: 9, name: "Ian Scott" },
    { id: 10, name: "Jessica Adams" },
    { id: 11, name: "Kyle Davis" },
    { id: 12, name: "Laura Hill" },
  ]);
  
  export const messages = ref([
    // General Chat Messages
    { id: 1, text: "Hello everyone!", sender: "Alice Johnson", time: "9:00 AM", chatType: "general" },
    { id: 2, text: "Hi Alice!", sender: "Bob Smith", time: "9:01 AM", chatType: "general" },
    { id: 3, text: "How's it going?", sender: "Charlie Brown", time: "9:02 AM", chatType: "general" },
  
    // Direct Messages with Alice
    { id: 4, text: "Hi there!", sender: "Alice Johnson", time: "10:00 AM", chatType: "direct", receiver: "me" },
    { id: 5, text: "Hello!", sender: "me", time: "10:01 AM", chatType: "direct", receiver: "Alice Johnson" },
    { id: 6, text: "How are you?", sender: "Alice Johnson", time: "10:02 AM", chatType: "direct", receiver: "me" },
  ]);  
  
  export const tasks = ref([
    { id: 1, title: "Prepare Sales Report", assignee: "Alice", dueDate: "2025-01-18", completed: false },
    { id: 2, title: "Inspect Inventory", assignee: "Bob", dueDate: "2025-01-20", completed: false },
    { id: 3, title: "Customer Follow-Up", assignee: "Charlie", dueDate: "2025-01-22", completed: true },
  ]);
