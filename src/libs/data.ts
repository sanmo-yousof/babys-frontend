// Header Links
type NavItems = {
    id: number;
    label: string;
    href: string;
};

export const navItems: NavItems[] = [
    { id: 1, label: 'BREAKFAST', href: 'breakfast' },
    { id: 2, label: 'BRUNCH', href: 'brunch' },
    { id: 3, label: 'LUNCH', href: 'lunch' },
    { id: 4, label: 'DINNER', href: 'dinner' },
];

// Recipe Card Data
import pizza from '../assets/images/pizza.jpg';
type Recipe = {
    id: number;
    category: string;
    title: string;
    description: string;
    time: number;
    persons: number;
    rating: number;
    image: string;
    href: string;
};

export const recipes: Recipe[] = [
    {
        id: 1,
        category: 'breakfast',
        title: 'Homemade Pizza',
        description:
            'A crispy homemade pizza loaded with fresh toppings, perfect for a hearty breakfast. Easy to make and delicious to eat every morning.',
        time: 45,
        persons: 4,
        rating: 4.5,
        image: pizza,
        href: '/recipe/1',
    },
    {
        id: 2,
        category: 'breakfast',
        title: 'Mac & Bacon (and cheese)',
        description:
            'Creamy macaroni with crispy bacon strips and melted cheese — the ultimate comfort breakfast that keeps you full and energized all day.',
        time: 30,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/2',
    },
    {
        id: 3,
        category: 'breakfast',
        title: 'Chicken Broccoli Soup',
        description:
            'A warm and nourishing chicken broccoli soup with a creamy broth, ideal for a light yet filling breakfast on cold mornings.',
        time: 35,
        persons: 3,
        rating: 4.3,
        image: pizza,
        href: '/recipe/3',
    },
];

export const popularRecipes: Recipe[] = [
    {
        id: 4,
        category: 'breakfast',
        title: 'Avocado Toast',
        description:
            'Toasted sourdough bread topped with creamy avocado, poached eggs, and a sprinkle of chili flakes. Quick, healthy and delicious.',
        time: 15,
        persons: 2,
        rating: 4.7,
        image: pizza,
        href: '/recipe/4',
    },
    {
        id: 5,
        category: 'breakfast',
        title: 'Fluffy Pancakes',
        description:
            'Light and fluffy buttermilk pancakes served with maple syrup and fresh berries. A classic breakfast loved by everyone.',
        time: 20,
        persons: 4,
        rating: 4.9,
        image: pizza,
        href: '/recipe/5',
    },
    {
        id: 6,
        category: 'breakfast',
        title: 'Veggie Omelette',
        description:
            'A protein-packed omelette loaded with colorful bell peppers, mushrooms, spinach and melted cheese. Ready in minutes.',
        time: 15,
        persons: 1,
        rating: 4.4,
        image: pizza,
        href: '/recipe/6',
    },
    {
        id: 7,
        category: 'breakfast',
        title: 'Berry Smoothie Bowl',
        description:
            'A thick and creamy smoothie bowl topped with granola, fresh strawberries, blueberries and a drizzle of honey.',
        time: 10,
        persons: 1,
        rating: 4.6,
        image: pizza,
        href: '/recipe/7',
    },
    {
        id: 8,
        category: 'breakfast',
        title: 'French Toast',
        description:
            'Golden crispy French toast made with thick brioche bread, eggs, cinnamon and vanilla. Served with powdered sugar on top.',
        time: 20,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/8',
    },
    {
        id: 9,
        category: 'breakfast',
        title: 'Overnight Oats',
        description:
            'No-cook creamy oats prepared the night before with chia seeds, almond milk, banana slices and a swirl of peanut butter.',
        time: 5,
        persons: 1,
        rating: 4.5,
        image: pizza,
        href: '/recipe/9',
    },
];

