import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useGsapFadeIn(trigger = true, duration = 0.7, y = 40) {
  const ref = useRef();
  useEffect(() => {
    if (trigger && ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, ease: 'power2.out' }
      );
    }
  }, [trigger, duration, y]);
  return ref;
}
