import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/utils/prismadb";
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });
  //console.log(session);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  //console.log(currentUser);
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
