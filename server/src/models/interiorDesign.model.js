import mongoose, { Schema } from "mongoose";

const interiorDesignSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    websiteAuthorEmail: { type: String },
    type: { type: String, default: "interiorDesign" },
    templateId: { type: String },
    repoName: { type: String, default: "" },
    deployedUrl: { type: String, default: "" },
    header: {
      logoType: { type: String },
      logoImage: {
        type: String,
        default:
          "https://www.pngkey.com/png/full/246-2467574_your-company-slogen-here-your-company-logo-here.png",
      },
      logoText: { type: String },
      items: [
        {
          text: { type: String },
          href: { type: String },
        },
      ],
    },
    hero: {
      title: { type: String },
      subtitle: { type: String },
      cta: { type: String },
    },
    about: {
      title: { type: String },
      subtitle: { type: String },
      mainImage: { type: String },
      experience: { type: String },
      items: [
        {
          title: { type: String },
          description: { type: String },
        },
      ],
    },
    stats: {
      items: [
        {
          icon: { type: String },
          name: { type: String },
          count: { type: String },
        },
      ],
    },
    services: {
      title: { type: String },
      items: [
        {
          icon: { type: String },
          title: { type: String },
          description: { type: String },
        },
      ],
    },
    portfolio: {
      title: { type: String },
      items: [
        {
          image: { type: String },
          title: { type: String },
          category: { type: String },
        },
      ],
    },
    testimonials: {
      title: { type: String },
      items: [
        {
          avatar: { type: String },
          quote: { type: String },
          name: { type: String },
        },
      ],
    },
    contact: {
      title: { type: String },
    },
    footer: {
      copyright: { type: String },
    },
    websiteowner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const interiorDesign = mongoose.model(
  "interiorDesign",
  interiorDesignSchema
);