// BreakFast Page Data
export const breakfastRecipes: Recipe[] = [
    {
        id: 1,
        category: 'breakfast',
        title: 'Homemade Pizza',
        description:
            'A crispy homemade pizza loaded with fresh toppings, perfect for a hearty breakfast. Easy to make and delicious to eat every morning.',
        time: 45,
        persons: 4,
        rating: 4.5,
        image: pizza,
        href: '/recipe/1',
    },
    {
        id: 2,
        category: 'breakfast',
        title: 'Mac & Bacon (and cheese)',
        description:
            'Creamy macaroni with crispy bacon strips and melted cheese — the ultimate comfort breakfast that keeps you full and energized all day.',
        time: 30,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/2',
    },
    {
        id: 3,
        category: 'breakfast',
        title: 'Chicken Broccoli Soup',
        description:
            'A warm and nourishing chicken broccoli soup with a creamy broth, ideal for a light yet filling breakfast on cold mornings.',
        time: 35,
        persons: 3,
        rating: 4.3,
        image: pizza,
        href: '/recipe/3',
    },
    {
        id: 4,
        category: 'breakfast',
        title: 'Avocado Toast',
        description:
            'Toasted sourdough bread topped with creamy avocado, poached eggs, and a sprinkle of chili flakes. Quick, healthy and delicious.',
        time: 15,
        persons: 2,
        rating: 4.7,
        image: pizza,
        href: '/recipe/4',
    },
    {
        id: 5,
        category: 'breakfast',
        title: 'Fluffy Pancakes',
        description:
            'Light and fluffy buttermilk pancakes served with maple syrup and fresh berries. A classic breakfast loved by everyone.',
        time: 20,
        persons: 4,
        rating: 4.9,
        image: pizza,
        href: '/recipe/5',
    },
    {
        id: 6,
        category: 'breakfast',
        title: 'Veggie Omelette',
        description:
            'A protein-packed omelette loaded with colorful bell peppers, mushrooms, spinach and melted cheese. Ready in minutes.',
        time: 15,
        persons: 1,
        rating: 4.4,
        image: pizza,
        href: '/recipe/6',
    },
    {
        id: 7,
        category: 'breakfast',
        title: 'Berry Smoothie Bowl',
        description:
            'A thick and creamy smoothie bowl topped with granola, fresh strawberries, blueberries and a drizzle of honey.',
        time: 10,
        persons: 1,
        rating: 4.6,
        image: pizza,
        href: '/recipe/7',
    },
    {
        id: 8,
        category: 'breakfast',
        title: 'French Toast',
        description:
            'Golden crispy French toast made with thick brioche bread, eggs, cinnamon and vanilla. Served with powdered sugar on top.',
        time: 20,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/8',
    },
    {
        id: 9,
        category: 'breakfast',
        title: 'Overnight Oats',
        description:
            'No-cook creamy oats prepared the night before with chia seeds, almond milk, banana slices and a swirl of peanut butter.',
        time: 5,
        persons: 1,
        rating: 4.5,
        image: pizza,
        href: '/recipe/9',
    },
    {
        id: 10,
        category: 'breakfast',
        title: 'Egg Benedict',
        description:
            'Classic eggs benedict with Canadian bacon, poached eggs and rich hollandaise sauce served on a toasted English muffin.',
        time: 25,
        persons: 2,
        rating: 4.7,
        image: pizza,
        href: '/recipe/10',
    },
];

