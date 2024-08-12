const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function authenticate(username: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (response.ok && user) {
      console.log(user);
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
}
