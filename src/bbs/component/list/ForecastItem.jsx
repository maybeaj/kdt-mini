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
    const { category, fcstValue } = props.data;
    return(
        <Wrapper>
            <ContentText>
            {category} - {fcstValue}
            </ContentText>
        </Wrapper>
    );
}

export default ForecastItem ;

