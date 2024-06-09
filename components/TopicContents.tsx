"use client"

import { db } from "@/lib/database"
import { Topic } from "@/types/types"
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"

const TopicContents = ({topic}:{topic:Topic}) => {
  const {title,description,id} = topic
  const [newTitle,setNewTitle] = useState<string>(title)
  const [newDescription,setNewDescription] = useState<string>(description)
  const [isEdit,setIsEdit] = useState<boolean>(true)


const onSubmit = async () => {
  try{
    const washingtonRef = doc(db, "nextjs-todo", id);
     await updateDoc(washingtonRef, {
      title: newTitle,
      description:newDescription
    });
    setNewTitle(newTitle)
    setNewDescription(newDescription)
  }catch(error){
    console.log(error)
  }
}

return (
<>
  <FormControlLabel
    sx={{m:2}}
    control={
      <Switch
      checked={!isEdit}
      onChange={() => setIsEdit(!isEdit)}
      inputProps={{ 'aria-label': 'controlled' }}
      />
    }
    label="編集"
    />
      <form onSubmit={onSubmit}>
      <Box sx={{display:"flex",flexDirection:"column",gap:2 }}>
        <TextField type="text"  disabled={isEdit} label="タイトル" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <TextField type="text"  disabled={isEdit} label="説明" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />

        <Box display='flex' justifyContent='center'  sx={{px:4,py:1}}>
          <Button type="submit" variant="contained" color="success">更新</Button>
          <Button href={`/`} variant="outlined" color="inherit" sx={{ml:2}}>戻る</Button>
        </Box>

      </Box>
    </form>
  </>

  )
}

export default TopicContents
