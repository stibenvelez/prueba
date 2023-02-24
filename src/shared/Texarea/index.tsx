import { TextareaProps } from "../../models";
import React, { forwardRef } from "react";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        { className = "", children, label="", name="", required = false, ...args },
        ref
    ) => {
        return (
            <div className="space-y-2">
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
                <textarea
                    name={name}
                    ref={ref}
                    className={`block w-full bg-gray-50 px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  ${className}`}
                    rows={4}
                    {...args}
                >
                    {children}
                </textarea>
            </div>
        );
    }
);

    Textarea.displayName = 'Textarea';

export default Textarea;
