export async function sendApiRequest(
  url: string,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(!["GET", "HEAD"].includes(method.toUpperCase())
        ? { body: JSON.stringify(body) }
        : {}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw new Error("An error occurred while fetching the API.");
  }
}
