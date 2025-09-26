import React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "a2k-window": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                title?: string;
                open?: boolean;
            };
            "a2k-button": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                label?: string;
            };
        }
    }
}