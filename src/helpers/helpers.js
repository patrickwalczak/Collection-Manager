export const rejectRequestAfterSpecifiedTime = (milliseconds = 3000) => {
  if (!isFinite(milliseconds)) milliseconds = 3000;

  return new Promise((_, reject) =>
    setTimeout(() => {
      reject("Problem with internet connection");
    }, milliseconds)
  );
};

export const fetchHandler = (url, methodOptionsObject = {}) => {
  return async () => {
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
};
