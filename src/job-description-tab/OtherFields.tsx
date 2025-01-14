import { useState, useRef } from "react";

interface OtherFieldsProps {
    form: any;
}

function OtherFields({ form }: OtherFieldsProps) {
    const [attachCtaText, setAttachCtaText] = useState("Attach");
    const [attachments, setAttachments] = useState<File[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
        const maxFileSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            alert('Please upload only pdf, doc, docx, png, or jpeg files');
            return false;
        }

        if (file.size > maxFileSize) {
            alert('File size should not exceed 5MB');
            return false;
        }

        return true;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const files = Array.from(e.target.files || []);                                        
        const validFiles = files.filter(file => {
            const isValid = validateFile(file);
            return isValid;
        });
        
        if (validFiles.length > 0) {
            const newAttachments = [...attachments, ...validFiles];
            setAttachments(newAttachments);
            field.handleChange(newAttachments);
            setAttachCtaText("Attach More");
        }
    };

    return (
        <section
            className="flex flex-col gap-3"    
        >
            {/* Job Category */}
            <form.Field
                name="jobCategory"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">
                                Job Category
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Ex. Tech Team"
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                            />
                        </div>
                    )
                }}
            />

            {/* Education Required */}
            <form.Field
                name="educationRequired"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">
                                Education Required
                            </label>
                            <select 
                                id={field.name}
                                name={field.name}
                                value={field.state.value} 
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)} 
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                            >
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.Sc">B.Sc</option>
                                <option value="B.Com">B.Com</option>
                            </select>
                        </div>
                    )
                }}
            />

            {/* Perks */}
            <form.Field
                name="perks"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">Perks</label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                placeholder="Compose an epic.."
                            />
                        </div>
                    )
                }}
            />

            {/* Application Instructions */}
            <form.Field
                name="appInstructions"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">Application Instructions</label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                placeholder="Compose an epic.."
                            />
                        </div>
                    )
                }}
            />

            {/* Contact Person */}
            <form.Field
                name="contactPerson"
                children={(field: any) => {
                    return (
                        <div>
                            <label htmlFor={field.name} className="text-sm text-gray-700">
                                Contact Person
                            </label>
                            <select 
                                id={field.name}
                                name={field.name}
                                value={field.state.value} 
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)} 
                                className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                            >
                                <option value="John Doe">John Doe</option>
                                <option value="Jane Doe">Jane Doe</option>
                            </select>
                        </div>
                    )
                }}
            />

            {/* Visa Sponsorship */}
            <div>
                <span className="text-sm text-gray-700">Will visa be sponsored?</span>
                <div className="flex items-center gap-3 mt-1">
                {['Yes', 'No', 'Not applicable'].map((option) => (
                        <form.Field
                            key={option}
                            name="visaSponsorship"
                            children={(field: any) => (
                                <label className="text-sm items-center flex gap-1.5 font-light text-gray-700">
                                    <input 
                                        type="radio"
                                        value={option}
                                        name={field.name} 
                                        onBlur={field.handleBlur}
                                        checked={field.state.value === option}
                                        onChange={(e) => field.handleChange(e.target.value)} 
                                        className="w-4 h-4 accent-blue-900"
                                    />
                                    {option}
                                </label>
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Travel Requirements */}
            <div>
                <span className="text-sm text-gray-700">Job has travel requirements?</span>
                <div className="flex items-center gap-3 mt-1">
                {['Yes', 'No'].map((option) => (
                        <form.Field
                            key={option}
                            name="hasTravelRequirements"
                            children={(field: any) => (
                                <label className="text-sm items-center flex gap-1.5 font-light text-gray-700">
                                    <input 
                                        type="radio"
                                        value={option}
                                        name={field.name} 
                                        onBlur={field.handleBlur}
                                        checked={field.state.value === option}
                                        onChange={(e) => field.handleChange(e.target.value)} 
                                        className="w-4 h-4 accent-blue-900"
                                    />
                                    {option}
                                </label>
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Attachment */}
            <div>
                <span className="text-sm text-gray-700">Attachments</span>

                <div className="flex flex-col gap-2 mt-1">
                    {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                            <div 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => {
                                    window.open(URL.createObjectURL(file), '_blank');
                                }}
                            >
                                <span className="text-sm font-light text-blue-600">
                                    {file.name}
                                </span>
                                <span className="text-xs font-light text-gray-500">
                                    ({Math.round(file.size / 1024)}KB)
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                    const newAttachments = attachments.filter((_, i) => i !== index);
                                    setAttachments(newAttachments);
                                    if (newAttachments.length === 0) {
                                        setAttachCtaText("Attach");
                                    }

                                    // Reset the file input using ref
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = '';
                                    }
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <form.Field
                    name="attachments"
                    children={(field: any) => {
                        return (
                            <div className="flex items-center gap-1.5">
                                <label htmlFor={field.name} className="text-sm font-light cursor-pointer">
                                    <input 
                                        ref={fileInputRef}
                                        id={field.name}
                                        name={field.name}
                                        type="file" 
                                        multiple={true}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                                        onChange={(e) => {
                                            handleFileUpload(e, field);
                                        }}
                                        onBlur={field.handleBlur}
                                    />
                                    <div className="flex items-center gap-1 active:scale-95 transition-all duration-150 ease-in-out">
                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.1143 4.66667L5.72382 9.05719C5.20312 9.57789 5.20312 10.4221 5.72382 10.9428C6.24452 11.4635 7.08874 11.4635 7.60944 10.9428L11.8856 6.55228C12.927 5.51089 12.927 3.82245 11.8856 2.78105C10.8442 1.73965 9.15574 1.73965 8.11434 2.78105L3.8382 7.17157C2.2761 8.73367 2.2761 11.2663 3.8382 12.8284C5.4003 14.3905 7.93296 14.3905 9.49505 12.8284L13.6666 8.66667" stroke="#1E3A8A" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="text-sm font-light text-blue-900">
                                            {attachCtaText}
                                        </span>
                                    </div>
                                </label>
                                <span className="text-xs font-light italic text-gray-500">(pdf, doc, docx, png, jpeg)</span>
                            </div>
                        )
                    }}
                />
            </div>
        </section>
    )
}

export default OtherFields