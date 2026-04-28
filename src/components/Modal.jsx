import { motion } from "framer-motion";
import { Children } from "react";

const Modal = ({ isOpen, onClose, children}) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <motion.div initial={{ scale:0.8, opacity:0}}
                animate={{ scale:1, opacity:1}}
                className="bg-white p-6 rounded-xl w-[400px]">
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;