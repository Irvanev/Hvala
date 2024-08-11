import React from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export const NavBarLogout = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="d-lg-none">
            <div className="lg:hidden fixed top-0 w-full z-50 border-b border-gray-300 bg-customColor1 h-11">
                <div className="flex items-center justify-between px-4 py-2">
                    <button onClick={goBack} className="text-blue-500">
                        <svg className="w-6 h-6 text-customColor3 transition-transform transform active:scale-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={handleLogout} className="text-blue-500">
                        <svg class="w-6 h-6 text-customColor3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}