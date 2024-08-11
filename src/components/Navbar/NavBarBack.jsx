import React from "react";
import { useHistory } from "react-router-dom";

export const NavBarBack = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="lg:hidden fixed top-0 w-full z-50 border-b border-gray-300 bg-customColor1 h-12">
            <div className="flex items-center justify-between px-4 py-2">
                <button onClick={goBack} className="text-blue-500">
                    <svg className="w-6 h-6 text-customColor2 dark:text-white transition-transform transform active:scale-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                </button>
                <div className="text-lg font-semibold">
                    {/* Ваш текст здесь */}
                </div>
            </div>
        </div>
    );
}