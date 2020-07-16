function useResponsiveCanvas<T>(
    initialSize?: MinMaxPair,
  ): State {
    const canvasRef = useRef<HTMLCanvasElement>();
    const mountRef = useRef<HTMLDivElement>();
    const [size, setSize] = useState<MinMaxPair>([0, 0]);
  
    // set initial svg and size
    useEffect(() => {
      const canvas = document.createElement('canvas');
      const mount = mountRef.current;
      canvas.style.display = 'block';
      canvasRef.current = canvas;
  
      // update initial size
      let width = 0;
      let height = 0;
      if (initialSize !== undefined) {
        // Use initialSize if it is provided
        [width, height] = initialSize;
      } else {
        // Use parentElement size if resized has not updated
        width = mount.offsetWidth;
        height = mount.offsetHeight;
      }
      setSize([width, height]);
  
      // update resize using a resize observer
      const resizeObserver = new ResizeObserver(entries => {
        if (!entries || !entries.length) {
          return;
        }
        if (initialSize === undefined) {
          let { width, height } = entries[0].contentRect;
          setSize([width, height]);
        }
      });
      resizeObserver.observe(mount);
      mount.appendChild(canvas);
  
      // cleanup
      return () => {
        resizeObserver.unobserve(mount);
        mount.removeChild(canvas);
      };
    }, [initialSize]);
  
    return {
      canvas: canvasRef.current,
      mountRef,
      size,
    };
  }