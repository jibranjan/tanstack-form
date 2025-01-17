import { useState } from "react";
import OtherFields from "./OtherFields.tsx";

interface JobApplicationProps {
    form: any;
}

interface FieldType {
    id: string;
    name: string;
    isMandatory: boolean;
    section: 'important' | 'other';
    allowChange?: boolean;
}

function JobApplication({ form }: JobApplicationProps) {
    const applicationOptions = [
        {
            id: 'job-posting-url',
            title: 'Job posting URL',
            description: 'A single page where all candidates can apply for the job post'
        },
        {
            id: 'email-invitations',
            title: 'Email invitations',
            description: 'Each candidate is emailed a single-use URL.'
        }
    ];

    const [fields, setFields] = useState<FieldType[]>([
        // Other Fields
        { id: 'skills', name: 'Skills', isMandatory: false, section: 'other', allowChange: true },
        { id: 'cover-letter', name: 'Cover letter', isMandatory: false, section: 'other', allowChange: true },
        { id: 'expected-salary', name: 'Expected salary', isMandatory: false, section: 'other', allowChange: true },
        { id: 'notice-period', name: 'Notice period', isMandatory: false, section: 'other', allowChange: true },
        { id: 'languages-known', name: 'Languages known', isMandatory: false, section: 'other', allowChange: true },
    ]);

    return (
        <section className="flex flex-col gap-5 bg-white rounded-lg px-5 py-3 shadow-md">
            {/* How candidates apply? */}
            <div>
                <h2 className="text-gray-700 text-lg mb-3">How candidates apply?</h2>
                <div className="flex flex-col gap-3 mb-3">
                    {applicationOptions.map((option) => (
                        <form.Field
                            key={option.id}
                            name="howCandidatesApply"
                            children={(field: any) => (
                                <label 
                                    htmlFor={option.id}
                                    className="flex items-start gap-2"
                                >
                                    <input
                                        id={option.id}
                                        className="!w-4 h-4 accent-blue-900 mt-0.5"
                                        name="howCandidatesApply"
                                        type="radio"
                                        defaultValue={option.id || ""}
                                        defaultChecked={field.state.value === option.id || false}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <div className="flex flex-col gap-0.5 w-full">
                                        <h3 className="text-sm text-gray-700">{option.title}</h3>
                                        <p className="text-xs text-gray-500 font-light">{option.description}</p>
                                    </div>
                                </label>
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Candidate Fields */}
            <div className="flex flex-col gap-5">
                {/* heading */}
                <div className="flex justify-between items-end mt-2">
                    <h2 className="text-gray-700 text-lg">Candidate Fields</h2>
                    <div 
                        className="text-sm text-blue-900 cursor-pointer flex items-center gap-1 border border-blue-900 px-2 py-1 rounded-md active:scale-95 transition-all duration-150 ease-in-out"
                        onClick={() => {
                            // Will have to show a swal, not doing it rn.
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33331 5.99999L7.99998 3.33333L10.6666 6M10.6666 9.99999L7.99998 12.6667L5.33331 9.99999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Re-order Fields</span>
                    </div>
                </div>

                {/* Other Fields */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">
                        Other Fields
                        <p className="text-xs text-gray-700 font-light mt-1">
                            First name, last name and email are already added.
                        </p>
                    </h3>
                    <OtherFields 
                        form={form}
                        fields={fields} 
                        section="other"
                        setFields={setFields}
                    />
                </div>
            </div>

            {/* Screening Questions */}
            <div>
                {/* We will have to use Soc here, so not done this part */}
                <h2 className="text-gray-700 text-lg mb-3">Screening Questions</h2>
            </div>
        </section>
    );
}

export default JobApplication