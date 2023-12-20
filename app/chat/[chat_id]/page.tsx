// 'use client'
import ChatComponent from "@/components/ChatCompoent";
import ChatSideBar from "@/components/ChatSideBar";

import { DrizzleChat, chats } from "@/lib/db/schema";

import axios from "axios";


import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    chat_id: string;
  };
};

export default async function page({ params: { chat_id } }: Props) {
  // const res = await axios.post('/api/fetch-chats')

  // console.log(res.data)
  async function getChats() {
    "use server";
    // const _chats = await db.select().from(chats)
    const res = await axios.post(`${process.env.LOCAL_URL}/api/fetch-chats`);
    return res.data;
  }

  const chats: DrizzleChat[] = await getChats();

  if (!chats.find((chat) => chat.id === parseInt(chat_id))) {
    return redirect("/");
  }

  return (
    // <div className='reletive container flex min-h-screen flex-col'>
    //   <Chat/>
    // </div>

    <div className="flex max-h-screen ">
      <div className="flex w-full max-h-screen">
        <div className="flex-[2] max-w-sm">
          <ChatSideBar chats={chats} chatId={parseInt(chat_id)} />
        </div>
        <div className="w-full">
          <ChatComponent chatId={parseInt(chat_id)} />
        </div>
      </div>
    </div>
  );
}
