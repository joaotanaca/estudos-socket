/* eslint-disable react/style-prop-object */
import React from "react";
export type CursorsProps = { border?: string };
const Cursor: React.FC<CursorsProps> = ({ border = "FFFFFF" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600.00001 950"
            version="1.1"
            width="22"
            height="30"
        >
            <defs id="defs133" />

            <g id="layer2" transform="translate(-555.1899,-182.7993)">
                <path
                    style={{
                        fill: "#ffffff",
                        fillOpacity: 1,
                        stroke: `#${border}`,
                        strokeWidth: 55,
                    }}
                    d="m 50,99.996094 0,699.974606 49.998047,0 0,-49.99804 50.000003,0 0,-49.99805 49.99804,0 0,-50 50,0 0,50 49.99805,0 0,99.99609 49.99805,0 0,100.03125 99.99804,0 0,-99.99609 -49.99804,0 0,-100.03125 -50,0 0,-99.99805 199.99609,0 0,-49.99804 -49.99805,0 0,-49.99805 -50,0 0,-49.99805 -49.99804,0 0,-49.99804 -50,0 0,-49.99805 -49.99805,0 0,-49.99805 -49.99805,0 0,-49.99805 -50,0 0,-49.99804 -49.99804,0 0,-49.99805 -50.000003,0 0,-49.998046 z"
                    transform="translate(555.1899,182.7993)"
                />
            </g>
        </svg>
    );
};

export default Cursor;
