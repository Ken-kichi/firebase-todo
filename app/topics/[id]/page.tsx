import TopicContents from "@/components/TopicContents";
import { db } from "@/lib/database";
import { doc, getDoc } from "firebase/firestore";

const getTopicById = async (id:string) => {
  try {
    const docRef = doc(db, "nextjs-todo", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return {
        id:docSnap.id,
        title:docSnap.data().title,
        description:docSnap.data().description,
        isDeleted:docSnap.data().isDeleted
    }

        return {
            id:'',
            title:'',
            description:'',
            isDeleted:false
        }

  } catch (error) {
    console.log(error)

    return {
      id: '',
      title: '',
      description: '',
      isDeleted: false
  }
  }
}

const TopicDetail = async ({params}:{params:{id:string}}) => {
  const {id} = params
  const topic = await getTopicById(id)

  return (
    <TopicContents topic={topic} />
  )
}

export default TopicDetail
