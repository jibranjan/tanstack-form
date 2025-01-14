import React from 'react'

interface JobCreationTabsProps {
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

const JobCreationTabs = ({ activeTab, setActiveTab }: JobCreationTabsProps) => {
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
                                ${index === 0 ? 'max-lg:rounded-t-lg' : ''} 
                                lg:rounded-t-lg`}
                            data-container-id={tab.containerId}
                            onClick={() => setActiveTab(index)}
                        >
                            <div 
                                className={`rounded-full w-10 h-10 font-light flex items-center justify-center text-sm border ${index === activeTab ? 'border-blue-900 text-blue-900' : 'border-gray-300'}`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <div>
                                <h3 
                                    className={`text-xs font-medium uppercase ${index === activeTab ? 'text-blue-900' : ''}`}
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
                            setActiveTab(activeTab + 1)
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