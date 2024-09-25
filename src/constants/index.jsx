import { FileVideo, Gift, Images, Rocket, Star, Ungroup } from "lucide-react";
import { Link } from "react-scroll";
import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";


export const navItems = [
  { 
    label: "Features", 
    to: "Features", 
    offset: -100, 
    duration: 500 
  },
  { 
    label: "Our works", 
    to: "Our_works", 
    offset: -100, 
    duration: 500 
  },
  { 
    label: "Testimonials", 
    to: "testimonial", 
    offset: -100, 
    duration: 500 
  },
  { 
    label: "Contact Us", 
    to: "contact", 
    offset: -100, 
    duration: 500 
  }
];


export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <Images />,
    text: "Custom Image Upload",
    description:
      "Easily upload your own photos or select from various icons, cartoons, or characters for your personalized mosaic art.",
  },
  {
    icon: <Ungroup />,
    text: "Rubik's Cube Art",
    description:
      "Watch as your image is transformed into stunning mosaic art made entirely from Rubik's cubes in an impressive video format.",
  },
  {
    icon: <FileVideo />,
    text: "High-Quality Video",
    description:
      "Receive a high-definition video showcasing the step-by-step creation of your mosaic masterpiece.",
  },
  {
    icon: <Gift />,
    text: "Perfect Gift Option",
    description:
      "Surprise your loved ones with a unique and personalized gift that captures memories in a creative and fun way.",
  },
  {
    icon: <Rocket />,
    text: "Fast Turnaround",
    description:
      "Quick and efficient service to ensure you get your mosaic art and video in time for any occasion.",
  },
  {
    icon: <Star />,
    text: "Expert Craftsmanship",
    description:
      "Each mosaic is carefully crafted by experienced artists, ensuring the highest quality and attention to detail.",
  },
];


export const checklistItems = [
  {
    title: "Upload Your Image",
    description:
      "Easily upload your chosen photo, cartoon, or icon to begin the mosaic creation process.",
  },
  {
    title: "Watch the Art Come to Life",
    description:
      "Receive a high-quality video showing the step-by-step creation of your mosaic using Rubik's cubes.",
  },
  {
    title: "Personalized and Unique",
    description:
      "Get a one-of-a-kind piece of mosaic art that’s tailored to your preferences and style.",
  },
  {
    title: "Fast and Reliable Delivery",
    description:
      "Your mosaic art and video will be delivered quickly, ensuring it's ready for any special occasion.",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

// Updated Resources Links
export const resourcesLinks = [
  { href: "#", text: "How It Works" },
  { href: "#", text: "Pricing & Packages" },
  { href: "#", text: "Mosaic Art Gallery" },
  { href: "#", text: "Gift Ideas" },
  { href: "#", text: "FAQs" },
];

// Updated Platform Links
export const platformLinks = [
  { href: "#", text: "Create Your Mosaic" },
  { href: "#", text: "Upload Your Photo" },
  { href: "#", text: "Video Demos" },
  { href: "#", text: "Delivery Options" },
  { href: "#", text: "Customer Reviews" },
];

// Updated Community Links
export const communityLinks = [
  { href: "#", text: "Art Contests" },
  { href: "#", text: "Workshops" },
  { href: "#", text: "Partnerships" },
  { href: "#", text: "Testimonials" },
  { href: "#", text: "Careers" },
];

