import Header from "@/components/Header";
import React from "react";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";
export default function UserView() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
}
