declare module 'next/font/local' {
    export default function localFont(config: {
        src: string | Array<{ path: string; weight?: string; style?: string }>;
        variable?: string;
        weight?: string | string[];
    }): {
        className: string;
        variable: string;
        style: { fontFamily: string };
    };
} 