"use client"
import { db } from "@/lib/database";
import { Box, Button, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TopicCreate = () => {
  const [title,setTitle] = useState<string>("")
  const [description,setDescription] = useState<string>("")

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title || !description){
      alert("タイトルと説明を入力してください")
      return
    }

    try {
        await addDoc(collection(db,'nextjs-todo'),{
            title: title,
            description: description,
            isDeleted: false
        });
        router.refresh()
        router.push("/")

      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{display:"flex",flexDirection:"column",gap:2 }}>
        <TextField type="text" label="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField type="text" label="説明" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Box display='flex' justifyContent='center'>
          <Button type="submit" variant="contained" color="success" sx={{px:4,py:1}}>追加</Button>
        </Box>

      </Box>
    </form>
  )
}

export default TopicCreate
