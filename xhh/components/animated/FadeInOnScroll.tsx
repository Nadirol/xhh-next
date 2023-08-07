import { ReactNode, useEffect, useRef } from 'react';
import 'intersection-observer';

const FadeInOnScroll = ({ children }: { children: ReactNode }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.2,
      });

      observer.observe(elementRef.current);
    }
  }, []);

  return (
    <div className="opacity-0 translate-x-[10rem]" ref={elementRef}>
      {children}
    </div>
  );
};

export default FadeInOnScroll;