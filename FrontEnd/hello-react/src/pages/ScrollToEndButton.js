import React from 'react';

const ScrollToEndButton = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  return (
    <button className="btn btn-warning" onClick={scrollToBottom}>Go to Cart</button>
  );
};

export default ScrollToEndButton;
