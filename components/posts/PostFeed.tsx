import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'

interface PostFeedProps {
    userId?: string
}

export default function PostFeed({userId}: PostFeedProps) {
    const {data: posts = []} = usePosts(userId)

  return (
    <>
    {posts.map((post: Record<string,any>) => (
        <PostItem
            userId={post?.userId}
            key={post.id}
            data={post}
        />
    ))} 
    </>
  )
}
