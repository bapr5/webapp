import { useRef, useEffect, useState } from 'react';
import React from "react";
import emojis from './emojis.json';

const LazyImage = ({ src, alt }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <>
        <div>

    <img
      ref={imgRef}
      src={isLoaded ? src : ''}
      alt={alt}
      style={{ width: '50px', height: '50px', margin: '5px' }}
    />
    </div>
    <>{alt}</>
    </>
  );
};

export function meta() {
  return [
    { title: "Emojis Page" },
    { name: "description", content: "Page with emojis!" },
  ];
}

export default function Emojis() {
  const emojiEntries = Object.entries(emojis);
  return (
    <div style={{ padding: '20px' }}>
      {emojiEntries.map(([name, url]) => (
        <LazyImage key={name} src={url} alt={name} />
      ))}
    </div>
  );
}