
const LoginRegisterForm = ({ email, setEmail, password, setPassword, buttonName, handleSubmit}) => {
    return (
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span>Ingrese el email del usuario</span>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary">
                    { buttonName }
                </button>
            </div>

        </div>
    );
};

export default LoginRegisterForm;
