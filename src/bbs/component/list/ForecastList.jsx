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
			{props.data.map((forecast) => (
				<ForecastItem data={forecast} />
			))}
		</Wrapper>
	);
}

export default ForecastList;