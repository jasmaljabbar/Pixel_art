import { FileVideo, Gift, Images, Rocket, Star, Ungroup } from "lucide-react";
import { Link } from "react-scroll";
import user1 from "../assets/profile-pictures/Sahal_Abdul_Samad.png";
import user2 from "../assets/profile-pictures/karthik-dp.webp";
import user3 from "../assets/profile-pictures/rahulkp.jpg";
import user4 from "../assets/profile-pictures/anshicl.png";
import user5 from "../assets/profile-pictures/sabiinspires.jpg";
import user6 from "../assets/profile-pictures/foodfaiz.jpg";
import sabiwords from "../assets/sabiwords.mp3";
import foodfaiz from "../assets/foodfaiz.mp3";


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
    user: "Sahal Abdul Samad",
    company: "Indian professional footballer",
    image: user1,
    text: "This is so good ❤❤❤ , Thank you So much",
  },
  {
    user: "Karthik Surya",
    company: "Indian YouTuber and telivition anchor",
    image: user2,
    text: "Damnnnnnn ❤🔥❤❤👏 pwoli",
  },
  {
    user: "Rahul kp",
    company: "Indian professional footballer",
    image: user3,
    text: "much love to you lil brother❤ that's hard work done:).",
  },
  {
    user: "Anshi CL",
    company: "Instagram creator",
    image: user4,
    text: "Aww bro 🥰 what to say Areela 😘 it's so awesom. May you reach even more heights",
  },
  {
    user: "Hafiz Saabith Ahmed",
    company: "Indian motivational speaker",
    image: user5,
    text: "",
    audio: sabiwords,
  },
  {
    user: "Muhammad Fayiz",
    company: "Indian digital content creator and food vlogger",
    image: user6,
    text: "",
    audio: foodfaiz,
    
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

