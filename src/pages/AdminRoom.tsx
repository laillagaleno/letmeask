import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import { useHistory, useParams } from "react-router-dom";

import '../styles/room.scss'; 
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg"; 
import { database } from "../services/firebase";

type RoomParams={
    id: string;
}

export function AdminRoom(){
    const history=useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions}=useRoom(roomId);

//encerrar sala
async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
        endedAt:new Date(),
    })
    history.push('/');
}

//Marcar pergunta
async function handleCheckQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered:true,
    });
}
//dar destaque na pergunta
async function handleAnswerQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted:true,
    });
}
//deletar pergunta
    async function handleDeletQuestion(questionId: string){
        if(window.confirm('Tem certeza que você deseja excluir esta perdunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }
    return(
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="Letmeask" />
                   <div>
                   <RoomCode code={roomId}/>
                   <Button isOutlined 
                   onClick={handleEndRoom}
                   >Encerrar sala</Button>
                   </div>
                  
               </div>
           </header>

           <main >
               <div className="room-title">
                   <h1>Sala {title}</h1>
                   {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
               </div>

                <div className="question-list">
                    {questions.map(question=>{
                    return(
                        <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                        >
                            {!question.isAnswered &&(
                                <>
                                <button
                                type="button"
                                onClick={()=>handleCheckQuestion(question.id)}
                                >
                                    <img src={checkImg} alt="Marca pergunta" />

                                </button>

                                <button
                                type="button"
                                onClick={()=>handleAnswerQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque à pergunta" />

                                </button>
                                </>
                            )}

                            <button
                            type="button"
                            onClick={()=>handleDeletQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta" />

                            </button>
                            </Question>
                    );
                })}
                </div>
               
           </main>
       </div>
    );
}