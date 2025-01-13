import { useState } from "react";

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
            description: 'Each candidate is emailed a single-use URL. Helps prevent assessments from being shared.'
        }
    ];

    const [fields, setFields] = useState<FieldType[]>([
        // Important Fields
        { id: 'first-name', name: 'First name', isMandatory: true, section: 'important' },
        { id: 'last-name', name: 'Last name', isMandatory: true, section: 'important' },
        { id: 'email', name: 'Email', isMandatory: true, section: 'important' },
        { id: 'location', name: 'Location', isMandatory: false, section: 'important', allowChange: true },
        { id: 'dob', name: 'DOB', isMandatory: false, section: 'important', allowChange: true },
        
        // Other Fields
        { id: 'skills', name: 'Skills', isMandatory: true, section: 'other' },
        { id: 'current-salary', name: 'Current salary', isMandatory: true, section: 'other' },
        { id: 'expected-salary', name: 'Expected salary', isMandatory: false, section: 'other', allowChange: true },
        { id: 'notice-period', name: 'Notice period', isMandatory: false, section: 'other', allowChange: true },
    ]);

    const renderFieldSection = (section: 'important' | 'other') => {
        return (
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 p-2">
                {fields.filter((fld) => fld.section === section).map((fld) => {
                    const selectionFieldName = `${section}-field-${fld.id}-selection`;
                    const mandatoryFieldName = `${section}-field-${fld.id}-mandatory`;
                    return (
                        <div key={fld.id} className="flex items-center justify-between gap-2 col-span-1">
                            <form.Field
                                name={selectionFieldName}
                                defaultValue={fld.isMandatory}
                                children={(field: any) => {
                                    return (
                                        <label 
                                            htmlFor={`${fld.id}-checkbox`} 
                                            className="text-sm text-gray-700 font-light flex items-center gap-2"
                                        >
                                            <input 
                                                id={`${fld.id}-checkbox`}
                                                className="w-3.5 h-3.5 accent-blue-900 mt-0.5 rounded-sm" 
                                                type="checkbox" 
                                                checked={field.state.value || form.getFieldValue(mandatoryFieldName)}
                                                disabled={!fld.allowChange || form.getFieldValue(mandatoryFieldName)}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.checked)}
                                            />
                                            {fld.name}
                                        </label>
                                    )
                                }}
                            />
                            <form.Field
                                name={mandatoryFieldName}
                                defaultValue={fld.isMandatory}
                                children={(field: any) => {
                                    return (
                                        <label 
                                            htmlFor={`${fld.id}-mandatory`} 
                                            title="Mark as mandatory"
                                            className="relative inline-flex items-center"
                                        >
                                            <input
                                                id={`${fld.id}-mandatory`}
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={field.state.value}
                                                disabled={!fld.allowChange}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    field.handleChange(e.target.checked);
                                                    // If mandatory is checked, ensure selection is also checked
                                                    if (e.target.checked) {
                                                        form.setFieldValue(selectionFieldName, true);
                                                        setFields((prevFields) => prevFields.map((prevField) => prevField.id === fld.id ? { ...fld, isMandatory: true } : prevField));
                                                    }
                                                }}
                                            />
                                            <div className="cursor-pointer w-7 h-3.5 bg-gray-400 outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[1px] after:left-[2px] after:text-[10px] after:flex after:items-center after:justify-center after:text-emerald-500 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500 peer-disabled:bg-gray-200"></div>
                                        </label>
                                    )
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        )
    };

    return (
        <section className="flex flex-col gap-5">
            {/* How candidates apply? */}
            <div>
                <h2 className="text-gray-700 mb-3">How candidates apply?</h2>
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
                                        defaultValue={option.id}
                                        defaultChecked={field.state.value === option.id}
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

                {/* Assignee */}
                <form.Field
                    name="assignee"
                    children={(field: any) => {
                        return (
                            <div>
                                <label htmlFor="assignee" className="text-sm text-gray-700 font-light">Assignee</label>
                                <select
                                    id="assignee"
                                    className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-2 px-3 rounded-lg mt-1"
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                >
                                    <option value="john">John Doe</option>
                                    <option value="jane">Jane Doe</option>
                                </select>
                            </div>
                        )
                    }}
                />
            </div>

            {/* Candidate Fields */}
            <div className="flex flex-col gap-5">
                {/* heading */}
                <div className="flex justify-between items-end mt-2">
                    <h2 className="text-gray-700">Candidate Fields</h2>
                    <div className="text-sm text-blue-900 cursor-pointer flex items-center gap-1 border border-blue-900 px-2 py-1 rounded-md">
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33331 5.99999L7.99998 3.33333L10.6666 6M10.6666 9.99999L7.99998 12.6667L5.33331 9.99999" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span>Re-order Fields</span>
                    </div>
                </div>
                {/* Important Fields */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">Important Fields</h3>
                    {renderFieldSection('important')}
                </div>

                {/* Other Fields */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">Other Fields</h3>
                    {renderFieldSection('other')}
                </div>

                {/* Custom Fields */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-gray-700 text-sm bg-gray-100 p-2 rounded-lg">Custom Fields</h3>
                </div>
            </div>
        </section>
    );
}

export default JobApplication