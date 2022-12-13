import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    const auth = useContext(AuthContext);
    const nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            let authenticate: Boolean = false;
            try {
                authenticate = await auth.signin(values.username, values.password);
            } catch (error) {
                console.log(error)
            }

            if (authenticate)
                nav(`/dashboard`)
            else
                toast.info("Usuario ou senha estão incorretos!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

        }
    });

    return (
        <div className="container-xxl">
            <ToastContainer />
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    {/* <!-- Register --> */}
                    <div className="card">
                        <div className="card-body">
                            {/* <!-- Logo --> */}
                            <div className="app-brand justify-content-center">
                                <a href="index.html" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/076.png" width={40} alt="" />

                                    </span>
                                    <span className="display-5 demo text-body fw-bolder">
                                        GOLEM
                                    </span>
                                </a>
                            </div>
                            {/* <!-- /Logo --> */}
                            <h4 className="mb-2">Bem vindo ao Golem! 👋</h4>

                            <form
                                id="formAuthentication"
                                className="mb-3"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Usuário
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="usuário"
                                        autoFocus={true}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between">
                                        <label className="form-label" htmlFor="password">
                                            Senha
                                        </label>
                                        <a href="auth-forgot-password-basic.html">
                                            <small>Forgot Password?</small>
                                        </a>
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="············"
                                            aria-describedby="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        <span className="input-group-text cursor-pointer">
                                            <i className="bx bx-hide"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remember-me"
                                        />
                                        <label className="form-check-label" htmlFor="remember-me">
                                            {" "}
                                            Lembre-me{" "}
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button
                                        className="btn btn-primary d-grid w-100"
                                        type="submit"
                                    >
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <!-- /Register --> */}
                </div>
            </div>
        </div>
    );
};
