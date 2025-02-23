import mongoose, { Schema } from "mongoose";

const productShowcaseSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    websiteAuthorEmail: { type: String },
    type: { type: String, default: "productShowcase" },
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
          id: { type: String },
          label: { type: String },
        },
      ],
    },
    hero: {
      title: { type: String },
      subtitle: { type: String },
      primaryCta: { type: String },
      secondaryCta: { type: String },
      productImage: { type: String },
    },
    details: {
      gallery: { type: Array },
      description: { type: String },
      keyFeatures: [{ type: String }],
      descriptionbtnText: { type: String },
      specifications: { type: Map, of: String },
    },
    testimonials: {
      title: { type: String },
      items: [
        {
          name: { type: String },
          rating: { type: String },
          imageUrl: { type: String },
          comment: { type: String },
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

export const productShowcase = mongoose.model("productShowcase", productShowcaseSchema);
