import styled from "styled-components";
import Button from "../ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TextInput from "../ui/TextInput";
import CommentList from "../list/CommentList";
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
const PostContainer = styled.div`
	padding: 8px 16px;
	border: 1px solid grey;
	border-radius: 8px;
`;
const TitleText = styled.p`
	font-size: 28px;
	font-weight: 500;
`;
const ContentText = styled.p`
	font-size: 20px;
	line-height: 32px;
	white-space: pre-wrap;
`;
const CommentLabel = styled.p`
	font-size: 16px;
	font-weight: 500;
`;

function BbsViewPage(props) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [bbs, setBbs] = useState({});
	const [comment, setComment] = useState("");
    const [comList, setComList] = useState([]);
	const moveToHome = () => {
		navigate("/");
	};
	useEffect(() => {
		getBbs();
        //getComList();
	}, []);

	// json-server version
	// const getBbs = async () => {
	// 	try {
	// 		const response = await api.get(`bbs/${id}`);
	// 		setBbs(response.data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// spring version
	const getBbs = async () => {
		try {
			const response = await api.get(`bbs/view/${id}`);
			console.log("debug >> axios get response data, ", response.data);
			setBbs(response.data);
			setComList(response.data.comments);
		} catch (error) {
			console.error(error);
		}
	};
	// json-server ver
    // const getComList = async () => {
    //     try {
    //         const response = await api.get(`comments?bbsId=${id}`);
    //         setComList(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
	// spring ver
	const getComList = async () => {
        try {
			//pathvariable방식이아님 user endpoint : bbs/comment/getcomment
			// (CommentRequestDTO params)
            //const response = await api.get(`bbs/comment/getcomment?bbsid=${id}`);

			// path variable 방식
			// user endpoint : bbs/comment/getComment/3
			// PathVariable(id="id") Integer id
			// map.put("bbsid", id)
			const response = await api.get(`bbs/comment/getComment/${id}`);
			console.log("debug>>> axios comments get response data, ", response.data);
            setComList(response.data);
        } catch (error) {
            console.error(error);
        }
    };
	//json-server version
	// const postComment = async () => {
    //     if(!comment){
    //         alert('타임라인을 작성해 주세요!!');
    //     } else {
    //     const data = {
    //         id : Date.now(),
    //         content : comment,
    //         bbsId: id
    //     }
	// 	try {
	// 		const response = await api.post(`comments`,data);
    //         console.log(response.data);
    //         alert("comment 작성완료");
	// 		setComment('');
    //         getComList();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // }
	// };
	//spring ver
	const postComment = async () => {
        if(!comment){
            alert('타임라인을 작성해 주세요!!');
        } else {
        const data = {
            content : comment,
            bbsid : id
        }
		try {
			const response = await api.post(`bbs/comment/save`,data);
            console.log("debug >> axios post response data, ",response);
			console.log("debug >> axios post response data, ",response.status);
			if (response.status == 204){
				alert("comment 작성완료");
				setComment('');
				getComList();
			} else {
				alert(" 타임라인 등록 시 오류 발생!")
			}
		} catch (error) {
			console.error(error);
		}
    }
	};
    const updateHandler = (bbsId) => {
        navigate(`/bbs-update/${bbsId}`);
    }
	//json-server ver
    // const removeBbs = async (bbsId) => {
    //     try {
	// 		const response = await api.delete(`bbs/${bbsId}`);
    //         console.log(response.data);
    //         alert("게시글 삭제되었습니다.");
    //         moveToHome();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // }
	//spring version
	const removeBbs = async (bbsId) => {
        try {
			if ( comList.length == 0 ){
				const response = await api.delete(`bbs/delete/${bbsId}`);
				console.log(response.data);
				moveToHome();
			} else {
				alert("댓글이 존재하여 게시글을 삭제할 수 없습니다.");
			}
			console.log("debug >>> comments length " , comList.length);
			// const response = await api.delete(`bbs/${bbsId}`);
            // console.log(response.data);
            // alert("게시글 삭제되었습니다.");
            // moveToHome();
		} catch (error) {
			console.error(error);
		}
    }
	return (
		<Wrapper>
			<Container>
				<Button title="뒤로가기" onClick={moveToHome}></Button>
				<p />
				<PostContainer>
					<TitleText>{bbs.title}</TitleText>
					<ContentText>{bbs.content}</ContentText>
                    <Button title="게시글 수정하기" onClick={()=>updateHandler(bbs.id)}/>
                    &nbsp;&nbsp;
                    <Button title="게시글 삭제하기" onClick={()=>removeBbs(bbs.id)}/>
				</PostContainer>

				<CommentLabel>타임라인</CommentLabel>
				<TextInput height={15} value={comment} onChange={(e) => setComment(e.target.value)} />
                    <p/>
				<Button title="타임라인 등록하기" onClick={postComment} />
				<p />
                <CommentList data={comList}/>

			</Container>
		</Wrapper>
	);
}

export default BbsViewPage;
