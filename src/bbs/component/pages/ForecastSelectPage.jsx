import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import { useState } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ForecastList from '../list/ForecastList';

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

function ForecastSelectPage(props) {

    const [ baseTime, setBaseTime ] = useState('');
    const [ baseDate, setBaseDate ] = useState('');
    const [ beachNum, setBeachNum ] = useState('');

    const [ forecasts, setForecasts ] = useState([]);

    const baseTimeHandler = (e) => {
        setBaseTime(e.target.value);
    }

    const baseDateHandler = (e) => {
        setBaseDate(e.target.value);
    }

    const beachNumHandler = (e) => {
        setBeachNum(e.target.value);
    }

    const navigate = useNavigate();
    const cancelHandler = () => {
        alert("검색을 취소하고 홈으로 이동합니다.");
        navigate("/");
    }

    //spring version
    const submitHandler = async() => {
        const data = {
            params: {
                base_time: baseTime,
                base_date: baseDate,
                beach_num: beachNum
            }
        }
        try{
            const response = await api.get("api/forecast",data);
            console.log("get response",response);
            setForecasts(response.data); 
        } catch (error) {
            console.log(error);
        }
        
        
    }
    return(
        <Wrapper>
            <Container>
                <label> base_time: 
                <TextInput 
                    height={20}
                    value={baseTime}
                    onChange={baseTimeHandler}/>
                </label>
                <label> base_date: 
                <TextInput 
                    height={20}
                    value={baseDate}
                    onChange={baseDateHandler}/>
                </label>
                <label> beach_num: 
                <TextInput 
                    height={20}
                    value={beachNum}
                    onChange={beachNumHandler}/>
                </label>
                <Button title="검색하기" onClick={submitHandler}>
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button title="검색 취소" onClick={cancelHandler}>
                </Button>
                <p/>
                <ForecastList
                    data={forecasts}/>
            </Container>
        </Wrapper>
    );
}

export default ForecastSelectPage;