// Brunch Page Data
export const brunchRecipes: Recipe[] = [
    {
        id: 1,
        category: 'brunch',
        title: 'Avocado Eggs Benedict',
        description:
            'A brunch classic with creamy avocado, poached eggs and hollandaise sauce on toasted English muffins. Perfect for lazy weekends.',
        time: 25,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/1',
    },
    {
        id: 2,
        category: 'brunch',
        title: 'Smoked Salmon Bagel',
        description:
            'Toasted bagel topped with cream cheese, smoked salmon, capers and red onion. A deli-style brunch favorite ready in minutes.',
        time: 10,
        persons: 2,
        rating: 4.7,
        image: pizza,
        href: '/recipe/2',
    },
    {
        id: 3,
        category: 'brunch',
        title: 'Shakshuka',
        description:
            'Poached eggs in a spiced tomato and bell pepper sauce, served with crusty bread for dipping. A Middle Eastern brunch staple.',
        time: 30,
        persons: 3,
        rating: 4.9,
        image: pizza,
        href: '/recipe/3',
    },
    {
        id: 4,
        category: 'brunch',
        title: 'Croque Madame',
        description:
            'A French classic toasted ham and cheese sandwich topped with a fried egg and creamy bechamel sauce. Rich and satisfying.',
        time: 20,
        persons: 2,
        rating: 4.6,
        image: pizza,
        href: '/recipe/4',
    },
    {
        id: 5,
        category: 'brunch',
        title: 'Banana Walnut Waffles',
        description:
            'Crispy golden waffles loaded with mashed banana and crunchy walnuts, drizzled with honey and served with whipped cream.',
        time: 25,
        persons: 3,
        rating: 4.8,
        image: pizza,
        href: '/recipe/5',
    },
    {
        id: 6,
        category: 'brunch',
        title: 'Spinach Mushroom Frittata',
        description:
            'A hearty Italian-style baked omelette packed with sautéed mushrooms, spinach, garlic and parmesan cheese. Great for sharing.',
        time: 35,
        persons: 4,
        rating: 4.5,
        image: pizza,
        href: '/recipe/6',
    },
    {
        id: 7,
        category: 'brunch',
        title: 'Acai Smoothie Bowl',
        description:
            'A thick and vibrant acai smoothie bowl topped with coconut flakes, sliced kiwi, fresh mango and crunchy granola.',
        time: 10,
        persons: 1,
        rating: 4.7,
        image: pizza,
        href: '/recipe/7',
    },
    {
        id: 8,
        category: 'brunch',
        title: 'Brioche French Toast',
        description:
            'Thick slices of buttery brioche soaked in vanilla custard and pan-fried until golden. Served with fresh berries and maple syrup.',
        time: 20,
        persons: 2,
        rating: 4.9,
        image: pizza,
        href: '/recipe/8',
    },
    {
        id: 9,
        category: 'brunch',
        title: 'Loaded Hash Browns',
        description:
            'Crispy golden hash browns loaded with sour cream, chives, crispy bacon bits and melted cheddar cheese. Irresistibly good.',
        time: 30,
        persons: 2,
        rating: 4.4,
        image: pizza,
        href: '/recipe/9',
    },
    {
        id: 10,
        category: 'brunch',
        title: 'Greek Yogurt Parfait',
        description:
            'Creamy Greek yogurt layered with homemade granola, fresh blueberries, strawberries and a generous drizzle of honey.',
        time: 5,
        persons: 1,
        rating: 4.6,
        image: pizza,
        href: '/recipe/10',
    },
];

// Lunch Page Data
export const lunchRecipes: Recipe[] = [
    {
        id: 1,
        category: 'lunch',
        title: 'Grilled Chicken Wrap',
        description:
            'Juicy grilled chicken strips wrapped in a soft tortilla with lettuce, tomatoes, cheddar cheese and a drizzle of garlic mayo sauce.',
        time: 20,
        persons: 2,
        rating: 4.7,
        image: pizza,
        href: '/recipe/1',
    },
    {
        id: 2,
        category: 'lunch',
        title: 'Sea Spaghetti',
        description:
            'Al dente spaghetti tossed with fresh seafood, garlic, cherry tomatoes and a splash of white wine. A light yet satisfying lunch.',
        time: 30,
        persons: 3,
        rating: 4.8,
        image: pizza,
        href: '/recipe/2',
    },
    {
        id: 3,
        category: 'lunch',
        title: 'Caesar Salad',
        description:
            'Crisp romaine lettuce tossed with creamy caesar dressing, crunchy croutons, parmesan shavings and grilled chicken on top.',
        time: 15,
        persons: 2,
        rating: 4.6,
        image: pizza,
        href: '/recipe/3',
    },
    {
        id: 4,
        category: 'lunch',
        title: 'Shrimp Paella',
        description:
            'A classic Spanish rice dish cooked with juicy shrimp, saffron, bell peppers and smoked paprika. Bold flavors in every bite.',
        time: 45,
        persons: 4,
        rating: 4.9,
        image: pizza,
        href: '/recipe/4',
    },
    {
        id: 5,
        category: 'lunch',
        title: 'Mushroom Risotto',
        description:
            'Creamy Italian arborio rice slow-cooked with wild mushrooms, white wine, garlic and finished with parmesan and fresh thyme.',
        time: 40,
        persons: 3,
        rating: 4.7,
        image: pizza,
        href: '/recipe/5',
    },
    {
        id: 6,
        category: 'lunch',
        title: 'BLT Sandwich',
        description:
            'A timeless sandwich stacked with crispy bacon, fresh lettuce, ripe tomatoes and creamy mayo between toasted sourdough bread.',
        time: 10,
        persons: 1,
        rating: 4.5,
        image: pizza,
        href: '/recipe/6',
    },
    {
        id: 7,
        category: 'lunch',
        title: 'Tomato Basil Soup',
        description:
            'A velvety smooth roasted tomato soup blended with fresh basil, garlic and cream. Best served with a side of crusty bread.',
        time: 35,
        persons: 4,
        rating: 4.6,
        image: pizza,
        href: '/recipe/7',
    },
    {
        id: 8,
        category: 'lunch',
        title: 'Tuna Pasta Salad',
        description:
            'A refreshing cold pasta salad mixed with canned tuna, olives, cherry tomatoes, cucumber and a light lemon herb dressing.',
        time: 20,
        persons: 2,
        rating: 4.4,
        image: pizza,
        href: '/recipe/8',
    },
    {
        id: 9,
        category: 'lunch',
        title: 'Falafel Bowl',
        description:
            'Crispy golden falafels served over fluffy couscous with hummus, tabbouleh, pickled onions and a drizzle of tahini sauce.',
        time: 30,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/9',
    },
    {
        id: 10,
        category: 'lunch',
        title: 'Veggie Quesadilla',
        description:
            'Crispy flour tortillas filled with roasted bell peppers, black beans, corn, jalapeños and melted monterey jack cheese.',
        time: 15,
        persons: 2,
        rating: 4.5,
        image: pizza,
        href: '/recipe/10',
    },
];

