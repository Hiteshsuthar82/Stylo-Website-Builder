import { Send } from "lucide-react";
const ShareButton = ({ sharableUrl }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "🌟 Stylo Website Builder - Build Websites Instantly! 🌟",
          text:
            "🚀 **Stylo Website Builder - Build Websites Instantly**\n\n" +
            "🔹 Create Stunning Websites in Minutes!\n" +
            "🔹 No coding required, just drag & drop!\n" +
            "🔹 Responsive & SEO-friendly websites\n" +
            "🔹 Free templates to kickstart your design\n\n" +
            "🌍 **Your website URL:**\n👉 " +
            sharableUrl +
            "\n\n" +
            "✨ **Perfect for:** Freelancers, Startups, Small Businesses & More!",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Your browser does not support Web Share API.");
    }
  };

  return (
    <button onClick={handleShare} className="mr-2">
      <Send size={18} />
    </button>
  );
};

export default ShareButton;
