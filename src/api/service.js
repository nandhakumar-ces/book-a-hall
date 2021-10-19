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

export const fetchGet = async (url, params) => {
  console.log(url);
  console.log(params);

  try {
    const response = await (await fetch(url)).json();
    return response;
  } catch (error) {
    throw new Error(`Something went wrong. ${error.message}`);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export { sleep, isBlank };
