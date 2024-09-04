import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import BbsList from '../list/BbsList';
import api from '../api/axios';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;
function HomePage() {
    const [list, setList] = useState([]);
    
    const navigate = useNavigate();

    useEffect(()=>{
        getList();
    },[]);

    const getList = async () => {
        try {
            const response = await api.get("bbs/index");
            setList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Wrapper>
            <Container>
                <Button 
                    title="글 작성하기"
                    onClick={()=>{
                        navigate("bbs-write");
                    }} />
                    &nbsp; &nbsp;
                <Button 
                    title="날씨 예보"
                    onClick={()=>{
                        navigate("forecast-select");
                    }}/>
                    <p/>
                <BbsList data={list}/>
                
            </Container>
        </Wrapper>
    );
}

export default HomePage ;