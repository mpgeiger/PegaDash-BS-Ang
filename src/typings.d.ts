/* SystemJS module definition */
declare var module: NodeModule;

//  MPG Important --- define JSON ands MODULE
declare module '*.json' {
    const value: any;
    export default value;
  }
declare module '*.scss' {
    const value: any;
    export default value;
  }
interface NodeModule {
    id: string;
}

