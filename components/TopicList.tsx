import DeleteButton from "@/components/DeleteButton"
import { getTopics } from "@/services/service"
import { Topic } from "@/types/types"
import { Button, Card, CardActions, CardContent } from '@mui/material'
import Typography from '@mui/material/Typography'
const TopicList = async () => {
  const topics = await getTopics()

  return (
    <>
    {topics.length === 0 && <p>データがありません</p>}
    {topics.map((topic:Topic) => (
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
