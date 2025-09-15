// api.js
export async function apiCall(url, method = "GET", data = null, headers = {}) {
  try {
    const token =
      localStorage.getItem("CompanyToken") ||
      localStorage.getItem("GovernmentToken");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    // ✅ Only attach body if method is NOT GET
    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    // ✅ For GET + query params
    if (data && method === "GET") {
      const queryParams = new URLSearchParams(data).toString();
      url += `?${queryParams}`;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Error:", error.message);
    throw error;
  }
}
