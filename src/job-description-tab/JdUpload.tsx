import { useState, useRef } from "react";

interface JdUploadProps {
    form: any;
    setJdSubmitted: (submitted: boolean) => void;
}

function JdUpload({ form, setJdSubmitted }: JdUploadProps) {
    const [jdUploaded, setJdUploaded] = useState(false);
    const [uploadedJdFile, setUploadedJdFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <section className="flex flex-col gap-3 bg-white p-3 rounded-lg">
            {/* JD Upload */}
            <div>
                <h3 className="text-blue-900 rounded-lg mb-3">
                    Job Description
                    <p className="text-xs text-gray-700 font-light mt-1">
                        You can either upload your JD, paste a link or paste the JD itself.
                    </p>
                </h3>

                <div className="flex items-center gap-2 mt-1">
                    <form.Field
                        name="jdUpload"
                        children={(field: any) => {
                            return (
                                <>
                                    <label
                                        className="flex items-center gap-2 bg-indigo-200 border-indigo-200 text-indigo-900 text-sm px-3 py-2 rounded-lg active:scale-95 transition-all duration-150 ease-in-out cursor-pointer"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            id={field.name}
                                            name={field.name}
                                            type="file"
                                            className="hidden req-input-field"
                                            data-field-name="jobDescription"
                                            data-file-uploaded="false"
                                            accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                                            onChange={(e) => {
                                                setJdUploaded(true);
                                                setUploadedJdFile(e.target.files?.[0] || null);
                                                field.handleChange(e.target.files);
                                                e.target.setAttribute('data-file-uploaded', 'true');
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
                        name="jdLink"
                        children={(field: any) => {
                            return (
                                <input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value || ""}
                                    onBlur={field.handleBlur}
                                    data-field-name="jobDescription"
                                    onChange={(e) => {
                                        setJdUploaded(true);
                                        field.handleChange(e.target.value);
                                    }}
                                    type="url"
                                    className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg req-input-field"
                                    placeholder="https://job.example.co/post=1"
                                />
                            )
                        }}
                    />
                </div>

                {uploadedJdFile && (
                    <div className="flex items-center justify-between gap-2 bg-indigo-50 px-3 py-2 rounded-lg mt-2">
                        <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => {
                                window.open(URL.createObjectURL(uploadedJdFile), '_blank');
                            }}
                        >
                            <span className="text-sm font-light text-blue-600">
                                {uploadedJdFile.name}
                            </span>
                            <span className="text-xs font-light text-gray-500">
                                ({Math.round(uploadedJdFile.size / 1024)}KB)
                            </span>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                                setUploadedJdFile(null);
                                setJdUploaded(false);
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
                    name="jdPaste"
                    children={(field: any) => {
                        return (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value || ""}
                                onBlur={field.handleBlur}
                                data-field-name="jobDescription"
                                onChange={(e) => {
                                    setJdUploaded(true);
                                    field.handleChange(e.target.value);
                                }}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg req-input-field"
                                placeholder="Paste your JD here..."
                            />
                        )
                    }}
                />
            </div>

            {/* Submit to Parse */}
            <div 
                data-jd-submitted="false"
                className={`text-sm bg-blue-900 text-white px-3 py-2 rounded-lg cursor-pointer w-fit ml-auto active:scale-95 transition-all duration-150 ease-in-out ${jdUploaded ? "cursor-pointer" : "cursor-not-allowed"}`}
                title={jdUploaded ? "Submit to Parse" : "Please upload or paste your JD first"}
                onClick={(e) => {
                    if (!jdUploaded) {
                        return;
                    }
                    (e.target as HTMLElement).classList.add("cursor-not-allowed");
                    (e.target as HTMLElement).classList.remove("active:scale-95");
                    (e.target as HTMLElement).textContent = "Parsing...";
                    (e.target as HTMLElement).setAttribute('data-jd-submitted', 'true');
                    setJdSubmitted(true);
                }}
            >
                Submit to Parse
            </div>

        </section>
    )
}

export default JdUpload