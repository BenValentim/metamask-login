import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { validateEthAddress } from "../../../utils/validation";

export const revalidate = 0

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json());
    const message = data.message;
    const address = data.address;
    const signature = data.signature;

    if (validateEthAddress(address)) {
      const response: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`,
        {
          message,
          address,
          signature
        },
        {
          headers: {
            authorization: process.env.NEXT_PUBLIC_API_KEY
          }
        }
      );

      return NextResponse.json(response.data);
    } else {
      return NextResponse.json("Invalid address");
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json("An error ocurred");
  }
}


