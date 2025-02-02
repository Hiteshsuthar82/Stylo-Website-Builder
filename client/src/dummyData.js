const portfolioTemplate = {
  websiteName:"",
  websiteAuthorEmail:"",
  type:"portfolio",
  header: {
    logoType: "text",
    logoImage: "https://www.pngkey.com/png/full/246-2467574_your-company-slogen-here-your-company-logo-here.png",
    logoText: "First",
    phone: "120-340-8900",
    items: [
      { id: 1, text: "About", href: "#about" },
      { id: 2, text: "Services", href: "#services" },
      { id: 3, text: "Projects", href: "#projects" },
      { id: 4, text: "Contact", href: "#contact" },
    ],
  },
  hero: {
    greeting: "Hello friend!",
    subtitle: "I'm available for freelance work.",
    cta: "Let's begin",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s",
  },
  about: {
    title: "My Story",
    description: "A little bit about Joshua...",
    details: {
      name: "Joshua Morgan",
      birthday: "Aug 12, 1989",
      phone: "120-340-8900",
      email: "hello@joshua.com",
    },
    image:
      "https://plus.unsplash.com/premium_photo-1661833879387-1513bf753554?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  services: {
    title: "Services",
    items: [
      {
        name: "Websites",
        price: "$2,000",
        description: "Explore my CSS templates.",
      },
      {
        name: "Branding",
        price: "$1,500",
        description: "Custom branding services.",
      },
      {
        name: "Ecommerce",
        price: "$3,000",
        description: "Customized ecommerce solutions.",
      },
      {
        name: "SEO",
        price: "$1,450",
        description: "SEO for top search engine rankings.",
      },
    ],
  },
  projects: {
    title: "Projects",
    items: [
      {
        name: "Online shopping",
        image:
          "https://i.graphicmama.com/blog/wp-content/uploads/2020/07/09110116/website-design-idea-gradients-in-web-design-example-4.jpg",
      },
      {
        name: "Food Website",
        image:
          "https://www.figma.com/community/resource/a68f5ea1-6e0e-4ac6-b22c-1066c463ada7/thumbnail",
      },
      {
        name: "Zoik Agency",
        image:
          "https://assets.justinmind.com/wp-content/uploads/2021/11/web-design-portfolio-templates-eve.png",
      },
    ],
  },
  contact: {
    title: "Say Hi",
  },
  footer: {
    copyright: "© 2025 First Portfolio. All rights reserved.",
  },
};

const interiorDesignTemplate = {
  websiteName:"",
  websiteAuthorEmail:"",
  type:"interiorDesign",
  header: {
    logoType: "text",
    logoImage: "https://www.pngkey.com/png/full/246-2467574_your-company-slogen-here-your-company-logo-here.png",
    logoText: "INTERIOR STUDIO",
    items: [
      { href: "about", text: "About" },
      { href: "services", text: "Services" },
      { href: "portfolio", text: "Portfolio" },
      { href: "testimonials", text: "Testimonials" },
      { href: "contact", text: "Contact" },
    ],
  },
  hero: {
    backgroundImage:
      "https://img.freepik.com/free-photo/loft-home-office-interior-design_53876-143117.jpg",
    title: "Creating Beautiful Spaces",
    subtitle: "Transform your home with our expert interior design services",
    cta: "Explore Our Work",
  },
  about: {
    title: "About Us",
    subtitle:
      "We take pride in delivering high-quality solutions tailored to your needs. Here's a glimpse of what we’ve achieved so far",
    mainImage:
      "https://images.livspace-cdn.com/w:3840/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/design-ideas-thumbnails-1628773921-7vSz1/jas-thumbnails-1662014793-zEzY3/mobile-1662014804-Sebbn/mbr-m-1662025089-SomZl.png",
    experience: "25+",
    features: [
      {
        title: "Innovative Design",
        description:
          "Creating unique spaces that blend aesthetics with functionality",
      },
      {
        title: "Expert Team",
        description:
          "Skilled professionals dedicated to bringing your vision to life",
      },
    ],
    items: [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/9912/9912615.png",
        name: "Projects Completed",
        count: "500+",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/2039/2039048.png",
        name: "Satisfied Customers",
        count: "350+",
      },
      {
        icon: "https://cdn-icons-png.freepik.com/256/10845/10845509.png?semt=ais_hybrid",
        name: "Years of Experience",
        count: "25+",
      },
      {
        icon: "https://www.freeiconspng.com/thumbs/team-icon/team-icon-27.png",
        name: "Team Members",
        count: "10+",
      },
    ],
  },
  services: {
    title: "Our Services",
    items: [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/10751/10751448.png",
        title: "Residential Design",
        description: "Complete home interior design solutions...",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/602/602182.png",
        title: "Commercial Spaces",
        description: "Office and retail space design...",
      },
      {
        icon: "https://cdn-icons-png.freepik.com/256/3590/3590261.png",
        title: "Consultation",
        description: "Expert advice and planning...",
      },
    ],
  },
  portfolio: {
    title: "Recent Projects",
    items: [
      {
        image:
          "https://www.swamiinterior.in/wp-content/uploads/2022/08/two-bhk-turnkey-interior-design-project-tilak-nagar.webp",
        title: "Modern Minimalist Hall",
        category: "Residential",
      },
      {
        image:
          "https://officebanao.com/wp-content/uploads/2024/05/Copy-of-Copy-of-Image-3.jpg",
        title: "Modern workSpace Design",
        category: "Office",
      },
      {
        image:
          "https://media.designcafe.com/wp-content/uploads/2020/05/09150825/blue-and-white-modular-kitchen-design.jpg",
        title: "Modern kitchen Design",
        category: "Residential",
      },
      // Add more portfolio items...
    ],
  },
  testimonials: {
    title: "Client Testimonials",
    items: [
      {
        avatar:
          "https://media.istockphoto.com/id/1448167415/photo/smiling-indian-businessman-in-suit-and-glasses-with-laptop-near-office-building.jpg?s=612x612&w=0&k=20&c=vuUgcc-IlZewhnRm7yNOIuEfAvTnyJdMsPbnvkAnZjc=",
        quote: "They transformed our space completely...",
        name: "John Smith",
      },
      {
        avatar:
          "https://images.stockcake.com/public/5/5/a/55aa0081-3d0d-495b-b649-4838f12aedd3_large/professional-young-man-stockcake.jpg",
        quote: "They transformed our space completely...",
        name: "John Smith",
      },
      {
        avatar:
          "https://media.gettyimages.com/id/1299077558/photo/lead-yourself-to-a-life-of-success.jpg?s=612x612&w=gi&k=20&c=hWVkoG0-SSrJarFSQXHB2LpvVVeT8On3kL0aL3NvEx0=",
        quote: "They transformed our space completely...",
        name: "John Smith",
      },
    ],
  },
  contact: {
    title: "Get In Touch",
  },
  footer: {
    copyright: "© 2025 Interior Studio. All rights reserved.",
  },
};

