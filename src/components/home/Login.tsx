// 로그인 페이지는 대문에서만 관리
export function Login() {
  return (
    <>
      <div className="form" style={{ border: '1px solid black' }}>
        <h2>Login</h2>
        <form action="login.php" method="post">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}
