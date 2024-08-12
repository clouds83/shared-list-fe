export default function Register() {
  return (
    <>
      <h2 className="text-center text-2xl">Register</h2>

      <form className="grid gap-4">
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="border" />
        </div>

        <div className="grid">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border"
          />
        </div>

        <div className="grid">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border"
          />
        </div>

        <button type="submit">Register user</button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600">
          Login.
        </a>
      </p>
    </>
  );
}
