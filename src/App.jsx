import React from 'react'
import Modal from './components/Modal';
import { useState } from 'react';
const App = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='h-screen flex items-center justify-center'>

    <button onClick={() => setOpen(true)} className='bg-blue-600 text-white px-4 py-2'>Open Modal</button>

    <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className='text-2xl font-bold mb-4'>This is a Modal</h2>
      </Modal>
        
    </div>
  );
};

export default App