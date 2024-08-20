import styled from "styled-components";
import CommentItem from "./CommentItem";

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

function CommentList(props) {
	return (
		<Wrapper>
			{props.data.length === 0 ? (
				<CommentItem data={{ content: "등록된 타임라인이 없습니다." }} />
			) : (
				props.data.map((comment) => (
					<CommentItem key={comment.id} data={comment} />
				))
			)}
		</Wrapper>
	);
}

export default CommentList;
