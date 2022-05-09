export const rejectTooLongRequest = () =>
  new Promise((_, reject) =>
    setTimeout(
      () => reject({ message: "Problem with internet connection!" }),
      10000
    )
  );
