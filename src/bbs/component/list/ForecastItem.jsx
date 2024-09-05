import styled from 'styled-components';

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;
const ContentText = styled.p`
	font-size: 16px;
	white-space: pre-wrap;
`;
function ForecastItem(props){
    const { baseDate, baseTime, beachNum, category, fcstDate, fcstTime, fcstValue } = props.data;
    return(
        <Wrapper>
            <ContentText>
            <p>기준 날짜: {baseDate}</p>
            <p>기준 시간: {baseTime}</p>
            <p>해변 번호: {beachNum}</p>
            <p>예보 날짜: {fcstDate}</p>
            <p>예보 시간: {fcstTime}</p>
            <p>카테고리: {category}</p>
            <p>카테고리 값: {fcstValue}</p>
            </ContentText>
        </Wrapper>
    );
}

export default ForecastItem ;

