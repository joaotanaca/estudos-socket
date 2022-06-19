import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Cursor, { CursorsProps } from "./Icons/Cursor";

type MouseProps = ContainerProps & CursorsProps;

type ContainerProps = { x: string; y: string } & HTMLAttributes<HTMLDivElement>;

const Mouse: React.FC<MouseProps> = ({ border, ...containerProps }) => {
    return (
        <Container {...containerProps}>
            <Cursor border={border} />
        </Container>
    );
};

export default Mouse;

export const Container = styled.div.attrs<ContainerProps>(({ x, y }) => ({
    style: { top: y, left: x },
}))`
    width: 20px;
    height: 28px;
    position: absolute;
`;
