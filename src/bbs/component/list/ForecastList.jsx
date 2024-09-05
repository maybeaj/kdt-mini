import styled from "styled-components";
import ForecastItem from "./ForecastItem";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > * {
		:not(:last-child) {
			margin-bottom: 16px;
		}
	}
`;

function ForecastList(props) {
    return (
        <Wrapper>
            {props.data.length === 0 ? (
                <p>예보가 존재하지 않습니다.</p> // 예보가 없을 때 텍스트만 표시
            ) : (
                props.data.map((forecast, index) => (
                    <ForecastItem 
						key = { index }
                        data={forecast} 
                    />
                ))
            )}
        </Wrapper>
    );
}

export default ForecastList;