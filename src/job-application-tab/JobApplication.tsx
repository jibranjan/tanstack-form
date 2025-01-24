import { useState } from "react";
import RenderFieldSection from "./RenderFieldSection.tsx";

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

interface CustomQuestionType {
    customQuestion: string;
    type: string;
    isScreeningQuestion: boolean;
    correctAnswer: any;
}

const CUSTOM_QUESTION_BOILERPLATE = {
    customQuestion: '',
    type: 'text',
    isScreeningQuestion: false,
    correctAnswer: '',
};

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
        { id: 'awards', name: 'Awards', isMandatory: false, section: 'other', allowChange: true },
        { id: 'certifications', name: 'Certifications', isMandatory: false, section: 'other', allowChange: true },
        { id: 'projects', name: 'Projects', isMandatory: false, section: 'other', allowChange: true },
        { id: 'publications', name: 'Publications', isMandatory: false, section: 'other', allowChange: true },
        { id: 'linkedin-profile', name: 'LinkedIn profile', isMandatory: false, section: 'other', allowChange: true },
        { id: 'github-profile', name: 'GitHub profile', isMandatory: false, section: 'other', allowChange: true },
    ]);

    const [customQuestions, setCustomQuestions] = useState<CustomQuestionType[]>([]);

    return (
        <section className="flex flex-col gap-5 bg-white rounded-lg px-5 py-3 shadow-md">
            {/* How candidates apply? */}
            <div>
                <h2 className="text-gray-700 text-lg mb-3">How candidates apply?</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
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
                    <RenderFieldSection 
                        form={form}
                        fields={fields} 
                        section="other"
                        setFields={setFields}
                    />
                </div>
            </div>

            {/* Screening Questions */}
            <div>
                <h2 className="text-gray-700 text-lg mb-3">Custom Questions</h2>

                {customQuestions.map((question, index) => (
                    <div 
                        className="mb-5 flex flex-col gap-3 p-2"
                        key={`${question.customQuestion}-${index}`}
                    >

                        {/* Heading */}
                        <div className="text-gray-700 bg-gray-100 p-2 rounded-lg -mx-2 flex items-center justify-between">
                            <span>
                                Question {index + 1}
                            </span>
                            <svg 
                                onClick={() => {
                                    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
                                }}
                                className="w-4 text-gray-500 cursor-pointer active:scale-95 active:text-black transition-all duration-150 ease-in-out"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>

                        {/* Custom Question */}
                        <div>
                            <h4 className="text-gray-700 text-sm">Custom Question</h4>
                            <form.Field
                                name={`customQuestion-${index}`}
                                children={(field: any) => (
                                    <input 
                                        name={`customQuestion-${index}`}
                                        type="text" 
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-1.5 px-3 rounded-lg mt-1 req-input-field"
                                        defaultValue={customQuestions[index].customQuestion}
                                        value={field.state.value || ""}
                                        onBlur={(e) => {
                                            field.handleBlur(e.target.value);
                                            const updatedQuestions = structuredClone(customQuestions)
                                            updatedQuestions[index].customQuestion = e.target.value;
                                            setCustomQuestions(updatedQuestions);
                                        }}
                                        onChange={(e)=>{
                                            field.handleChange(e.target.value);
                                        }}
                                        placeholder="Add your question here"
                                    />
                                )}
                            />
                        </div>

                        {/* Question Type */}
                        <div>
                            <h4 className="text-gray-700 text-sm">Question Type</h4>
                            <form.Field
                                name={`questionType-${index}`}
                                children={(field: any) => (
                                    <select 
                                        name={`questionType-${index}`}
                                        className="text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full max-w-52 py-1.5 px-2 rounded-lg mt-1"
                                        value={field.state.value || ""}
                                        defaultValue={customQuestions[index].type || ""}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                            setCustomQuestions((prevQuestions) => {
                                                return prevQuestions.map((q, i) => 
                                                    i === index ? { ...q, type: e.target.value } : q
                                                );
                                            });
                                        }}
                                    >
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="date">Date</option>
                                    </select>
                                )}
                            />
                        </div>

                        {/* Mark as screening question */}
                        <form.Field
                            name={`markAsScreeningQuestion-${index}`}
                            children={(field: any) => (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor={field.name} className="text-sm text-gray-700 flex items-center gap-2 w-fit cursor-pointer">
                                        <span>
                                            Mark as screening question?
                                        </span>
                                        <input 
                                            type="checkbox" 
                                            name={field.name} 
                                            onBlur={field.handleBlur}
                                            checked={field.state.value || false}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            className="w-3 h-3 accent-blue-900 cursor-pointer"
                                        />
                                    </label>
                                    
                                    {/* Correct Answer (if screening question) */}
                                    {field.state.value && (
                                    <form.Field
                                            name={`correctAnswer-${index}`}
                                            children={(field: any) => (
                                                <>
                                                    {question.type === 'boolean' && (
                                                        <div className="flex flex-col gap-1">
                                                            <label 
                                                                htmlFor={field.name + '-first'} 
                                                                className="text-sm text-gray-700 flex items-center gap-2 w-fit cursor-pointer"
                                                            >
                                                                <input 
                                                                    id={field.name + '-first'}
                                                                    type="radio" 
                                                                    name={field.name} 
                                                                    onBlur={field.handleBlur}
                                                                    defaultChecked={true}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    className="w-3 h-3 accent-blue-900 cursor-pointer"
                                                                />
                                                                <span>Yes</span>
                                                            </label>

                                                            <label 
                                                                htmlFor={field.name + '-second'} 
                                                                className="text-sm text-gray-700 flex items-center gap-2 w-fit cursor-pointer"
                                                            >
                                                                <input 
                                                                    id={field.name + '-second'}
                                                                    type="radio" 
                                                                    name={field.name} 
                                                                    onBlur={field.handleBlur}
                                                                    defaultChecked={field.state.value === 'false'}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    className="w-3 h-3 accent-blue-900 cursor-pointer"
                                                                />
                                                                <span>No</span>
                                                            </label>
                                                        </div>
                                                    )}

                                                    {question.type !== 'boolean' && (
                                                        <input 
                                                            type={question.type} 
                                                            name={field.name} 
                                                            defaultValue={""}
                                                            onBlur={field.handleBlur}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className={`text-sm font-light text-gray-500 ring-0 border border-gray-300 w-full py-1.5 px-2 rounded-lg ${question.type !== 'text' ? 'max-w-52' : ''}`}
                                                            placeholder="Add your answer here"
                                                        />
                                                    )}
                                                </>
                                            )}
                                        />
                                    )}
                                </div>
                            )}
                        />

                        {/* Correct Answer (if screening question) */}
                    </div>
                ))}

                <button 
                    className="text-blue-900 text-sm font-light bg-indigo-50 border border-dashed border-blue-900 px-2.5 py-1.5 rounded-md active:scale-95 transition-all duration-150 ease-in-out"
                    onClick={() => {
                        setCustomQuestions([...customQuestions, CUSTOM_QUESTION_BOILERPLATE]);
                    }}
                >
                    Create Custom Question +
                </button>
            </div>
        </section>
    );
}

export default JobApplication