declare module '*.svg' {
  // biome-ignore lint/style/useImportType: <SVG Transformer Config>
  import React from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
