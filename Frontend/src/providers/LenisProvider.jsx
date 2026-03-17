import { createContext, useContext, useEffect, useRef } from 'react';

const LenisContext = createContext();

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Dynamic import for better code splitting
    const initializeLenis = async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger')
        ]);

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis with optimized settings for mobile
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: true, // Enable smooth scrolling on touch devices
          touchMultiplier: 2,
          infinite: false,
          autoResize: true
        });

        // Update ScrollTrigger on Lenis scroll
        lenisRef.current.on('scroll', (e) => {
          ScrollTrigger.update();
        });

        // GSAP ticker integration for smooth animation loop
        const update = (time) => {
          lenisRef.current?.raf(time * 1000);
        };

        gsap.ticker.add(update);

        // Store cleanup function and control methods
        lenisRef.current._cleanup = () => {
          gsap.ticker.remove(update);
          // Safely kill all ScrollTriggers
          try {
            const triggers = ScrollTrigger.getAll();
            triggers.forEach(trigger => {
              try {
                trigger.kill();
              } catch (e) {
                console.warn('Error killing ScrollTrigger:', e);
              }
            });
          } catch (e) {
            console.warn('Error getting ScrollTriggers:', e);
          }
          // Destroy Lenis instance
          try {
            lenisRef.current?.destroy();
          } catch (e) {
            console.warn('Error destroying Lenis:', e);
          }
        };

        // Add start/stop methods for external control
        lenisRef.current.start = () => {
          if (lenisRef.current) {
            lenisRef.current.options.smooth = true;
            gsap.ticker.add(update);
          }
        };

        lenisRef.current.stop = () => {
          if (lenisRef.current) {
            lenisRef.current.options.smooth = false;
            gsap.ticker.remove(update);
          }
        };

        // Expose to window for external control
        window.lenis = lenisRef.current;
      } catch (error) {
        console.warn('Failed to initialize Lenis:', error);
      }
    };

    initializeLenis();

    // Cleanup function
    return () => {
      try {
        lenisRef.current?._cleanup?.();
      } catch (error) {
        console.warn('Error during Lenis cleanup:', error);
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  return context;
};

export default LenisProvider;