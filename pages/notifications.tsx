import Header from "@/components/Header";
import React from "react";
import { NextPageContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import serverAuth from "@/libs/serverAuth";
import NotificationsFeed from "@/components/notifications/NotificationsFeed";


const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed/>
    </>
  );
};

export async function getServerSideProps({req, res}: any) {
    const session = await getServerSession(req, res, authOptions);
  
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        session,
      },
    };
  }

export default Notifications;
