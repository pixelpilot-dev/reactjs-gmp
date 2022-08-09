export const uniqRenderId = (caption: string) => {
  const label = caption?.toLowerCase()?.replace(/\s/g, '') || '';

  return `id-${(+new Date()).toString(16)}${label}`;
};
