import { NextResponse } from "next/server";
import axios from "axios";

export const revalidate = 0

export async function POST() {
  try {
    const response: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/get-sign-message`,
      {},
      {
        headers: {
          authorization: process.env.NEXT_PUBLIC_API_KEY
        }
      }
    )

    return NextResponse.json(response.data);
  } catch (e) {
    console.log(e);
    return NextResponse.json("An error ocurred");
  }
}