// Dinner Page Data
export const dinnerRecipes: Recipe[] = [
    {
        id: 1,
        category: 'dinner',
        title: 'Beef Lasagna',
        description:
            'Layers of rich beef bolognese, creamy bechamel sauce and pasta sheets topped with golden melted mozzarella. A true comfort dinner.',
        time: 60,
        persons: 6,
        rating: 4.9,
        image: pizza,
        href: '/recipe/1',
    },
    {
        id: 2,
        category: 'dinner',
        title: 'Grilled Salmon',
        description:
            'Perfectly grilled salmon fillet with a lemon butter glaze, served with roasted asparagus and garlic mashed potatoes on the side.',
        time: 30,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/2',
    },
    {
        id: 3,
        category: 'dinner',
        title: 'Chicken Tikka Masala',
        description:
            'Tender chicken pieces marinated in yogurt and spices, cooked in a rich and creamy tomato-based curry sauce. Serve with naan.',
        time: 45,
        persons: 4,
        rating: 4.9,
        image: pizza,
        href: '/recipe/3',
    },
    {
        id: 4,
        category: 'dinner',
        title: 'Veggies Lasagna',
        description:
            'A wholesome vegetarian lasagna layered with roasted zucchini, eggplant, spinach, ricotta and a rich tomato marinara sauce.',
        time: 55,
        persons: 5,
        rating: 4.7,
        image: pizza,
        href: '/recipe/4',
    },
    {
        id: 5,
        category: 'dinner',
        title: 'Energy Booster Steak',
        description:
            'A juicy pan-seared ribeye steak seasoned with herbs and butter, served with sweet potato fries and a fresh garden salad.',
        time: 35,
        persons: 2,
        rating: 4.8,
        image: pizza,
        href: '/recipe/5',
    },
    {
        id: 6,
        category: 'dinner',
        title: 'Butter Garlic Prawns',
        description:
            'Succulent prawns sautéed in a rich butter garlic sauce with a hint of chili and lemon. Ready in minutes and absolutely divine.',
        time: 20,
        persons: 3,
        rating: 4.7,
        image: pizza,
        href: '/recipe/6',
    },
    {
        id: 7,
        category: 'dinner',
        title: 'BBQ Pulled Pork',
        description:
            'Slow-cooked tender pulled pork smothered in smoky BBQ sauce, served on a toasted brioche bun with coleslaw on the side.',
        time: 90,
        persons: 6,
        rating: 4.9,
        image: pizza,
        href: '/recipe/7',
    },
    {
        id: 8,
        category: 'dinner',
        title: 'Mushroom Stroganoff',
        description:
            'A hearty vegetarian stroganoff with earthy mushrooms in a creamy sour cream sauce, served over egg noodles or fluffy rice.',
        time: 30,
        persons: 3,
        rating: 4.6,
        image: pizza,
        href: '/recipe/8',
    },
    {
        id: 9,
        category: 'dinner',
        title: 'Baked Lemon Herb Chicken',
        description:
            'Oven-baked chicken thighs marinated in lemon juice, rosemary, thyme and garlic. Crispy on the outside, juicy on the inside.',
        time: 50,
        persons: 4,
        rating: 4.7,
        image: pizza,
        href: '/recipe/9',
    },
    {
        id: 10,
        category: 'dinner',
        title: 'Thai Green Curry',
        description:
            'A fragrant and creamy Thai green curry with tender chicken, eggplant and bamboo shoots simmered in coconut milk. Serve with jasmine rice.',
        time: 40,
        persons: 4,
        rating: 4.8,
        image: pizza,
        href: '/recipe/10',
    },
];

