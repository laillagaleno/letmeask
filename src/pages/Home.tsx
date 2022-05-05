import {useHistory} from 'react-router-dom'
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'; 

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function Home(){

    // navegação do botão 'Criar sala com o Google'
    const history = useHistory();
    const { user,  sighInWithGoogle} = useAuth();
    const[roomCode, setRoomCode] = useState('');

  //  const [mensagem,setMensagem]=useState('');

    async function handleCreateRoom(){
        if(!user){
            await  sighInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleNot(){

        if(roomCode.trim()===''){
            toast.error("Nenhuma sala foi digitada!");
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if(!roomRef.exists()){
            toast.error("Essa sala não existe");
            return;
        }
        if(roomRef.val().endedAt){
            alert("Não existe mais");
            return;
        }
        history.push(`/rooms/${roomCode}`);
    }

    async function handleJoinRoom(event: FormEvent){
            event.preventDefault();
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando pergundas e respostas" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                <form onSubmit={handleJoinRoom} >
                        <input
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit" onClick={handleNot}>Entrar na sala</Button>
                        <Toaster/>
                    </form>
                </div>
            </main>
        </div>
    )
}