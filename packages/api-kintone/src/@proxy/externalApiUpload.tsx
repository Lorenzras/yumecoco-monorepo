
export const externalApiUpload = async <T = unknown, D = unknown>(
  url: string,
  method: 'POST' | 'GET',
  headers: T,
  data: D,
) => {
  try {
    const resp = await kintone.proxy.upload(url, method, headers, data);

    const [
      body,
      status,
    ] = resp;

    if (status === 200) {
      return body;
    } else if (status === 400) {
      throw new Error(`${status} ${JSON.parse(body).message}`);
    } else if (status === 404) {
      throw new Error(`Failed to access server ${url}`);
    } else  {
      throw new Error(`${status} Unhandled error.`);
    }

  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }

};