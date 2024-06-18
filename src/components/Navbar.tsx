import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();

    const logoutUser = () => {
        dispatch(logout());
    }

    return (
        <nav className="flex justify-between p-6 bg-light-panel dark:bg-dark-panel shadow-md">
            <div>
                <h2 className="text-light-text-60 dark:text-dark-text-60 font-extrabold text-2xl">Wellcome <span className="text-orange-400">User</span></h2>
            </div>
            <div className="flex gap-10 justify-end items-center">
                <ul className="flex gap-2 text-light-text-60 dark:text-dark-text-60">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">login</a></li>
                    <li><a href="/signup">Register</a></li>
                </ul>
                <button type="button" className="text-orange-400 font-medium" onClick={logoutUser}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar