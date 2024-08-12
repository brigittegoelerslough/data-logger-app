'use client'
import React, { useState } from 'react'

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <li>
            {/* <div className="relative inline-block"> */}
            <div className="relative">
                <button
                    type="button"
                    className="items-center w-28 py-2 px-3 text-white hover:text-blue-500 bg-transparent focus:outline-none inline-flex"
                    onClick={toggleDropdown}
                >
                    Charts 
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute mt-1 py-1 w-28 shadow-lg bg-gray-900 ring-2 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href="/bar-chart"
                                    className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-gray-800"
                                    onClick={closeDropdown}
                                >
                                    Bar Charts
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/line-chart"
                                    className="block px-4 py-2 text-sm text-white hover:text-blue-500 hover:bg-gray-800"
                                    onClick={closeDropdown}
                                >
                                    Line Charts
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </li>
    )
}
