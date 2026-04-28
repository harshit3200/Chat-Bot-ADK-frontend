import { motion } from "framer-motion";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[420px] rounded-xl p-6 shadow-xl"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;