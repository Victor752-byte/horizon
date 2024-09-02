'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async (userData: SignUpParams) =>{
    const {email, password, firstName, lastName} = userData
    try {
        const { account } = await createAdminClient();

       const newUserAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
      
        return parseStringify(newUserAccount) 
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async ({email, password}: signInProps) =>{
    try {
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password)

        cookies().set("appwrite-session", response.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        return parseStringify(response)
    } catch (error) {
        console.log(error)
    }
}

// Get the logged in user
export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }
  
  // Logout
  export const logoutAccount = async() =>{
    try {
        const { account } = await createSessionClient();

        cookies().delete("appwrite-session");
        const loggedOut = await account.deleteSession("current");

        return parseStringify(loggedOut)
    } catch (error) {
        
    }
  }