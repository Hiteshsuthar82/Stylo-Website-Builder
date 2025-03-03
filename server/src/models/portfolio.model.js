
import mongoose, { Schema } from "mongoose";

const portfolioSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  websiteAuthorEmail: { type: String },
  type: { type: String, default: "portfolio" },
  templateId: { type: String },
  repoName: { type: String, default: "" },
  deployedUrl: { type: String, default: "" },
  header: {
    logoType: { type: String },
    logoImage: { type: String, default: "https://www.pngkey.com/png/full/246-2467574_your-company-slogen-here-your-company-logo-here.png" },
    logoText: { type: String },
    phone: { type: String },
    items: [
      {
        id: { type: Number },
        text: { type: String },
        href: { type: String },
      },
    ],
  },
  hero: {
    greeting: { type: String },
    subtitle: { type: String },
    cta: { type: String },
    profileImage: { type: String },
  },
  about: {
    title: { type: String },
    description: { type: String },
    details: {
      name: { type: String },
      birthday: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    image: { type: String },
  },
  services: {
    title: { type: String },
    items: [
      {
        name: { type: String },
        price: { type: String },
        description: { type: String },
      },
    ],
  },
  projects: {
    title: { type: String },
    items: [
      {
        name: { type: String },
        image: { type: String },
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
    ref: "User"
  },
},
  { timestamps: true },
);


export const Portfolio = mongoose.model('Portfolio', portfolioSchema);