const productShowcaseTemplate = {
  websiteName:"",
  websiteAuthorEmail:"",
  type:"productShowcase",
  header: {
    logoType: "text",
    logoImage: "https://www.pngkey.com/png/full/246-2467574_your-company-slogen-here-your-company-logo-here.png",
    logoText: "TechPro",
    items: [
      { id: "home", label: "Home" },
      { id: "details", label: "Details" },
      { id: "testimonials", label: "Testimonials" },
      { id: "contact", label: "Contact" },
    ],
  },
  hero: {
    title: "Ultimate Smart Device",
    subtitle: "Transform your digital experience with cutting-edge technology",
    primaryCta: "Buy Now",
    secondaryCta: "Learn More",
    productImage:
      "https://png.pngtree.com/png-vector/20240403/ourmid/pngtree-washing-machine-isolated-on-transparent-background-png-image_12260985.png",
  },
  details: {
    gallery: [
      "https://img.freepik.com/premium-photo/laundry-essential-washing-machine-isolated-white-background-generative-ai_94628-19279.jpg",
      "https://img.freepik.com/premium-photo/washing-machine_1022967-3789.jpg",
      "https://thumbs.dreamstime.com/b/modern-front-loading-washing-machine-transparent-glass-door-modern-front-loading-washing-machine-transparent-326980000.jpg",
      "https://img.etimg.com/thumb/width-1200,height-900,imgsize-143936,resizemode-75,msid-115259554/top-trending-products/major-appliances/washing-machine/best-selling-washing-machines-top-picks-for-every-budget-and-need.jpg",
    ],
    description:
      "A revolutionary product designed to enhance your daily life with state-of-the-art features and unparalleled performance.",
    keyFeatures: [
      "Advanced AI Technology",
      "Modern Design",
      "Ultra-Long Battery Life",
      "Intuitive User Interface",
    ],
    descriptionbtnText: "Order This Product",
    specifications: {
      Dimensions: "15 x 8 x 5 meter",
      Weight: "28 Kg",
      Battery: "5000 kw",
    },
  },
  testimonials: {
    title: "Client Testimonials",
    items: [
      {
        name: "John Doe",
        rating: 5,
        imageUrl:
          "https://images.squarespace-cdn.com/content/v1/569591ff0ab3771dba3f1ec6/1453167464043-YWCO1KRYYH7SJNC3D1ZM/image-asset.jpeg",
        comment: "Absolutely amazing product! Exceeded all my expectations.",
      },
      {
        name: "Jane Smith",
        rating: 4,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYR0TAT4xCZgg-7cvDs2gH02sMGHAIbFDYQ&s",
        comment: "Great device with incredible features. Highly recommended.",
      },
      {
        name: "Mike Johnson",
        rating: 5,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjE1GXmD1z3plZqU-EU9GfuPIE-ifwjB3iiQ&s",
        comment:
          "Revolutionary technology that changes the way I work and live.",
      },
    ],
  },
  contact: {
    title: "Get in Touch with Our Team",
  },
  footer: {
    copyright: "© 2024 TechPro. All rights reserved.",
  },
};

export { portfolioTemplate, interiorDesignTemplate, productShowcaseTemplate };
