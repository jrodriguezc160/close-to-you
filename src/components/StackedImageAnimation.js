import React, { useState, useMemo, useRef, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

const images = [
  "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
  "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
];

const StackedImageAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const size = useMemo(() => images.length, []);
  const timer = useRef(-1);
  const containerRef = useRef(null);

  const map = useMemo(() => {
    const map = new Map();
    const len = images.length;
    let i = len;

    if (len < activeIndex || activeIndex < 0)
      throw new Error("Invalid index set as active index");

    while (i > 0) {
      map.set((activeIndex + len - i) % len, --i);
    }

    return map;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = () => {
      const { width } = container.getBoundingClientRect();
      setContainerWidth(width);
    };

    handler();

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    timer.current = setInterval(
      () => setActiveIndex((cur) => (cur + 1) % size),
      5000
    );

    return () => clearInterval(timer.current);
  }, [size]);

  return (
    <Flex justifyContent="center" alignItems="center" my="auto" style={{ width: "50%" }}>
      <Box
        position="relative"
        width={{ base: 118, md: 118, xl: 118 }}
        height={{ base: 174, md: 174, xl: 174 }}
        ref={containerRef}
      >
        {images.map((image, i) => {
          const factor = size - 1 - map.get(i);
          const isPreviousActiveIndex = (activeIndex + size - 1) % size === i;

          return (
            <Box
              key={image}
              top={0}
              right={0 - 0.09 * factor * containerWidth}
              borderRadius="lg"
              position="absolute"
              backgroundImage={`url(${image})`}
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              width="inherit"
              height="inherit"
              transform={`scale(${1 - 0.09 * factor})`}
              zIndex={map.get(i)}
              boxShadow="15px 0 10px -3px rgba(0,0,0,0.2)"
              transition={"z-index .5s ease, transform .5s ease".concat(
                isPreviousActiveIndex ? ", right 0.5s ease" : ""
              )}
            />
          );
        })}
      </Box>
    </Flex>
  );
};

export default StackedImageAnimation;
