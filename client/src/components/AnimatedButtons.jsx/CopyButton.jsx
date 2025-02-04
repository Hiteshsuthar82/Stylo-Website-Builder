import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Link } from "lucide-react";

const CopyButton = ({ deployedUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (deployedUrl) {
      navigator.clipboard.writeText(deployedUrl);
      setCopied(true);

      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      disabled={!deployedUrl}
      className={`relative flex items-center justify-center w-[18px] h-[18px] transition-all duration-300 text-black hover:text-gray-600 shadow-lg overflow-hidden ${
        copied ? "border border-green-500 rounded-full" : ""
      }`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute"
          >
            <Check className="text-green-400 animate-pulse" size={14} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute"
          >
            {deployedUrl ? (
              <Copy size={18} />
            ) : (
              <Link size={18} className="text-gray-400" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyButton;
