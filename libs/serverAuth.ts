import { NextApiRequest, NextApiResponse } from "next/types";

import prisma from './prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
const serverAuth = async(req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user?.email){
        throw new Error('Not signed in')
    }
1
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
    
    if (!currentUser){
        throw new Error('Not signed in')
    }

    return {currentUser}
}

export default serverAuth
