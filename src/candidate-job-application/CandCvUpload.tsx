import { useState, useRef } from "react";

interface CandCvUploadProps {
    form: any;
    setCvSubmitted: (cvSubmitted: boolean) => void;
}

function CandCvUpload({ form, setCvSubmitted }: CandCvUploadProps) {
    const [cvProvided, setCvProvided] = useState(false);
    const [uploadedCvFile, setUploadedCvFile] = useState<File | null>(null);
    const [activeInput, setActiveInput] = useState<'file' | 'link' | 'paste' | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const clearActiveInput = () => {
        setActiveInput(null);
        setCvProvided(false);
    };

    return (
        <section className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow-lg">
            <div>
                <h3 className="text-blue-900 rounded-lg mb-3">
                    Upload CV
                    <p className="text-xs text-gray-700 font-light mt-1">
                        You can either upload your CV, paste a link or paste the CV itself.
                    </p>
                </h3>

                {/* Upload CV or paste link */}
                <div className="flex items-center gap-2 mt-1">
                    <form.Field
                        name="cvUpload"
                        children={(field: any) => {
                            return (
                                <>
                                    <label
                                        className={`flex items-center gap-2 bg-indigo-200 border-indigo-200 text-indigo-900 text-sm px-3 py-2 rounded-lg active:scale-95 transition-all duration-150 ease-in-out cursor-pointer ${ cvProvided && activeInput !== 'file' ? "cursor-not-allowed" : ""}`}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            id={field.name}
                                            name={field.name}
                                            type="file"
                                            className="hidden disabled:cursor-not-allowed"
                                            accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                                            disabled={activeInput !== null && activeInput !== 'file'}
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    field.handleChange(e.target.files);
                                                    setCvProvided(true);
                                                    setUploadedCvFile(e.target.files[0]);
                                                    setActiveInput('file');
                                                }
                                            }}
                                            onBlur={field.handleBlur}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                            />
                                        </svg>

                                        Upload
                                    </label>
                                </>
                            )
                        }}
                    />

                    <span className="text-sm font-light text-gray-500">or</span>

                    <form.Field
                        name="cvLink"
                        children={(field: any) => {
                            return (
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    disabled={activeInput !== null && activeInput !== 'link'}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        field.handleChange(e.target.value);
                                        if (e.target.value) {
                                            setCvProvided(true);
                                            setActiveInput('link');
                                        } else {
                                            clearActiveInput();
                                        }
                                    }}
                                    type="url"
                                    className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg disabled:cursor-not-allowed"
                                    placeholder="https://cv.example.co/post=1"
                                />
                            )
                        }}
                    />
                </div>

                {uploadedCvFile && (
                    <div className="flex items-center justify-between gap-2 bg-indigo-50 px-3 py-2 rounded-lg mt-2 w-fit">
                        <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                                window.open(URL.createObjectURL(uploadedCvFile), '_blank');
                            }}
                        >
                            <span className="text-sm font-light text-blue-600">
                                {uploadedCvFile.name}
                            </span>
                            <span className="text-xs font-light text-gray-500">
                                ({Math.round(uploadedCvFile.size / 1024)}KB)
                            </span>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                                setUploadedCvFile(null);
                                clearActiveInput();
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                )}

                <p className="text-sm font-light text-gray-500 text-center my-2">or</p>

                <form.Field
                    name="cvPaste"
                    children={(field: any) => {
                        return (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                disabled={activeInput !== null && activeInput !== 'paste'}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                    if (e.target.value) {
                                        setCvProvided(true);
                                        setActiveInput('paste');
                                    } else {
                                        clearActiveInput();
                                    }
                                }}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg disabled:cursor-not-allowed"
                                placeholder="Paste your CV here..."
                            />
                        )
                    }}
                />
            </div>

            {/* Submit to Parse */}
            <div 
                className={`text-sm bg-blue-900 text-white px-3 py-2 rounded-lg cursor-pointer w-fit ml-auto active:scale-95 transition-all duration-150 ease-in-out ${cvProvided ? "cursor-pointer" : "cursor-not-allowed"}`}
                title={cvProvided ? "Submit to Parse" : "Please upload or paste your CV first"}
                onClick={(e) => {
                    if (!cvProvided) {
                        return;
                    }
                    (e.target as HTMLElement).classList.add("cursor-not-allowed");
                    (e.target as HTMLElement).classList.remove("active:scale-95");
                    (e.target as HTMLElement).textContent = "Parsing...";
                    setCvSubmitted(true);
                }}
            >
                Submit to Parse
            </div>
        </section>
    )
}

export default CandCvUpload;