import React from 'react';
import styled from 'styled-components/native';
import { makeImagePath } from '../utils';

const Image = styled.Image`
    width: 80px;
    height: 140px;
    border-radius: 5px;
    background-color: rgba(255,255,255,0.5);
`;

interface PosterProps {
    path:string;
}

const Poster:React.FC<PosterProps> = ({path}) => {
    return (
        <Image source={{uri:makeImagePath(path)}}></Image>
    );
};

export default Poster;