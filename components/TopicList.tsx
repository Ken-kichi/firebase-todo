"use client"

import DeleteButton from "@/components/DeleteButton"
import { db } from "@/lib/database"
import { Topic } from "@/types/types"
import { Button, Card, CardActions, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"

const TopicList = () => {
  const [topics,setTopics] = useState<Topic[]>([])
  useEffect(()=>{
    const q = query(collection(db,"nextjs-todo"))
    const unsub = onSnapshot(q,(snapshot)=>{
      setTopics(
        snapshot.docs.map((doc)=>({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description
        }))
      )
    })
    return ()=>{
      unsub()
    }

  },[])
/** トピックの一覧を取得する */
  return (
    <>
    {topics?.length === 0  && <p>データがありません</p>}
    {topics?.map((topic:Topic) => (
      <Card key={topic.id} sx={{ m: 2}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {topic.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {topic.description}
              </Typography>
            </CardContent>

            <CardActions>
            <Button href={`/topics/${topic.id}`} variant="contained" color="success" size="small">詳細</Button>
             <DeleteButton id={topic.id} />
            </CardActions>
          </Card>
    ))}
    </>
  )
}

export default TopicList
