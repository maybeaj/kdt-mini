import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import { useState, useEffect} from 'react';
import Button from '../ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import isEqual from 'lodash.isequal'; 

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

function BbsUpdatePage(props) {
    const { id } = useParams();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [originalData, setOriginalData] = useState({ title: '', content: '' });
    const [isModified, setIsModified] = useState(false); 


    const titleHandler = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setIsModified(!isEqual({ title: newTitle, content }, originalData));
    }
    
    const contentHandler = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        setIsModified(!isEqual({ title, content: newContent }, originalData));
    }

    const navigate = useNavigate();

    const cancelHandler = () => {
        alert("글 작성을 취소하고 홈으로 이동합니다.");
        navigate("/");
    }

    const submitHandler = async() => {
        const updatedData = { title : title,
                            content : content};
        try{
            const response = await api.patch(`bbs/${id}`,updatedData);
            console.log(response.data);
            alert("글 수정 완료하고 홈으로 이동합니다.");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await api.get(`bbs/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
            setOriginalData({ title: response.data.title, content: response.data.content });
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);
    return(
        <Wrapper>
            <Container>
                <label> 제목: 
                <TextInput 
                    height={20}
                    value={title}
                    onChange={titleHandler}/>
                </label>
                <label> 내용: 
                <TextInput 
                    height={480}
                    value={content}
                    onChange={contentHandler}/>
                </label>
                <Button title="글 수정 하기" onClick={submitHandler} disabled={!isModified}>
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button title="글 수정 취소" onClick={cancelHandler}>
                </Button>

            </Container>
        </Wrapper>
    );
}

export default BbsUpdatePage;