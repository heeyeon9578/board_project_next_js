import NextAuth from "next-auth";

export default interface Post {
    _id?: string;
    title: string;
    content: string;
}
export  interface User {
    name: string;
    email: string;
    image: string;
}
declare module "next-auth" {
    interface Session {
      user: {
        name: string;
        email: string;
        image: string;
      };
    }
  }