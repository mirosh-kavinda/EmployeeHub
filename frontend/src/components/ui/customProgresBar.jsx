import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";

export function showCustomToast(text, delay, autoCloseOff) {
    toast(
        <div className="hidden md:flex items-center gap-2 mb-9 p-6">
            <h5 className="text-lg text-center font-bold text-gray-800">{text}</h5>
            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        </div>,
        { autoClose: autoCloseOff, hideProgressBar: false, position: "top-center", delay: delay } // hide default bar
    );
}
