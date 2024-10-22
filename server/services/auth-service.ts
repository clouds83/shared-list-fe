const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function authenticateService(email: string, password: string) {
  try {
    const response = await fetch(`${apiUrl}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || 'Authentication failed';
      throw new Error(errorMessage);
    }

    if (data) {
      return data;
    }

    throw new Error('Something went wrong');
  } catch (error: unknown) {
    console.error(error);
    throw new Error(
      "Internal server error. Please try again later or contact the site's administrator.",
    );
  }
}
