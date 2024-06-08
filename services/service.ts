import { db } from "@/lib/database"
import { Topic } from "@/types/types"
import { collection, getDocs, query } from "firebase/firestore"

/** トピックの一覧を取得する */
export const getTopics = async ()=>{
    try {
        const q = query(collection(db,"nextjs-todo"))

        const querySnapshot = await getDocs(q)
        let topics:Topic[] = []
        querySnapshot.forEach((doc)=>{
            topics.push({
                id:doc.id,
                title:doc.data().title,
                description:doc.data().description,
            })
        })
        return topics
    } catch (error) {
        console.log("トピックを取得できませんでした: ",error)
        return []
    }
}
/** 特定のトピックを取得 */
export const getTopic = async (id:string) =>{
    const topics = await getTopics()
    const newTopics = topics.filter((topic)=>topic.id === id)
    return newTopics
}

/** 特定のトピックを削除する */

/** 特定のトピックを更新する */

