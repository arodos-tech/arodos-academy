"use client";

import { Box, Skeleton, Stack } from "@mantine/core";

interface SkeletonLoaderProps {
  count?: number;
  height?: number | string;
  width?: number | string;
  radius?: number | string;
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SkeletonLoader({
  count = 1,
  height = 100,
  width = "100%",
  radius = "md",
  gap = "md",
  className,
  style,
}: SkeletonLoaderProps) {
  return (
    <Stack gap={gap} className={className} style={style}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} height={height} width={width} radius={radius} animate />
      ))}
    </Stack>
  );
}

export function CardSkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <Box py="md">
      <SkeletonLoader count={count} height={300} radius="md" />
    </Box>
  );
}

export function TextSkeletonLoader({ count = 5 }: { count?: number }) {
  return (
    <Box py="md">
      <SkeletonLoader count={count} height={20} radius="sm" />
    </Box>
  );
}

export function HeroSkeletonLoader() {
  return (
    <Box py="xl">
      <Skeleton height={400} width="100%" radius={0} animate />
    </Box>
  );
}
