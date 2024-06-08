"use client"

import { db } from '@/lib/database';
import { TopicId } from '@/types/types';
import { Button } from '@mui/material';
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const DeleteButton = ({id}:TopicId) => {
    const router = useRouter()

    const deleteTopic = async (id:string) =>{
        const confirmed = confirm('削除しますか？')

        if(confirmed){
            try {
                await deleteDoc(doc(db,"nextjs-todo",id))
                router.refresh()
            } catch (error) {
                console.error("Error removing document: ", error);
            }
        }
    }


  return  <Button onClick={()=>deleteTopic(id)} variant="outlined" color="error" size="small">削除</Button>
}

export default DeleteButton
