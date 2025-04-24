import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const sectionRef = useRef(null);
  const animationItems = useRef([]);

  const registerElement = (el, type = 'default') => {
    if (el && !animationItems.current.some(item => item.el === el)) {
      animationItems.current.push({ el, type });
      gsap.set(el, {
        opacity: 0,
        y: type === 'card' ? 40 : type === 'heading' ? 30 : 20,
        immediateRender: false
      });
    }
  };

  useEffect(() => {
    if (!sectionRef.current || animationItems.current.length === 0) return;

    // Force layout calculation
    const rect = sectionRef.current.getBoundingClientRect();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none none',
        markers: false,   //debug 
        invalidateOnRefresh: true
      }
    });

    // Animate by element type with proper sequencing
    animationItems.current.forEach((item, index) => {
      if (item.type === 'heading') {
        tl.to(item.el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        }, index === 0 ? 0 : '+=0.2');
      } else if (item.type === 'card') {
        tl.to(item.el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.2)'
        }, '+=0.1');
      } else {
        tl.to(item.el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.3');
      }
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
      console.log('ScrollTrigger refreshed on resize');
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return {
    sectionRef,
    addToHeadingRefs: (el) => registerElement(el, 'heading'),
    addToTextRefs: (el) => registerElement(el, 'text'),
    addToCardRefs: (el) => registerElement(el, 'card')
  };
};