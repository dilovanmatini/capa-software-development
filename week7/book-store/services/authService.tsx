const API_URL = "http://localhost:3000/login";

export async function loginUser(username: string, password: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error(`Your credentials are invalid.`);
    }

    try {
        const data = await response.json();

        if (!data.token) {
            throw new Error("Your credentials are invalid.");
        }

        return data;
    } catch (error) {
        throw new Error("Failed to parse response JSON.");
    }
}