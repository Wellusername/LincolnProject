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

export async function decodeUri(uri) {
  const data = {};
  data["uri"] = uri;

  const response = await axios(
    `${process.env.REACT_APP_URL}/api/event/decode`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: data,
      method: "POST",
    }
  );
  return response.data;
}

export async function generateEPCISXml(data) {
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/event/add-event`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: data,
      method: "POST",
    }
  );
  return response.data;
}
