const retry = async (operation, retries = 3, interval = 500, maxInterval = 10000) => {
  try {
    return await operation();
  } catch (err) {
    if (retries) {
      await new Promise((resolve) => setTimeout(resolve, interval));
      const backoffDelay = Math.min(interval * 2, maxInterval); // limiting the back off delay
      return await retry(operation, retries - 1, backoffDelay, maxInterval);
    }

    throw err;
  }
};

export default retry;
