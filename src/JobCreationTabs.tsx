import React from 'react'

interface JobCreationTabsProps {
    activeTab: number;
    setActiveTab: (tab: number) => void;
    uploadedTab: number;
    setUploadedTab: (tab: number) => void;
}

const JobCreationTabs = ({ activeTab, setActiveTab, uploadedTab, setUploadedTab }: JobCreationTabsProps) => {

    const checkForJobDescriptionUpload = (field: any) => {
        const jdSubmitted = document.querySelector('[data-jd-submitted]')?.getAttribute('data-jd-submitted') === 'true';

        let jobDescriptionUploaded = false;
        if (field.hasAttribute('data-file-uploaded') && field.getAttribute('data-file-uploaded') === 'true') {
            jobDescriptionUploaded = true;
        } else if (!field.hasAttribute('data-file-uploaded')) {
            jobDescriptionUploaded = field.value !== undefined && field.value !== "";
        }

        return jobDescriptionUploaded && jdSubmitted;
    }

    const validateFields = () => {
        const $reqInputField = document.querySelectorAll('.req-input-field')

        let hasEmptyFields = false;
        let jdUploaded = false;

        $reqInputField.forEach((field: any) => {
            if (field.getAttribute('data-field-name') === 'jobDescription') {
                if (!jdUploaded) {
                    jdUploaded = checkForJobDescriptionUpload(field);
                }
                hasEmptyFields = !jdUploaded;
            } else if (field.getAttribute('data-field-name') === 'skills') {
                if (document.getElementById('skills-selected')?.children.length === 0) {
                    hasEmptyFields = true;
                } else {
                    hasEmptyFields = false;
                }
            } else if (field.value === undefined || field.value === "") {
                hasEmptyFields = true;
            }
        })
        return !hasEmptyFields;
    };

    const TAB_CONTENT = [
        {
            title: "Job Description",
            description: "All the details related to job role",
            containerId: "job-description"
        },
        {
            title: "Job Application",
            description: "Job application details",
            containerId: "job-application"
        }
    ]

    return (
        <section className="max-md:max-w-2xl md:max-lg:max-w-3xl w-full max-w-5xl max-lg:mx-auto flex flex-col lg:flex-row lg:justify-between gap-5 lg:border-b lg:border-gray-300 max-md:px-5">
            <div className="flex flex-col lg:flex-row flex-1">
                {TAB_CONTENT.map((tab, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`w-full flex flex-row gap-3 items-center max-lg:border-b p-3 group tab-item cursor-pointer
                                ${index === activeTab ? 'active-tab bg-white border-b-2 border-blue-900' : ''} 
                                ${index <= uploadedTab ? 'bg-white border-b-2 border-green-500' : ''}
                                ${index === 0 ? 'max-lg:rounded-t-lg' : ''} 
                                lg:rounded-t-lg`}
                            data-container-id={tab.containerId}
                            onClick={() => {
                                if (activeTab !== index) {
                                    if (activeTab === 0) {
                                        if (validateFields()) {
                                            setActiveTab(index);
                                            setUploadedTab(activeTab);
                                        } else {
                                            alert('Please fill in all the fields in Important Fields section..');
                                        }
                                    } else if (activeTab === 1) {
                                        setActiveTab(index);
                                    }
                                }
                            }}
                        >
                            <div
                                className={`rounded-full w-10 h-10 font-light flex items-center justify-center text-sm border
                                    ${index === activeTab ? 'border-blue-900 text-blue-900' : 'border-gray-300'}
                                    ${index <= uploadedTab ? 'border-green-500 text-green-500' : ''}`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                                <h3
                                    className={`text-xs font-medium uppercase 
                                        ${index === activeTab ? 'text-blue-900' : ''}
                                        ${index <= uploadedTab ? 'text-green-500' : ''}`}
                                >
                                    {tab.title}
                                </h3>

                                <p className="text-sm font-light text-gray-500 lg:max-xl:text-xs">{tab.description}</p>
                            </div>
                        </div>
                        {index < TAB_CONTENT.length - 1 && (
                            <div className="hidden lg:block w-0.5 min-h-max max-h-16 bg-gray-300 mt-2" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="flex items-center justify-end gap-3">
                <button
                    id="jc-cancel-btn"
                    className="text-sm rounded-lg px-4 py-1.5 sm:px-5 border bg-white border-blue-900 text-blue-900 active:scale-95 transition-all duration-150 ease-in-out"
                    onClick={() => {
                        if (activeTab === 1) {
                            setActiveTab(activeTab - 1)
                            setUploadedTab(-1);
                        }
                    }}
                >
                    Cancel
                </button>
                <button
                    id="jc-next-btn"
                    className="text-sm rounded-lg w-20 px-4 py-1.5 sm:px-5 border bg-blue-900 border-blue-900 text-white active:scale-95 transition-all duration-150 ease-in-out"
                    onClick={() => {
                        if (activeTab === 0) {
                            if (validateFields()) {
                                setActiveTab(activeTab + 1);
                                setUploadedTab(activeTab);
                            } else {
                                alert('Please fill in all the fields in Important Fields section..');
                            }
                        } else {
                            setUploadedTab(activeTab);
                        }
                    }}
                >
                    {activeTab === 0 ? 'Next' : 'Finish'}
                </button>
            </div>
        </section>
    )
}

export default JobCreationTabs