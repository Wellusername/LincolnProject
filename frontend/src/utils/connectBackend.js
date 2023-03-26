import axios from "axios";

export async function getUrlAndQRcode(infoData) {
  const body = infoData;
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/generation/url-and-code`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: body,
      method: "POST",
    }
  );
  return response.data;
}
