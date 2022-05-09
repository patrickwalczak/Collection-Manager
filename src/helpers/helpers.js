export const rejectTooLongRequest = () =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject({ message: "Problem with internet connection!" }),
      10000
    )
  );

export const handleRequest = async (url, methodOptionsObject = {}) => {
  try {
    const response = await fetch(url, methodOptionsObject);

    if (!response.ok) {
      throw new Error([response.status, response.statusText, response.url]);
    }
    return response.json();
  } catch (err) {
    throw err;
  }
};
