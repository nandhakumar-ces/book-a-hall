export const fetchPost = async (url, body) => {
  console.log(url, "url");
  console.log(body, "body");
  try {
    const response = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
    ).json();
    return response;
  } catch (error) {
    throw new Error(`Something went wrong. ${error.message}`);
  }
};
