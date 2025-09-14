// api.js
export async function apiCall(url, method = "GET", data = null, headers = {}) {
  try {
    // ✅ Try to get token (you can adjust based on your login logic)
    const token =
      localStorage.getItem("CompanyToken") ||
      localStorage.getItem("GovernmentToken");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ Add token if available
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
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
