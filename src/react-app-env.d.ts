/// <reference types="react-scripts" />

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.txt' {
  const value: string;
  export default value;
}
