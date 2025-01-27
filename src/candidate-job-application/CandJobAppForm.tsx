function CandJobAppForm() {

    const defaultFields = [
        { id: 'first-name', name: 'First name', isMandatory: true, type: 'text', value: 'Jibran' },
        { id: 'last-name', name: 'Last name', isMandatory: true, type: 'text', value: 'Jan' },
        { id: 'email', name: 'Email', isMandatory: true, type: 'email', value: 'jibranjan@gmail.com' },
    ]

    const selectedFields = [
        { id: 'phone-number', name: 'Phone number', isMandatory: true, type: 'number', placeholder: 'Enter your phone number' },
        { id: 'skills', name: 'Skills', isMandatory: true, type: 'text', placeholder: 'Ex. Python, React, etc.' },
        { id: 'cover-letter', name: 'Cover letter', isMandatory: false, type: 'textarea', placeholder: 'Enter your cover letter' },
        { id: 'expected-salary', name: 'Expected salary', isMandatory: false, type: 'number', placeholder: 'Ex. $1000' },
        { id: 'notice-period', name: 'Notice period', isMandatory: false, type: 'number', placeholder: 'Ex. 1 month' },
        { id: 'languages-known', name: 'Languages known', isMandatory: false, type: 'text', placeholder: 'Ex. English, Hindi, etc.' },
        { id: 'awards', name: 'Awards', isMandatory: false, type: 'text', placeholder: 'Enter your awards' },
        { id: 'certifications', name: 'Certifications', isMandatory: false, type: 'textarea', placeholder: 'Enter your certifications' },
        { id: 'projects', name: 'Projects', isMandatory: false, type: 'textarea', placeholder: 'Enter your projects' },
        { id: 'publications', name: 'Publications', isMandatory: false, type: 'textarea', placeholder: 'Enter your publications' },
        { id: 'linkedin-profile', name: 'LinkedIn profile', isMandatory: false, type: 'url', placeholder: 'Enter your LinkedIn profile' },
        { id: 'github-profile', name: 'GitHub profile', isMandatory: true, type: 'url', placeholder: 'Enter your GitHub profile' },
    ];

    const sortedSelectedFields = [...selectedFields].sort((a, b) => {
        if (a.isMandatory === b.isMandatory) return 0;
        return a.isMandatory ? -1 : 1;
    });

    return (
        <section className="flex flex-col gap-3 bg-white p-5 lg:py-7 rounded-lg shadow-lg">
            <div className="text-center mb-5">
                <h2 className="text-lg text-blue-900">Candidate Job Application</h2>
                <p className="text-sm text-gray-500">
                    Please fill in the following fields to apply for the job.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
                {defaultFields.map((field) => {
                    return (
                        <div 
                            key={field.id} 
                            className="flex flex-col gap-1"
                        >
                            <label htmlFor={field.id} className="text-sm text-gray-700 font-light flex items-center gap-2 cursor-not-allowed w-fit">
                                {field.name}
                            </label>
                            <input 
                                id={field.id} 
                                type={field.type} 
                                name={field.id} 
                                value={field.value} 
                                disabled={true}
                                className="w-full p-2 text-sm border border-gray-300 rounded-md font-light text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 mt-5">
                {sortedSelectedFields.map((field) => {
                    return (
                        <div 
                            key={field.id} 
                            className={`flex flex-col gap-1 ${field.type === 'textarea' ? 'col-span-2' : ''}`}
                        >
                            <label htmlFor={field.id} className={`text-sm text-gray-700 font-light flex items-center gap-2 w-fit ${field.isMandatory ? 'eqp-required-field' : ''}`}>
                                {field.name}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea 
                                    id={field.id} 
                                    name={field.id} 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md font-light text-gray-500"
                                    placeholder={field.placeholder}
                                />
                            ) : (
                                <input 
                                    id={field.id} 
                                    type={field.type} 
                                    name={field.id} 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-md font-light text-gray-500"
                                    placeholder={field.placeholder}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            <button 
                className="bg-blue-900 text-white py-1.5 px-4 rounded-md font-light active:scale-95 text-sm w-fit mt-5 self-end"
                type="submit"
                onClick={() => {
                    console.log('Submit');
                }}
            >
                Submit
            </button>
        </section>
    )
}

export default CandJobAppForm;