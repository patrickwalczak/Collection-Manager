export const rejectTooLongRequest = () =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject({ message: "Problem with internet connection!" }),
      10000
    )
  );

const fetchHandler = async (url, methodOptionsObject = {}) => {
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

const url =
  "https://trading-platform-dabf0-default-rtdb.europe-west1.firebasedatabase.app/application/collectAppCounter.json";

export const updateWebCounter = async () => {
  try {
    const webCounter = await Promise.race([
      rejectTooLongRequest(),

      fetchHandler(url),
    ]);

    await Promise.race([
      rejectTooLongRequest(),

      fetchHandler(url, {
        method: "PUT",
        body: JSON.stringify(webCounter + 1),
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
};
