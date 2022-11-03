export default function LoginPage() {
    return (
    <form onSubmit={(e) => e.preventDefault()}>
        <label for="email">Email:</label>
        <input className="input-text" type="text" name="email" placeholder="username@email.com"/>
        <br></br>
        <label for="password">Password:</label>
        <input className="input-text" type="password" name="password" placeholder="Password"/>
        <br></br>
        <button type='submit'>Login</button>
        <button>Register</button>
    </form>)
}