// Admin Layout Data
export type Page = 'overview' | 'recipes' | 'users' | 'profile';

export const PAGE_TITLES: Record<Page, { prefix: string; rest: string }> = {
    overview: { prefix: "Baby's", rest: ' Admin' },
    recipes: { prefix: 'All', rest: ' Recipes' },
    users: { prefix: 'All', rest: ' Users' },
    profile: { prefix: 'My', rest: ' Profile' },
};

// Admin Sidebar Content -> nav config
export const NAV_ITEMS: { label: string; page: Page }[] = [
    { label: 'Overview', page: 'overview' },
    { label: 'Recipes', page: 'recipes' },
    { label: 'Users', page: 'users' },
    { label: 'My Profile', page: 'profile' },
];

// Admin Recipes Page -> dummy data
export type AdminRecipesDataProps = {
    id: number;
    name: string;
    category: string;
    ageGroup: string;
    email: string;
    status: 'Published' | 'Draft';
};

export const AdminRecipesData: AdminRecipesDataProps[] = [
    {
        id: 1,
        name: 'Chicken Vegetable Puree',
        category: 'Lunch',
        ageGroup: '6–8 months',
        email: 'user1@example.com',
        status: 'Published',
    },
    {
        id: 2,
        name: 'Sweet Potato Mash',
        category: 'Starter',
        ageGroup: '4–6 months',
        email: 'user2@example.com',
        status: 'Published',
    },
    {
        id: 3,
        name: 'Apple Banana Blend',
        category: 'Snack',
        ageGroup: '4–6 months',
        email: 'user3@example.com',
        status: 'Published',
    },
    {
        id: 4,
        name: 'Lentil Spinach Soup',
        category: 'Dinner',
        ageGroup: '8–10 months',
        email: 'user4@example.com',
        status: 'Published',
    },
    {
        id: 5,
        name: 'Oatmeal Berry Porridge',
        category: 'Breakfast',
        ageGroup: '6–8 months',
        email: 'user5@example.com',
        status: 'Published',
    },
    {
        id: 6,
        name: 'Carrot Ginger Puree',
        category: 'Lunch',
        ageGroup: '4–6 months',
        email: 'user6@example.com',
        status: 'Draft',
    },
    {
        id: 7,
        name: 'Pea Mint Mash',
        category: 'Dinner',
        ageGroup: '6–8 months',
        email: 'user7@example.com',
        status: 'Draft',
    },
];

// Admin Users Page -> dummy data
export type User = {
    id: number;
    name: string;
    email: string;
    joined: string;
    recipes: number;
    role: 'User' | 'Admin';
};

export const USERS: User[] = [
    {
        id: 1,
        name: 'Rahima Begum',
        email: 'rahima@email.com',
        joined: 'Jan 2025',
        recipes: 12,
        role: 'User',
    },
    {
        id: 2,
        name: 'Arif Hossain',
        email: 'arif@email.com',
        joined: 'Feb 2025',
        recipes: 8,
        role: 'User',
    },
    {
        id: 3,
        name: 'Nusrat Jahan',
        email: 'nusrat@email.com',
        joined: 'Mar 2025',
        recipes: 21,
        role: 'User',
    },
    {
        id: 4,
        name: 'Tanvir Ahmed',
        email: 'tanvir@email.com',
        joined: 'Mar 2025',
        recipes: 5,
        role: 'User',
    },
    {
        id: 5,
        name: 'Sabrina Karim',
        email: 'sabrina@email.com',
        joined: 'Apr 2025',
        recipes: 17,
        role: 'User',
    },
    {
        id: 6,
        name: 'Karim Sheikh',
        email: 'karim@email.com',
        joined: 'Jan 2025',
        recipes: 0,
        role: 'Admin',
    },
];
