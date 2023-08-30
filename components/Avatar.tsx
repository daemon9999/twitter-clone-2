import useUser from "@/hooks/useUser";
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'
interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function Avatar({ userId, hasBorder, isLarge }: AvatarProps) {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);
  const onClick = useCallback((e: any) => {
    e.stopPropagation();

    const url = `/users/${userId}`;
    router.push(url);
  }, []);
  return (
    <div className={`
        ${hasBorder ? 'border-4 border-black': ''}
        ${isLarge ? 'w-32 h-32': 'w-12 h-12'}
        rounded-full hover:opacity-90 transiton cursor-pointer relative
    `}>
        <Image
            fill
            style={{
                objectFit: 'cover',
                borderRadius: '100%'
            }}
            alt="Avatar"
            onClick={onClick}
            src={fetchedUser?.profileImage || '/images/placeholder.png'}
        />
    </div>
  );
}
